import { Router } from 'express';
import { MockOddsSource } from '../services/odds.js';
import { modelGame, americanToImplied, americanToDecimal, kellyFraction } from '../services/model.js';

export const recsRouter = Router();

recsRouter.post('/', async (req, res) => {
  const { gameId, bankroll, kellyFraction: kf = 0.5, minEdge = 0.03 } = req.body ?? {};
  if (!gameId || !bankroll) return res.status(400).json({ error: 'gameId and bankroll required' });

  const odds = await MockOddsSource.getOddsForGame(gameId);
  if (!odds) return res.status(404).json({ error: 'No odds found' });

  const [homeTeamId, awayTeamId] = gameId.split('-').slice(-2);
  const m = modelGame({ gameId, homeTeamId, awayTeamId });

  // Moneyline
  const impHome = americanToImplied(odds.moneylineHome);
  const impAway = americanToImplied(odds.moneylineAway);
  const decHome = americanToDecimal(odds.moneylineHome);
  const decAway = americanToDecimal(odds.moneylineAway);

  const homeEdge = m.pHome - impHome;
  const awayEdge = m.pAway - impAway;

  let mlPick: any = null;
  if (homeEdge >= minEdge || awayEdge >= minEdge) {
    const pickHome = homeEdge >= awayEdge;
    const p = pickHome ? m.pHome : m.pAway;
    const dec = pickHome ? decHome : decAway;
    const imp = pickHome ? impHome : impAway;
    const edge = p - imp;
    const ev = p * (dec - 1) - (1 - p);
    const k = Math.max(0, Math.min(1, kellyFraction(p, dec)));
    const stake = Math.min(bankroll * (k * (kf ?? 0.5)), bankroll * 0.01);
    mlPick = {
      selection: pickHome ? homeTeamId : awayTeamId,
      modelProb: round(p), impliedProb: round(imp), edge: round(edge),
      decimalOdds: round(dec), expectedValue: round(ev), stakeSuggested: Math.round(stake),
      confidence: edge >= 0.05 ? 'High' : edge >= 0.03 ? 'Medium' : 'Low'
    };
  }

  // Totals
  const overImp = americanToImplied(odds.overOdds);
  const underImp = americanToImplied(odds.underOdds);
  const decOver = americanToDecimal(odds.overOdds);
  const decUnder = americanToDecimal(odds.underOdds);

  const overEdge = m.pOverAtLine - overImp;
  const underEdge = m.pUnderAtLine - underImp;

  let totalPick: any = null;
  const totalMinEdge = Math.max(0.02, minEdge - 0.01);
  if (overEdge >= totalMinEdge || underEdge >= totalMinEdge) {
    const pickOver = overEdge >= underEdge;
    const p = pickOver ? m.pOverAtLine : m.pUnderAtLine;
    const dec = pickOver ? decOver : decUnder;
    const imp = pickOver ? overImp : underImp;
    const edge = p - imp;
    const ev = p * (dec - 1) - (1 - p);
    const k = Math.max(0, Math.min(1, kellyFraction(p, dec)));
    const stake = Math.min(bankroll * (k * (kf ?? 0.5)), bankroll * 0.01);
    totalPick = {
      selection: pickOver ? 'Over' : 'Under',
      line: odds.totalPoints,
      modelProb: round(p), impliedProb: round(imp), edge: round(edge),
      decimalOdds: round(dec), expectedValue: round(ev), stakeSuggested: Math.round(stake),
      confidence: edge >= 0.04 ? 'High' : edge >= 0.02 ? 'Medium' : 'Low'
    };
  }

  res.json({
    moneyline: mlPick,
    total: totalPick,
    drivers: ['Elo + home field baseline', 'Off/Def efficiency and weather for totals', 'Fractional Kelly (1% bankroll cap)']
  });
});

function round(x: number, d = 3) {
  const k = Math.pow(10, d);
  return Math.round(x * k) / k;
}
