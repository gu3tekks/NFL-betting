import { Router } from 'express';
import { MockOddsSource } from '../services/odds.js';
import { modelGame } from '../services/model.js';

export const gamesRouter = Router();

const games = [
  {
    gameId: '2025-W01-BUF-MIA',
    season: 2025,
    week: 1,
    kickoff: '2025-09-07T17:00:00Z',
    homeTeamId: 'BUF',
    awayTeamId: 'MIA',
    venue: 'Highmark Stadium',
    weather: { windMph: 5, tempF: 68, precipPct: 10 }
  },
  {
    gameId: '2025-W01-KC-CIN',
    season: 2025,
    week: 1,
    kickoff: '2025-09-07T20:25:00Z',
    homeTeamId: 'KC',
    awayTeamId: 'CIN',
    venue: 'Arrowhead Stadium',
    weather: { windMph: 12, tempF: 75, precipPct: 0 }
  },
  {
    gameId: '2025-W01-PHI-DAL',
    season: 2025,
    week: 1,
    kickoff: '2025-09-08T01:15:00Z',
    homeTeamId: 'PHI',
    awayTeamId: 'DAL',
    venue: 'Lincoln Financial Field',
    weather: { windMph: 8, tempF: 70, precipPct: 20 }
  }
];

gamesRouter.get('/', async (_req, res) => {
  const odds = await MockOddsSource.getOddsByDate('2025-09-07');
  const resp = games.map(g => ({
    gameId: g.gameId,
    week: g.week,
    kickoff: g.kickoff,
    homeTeamId: g.homeTeamId,
    awayTeamId: g.awayTeamId,
    venue: g.venue,
    odds: odds.find(o => o.gameId === g.gameId) ?? null
  }));
  res.json({ games: resp });
});

gamesRouter.get('/:gameId/model', async (req, res) => {
  const g = games.find(x => x.gameId === req.params.gameId);
  if (!g) return res.status(404).json({ error: 'Game not found' });
  const odds = await MockOddsSource.getOddsForGame(g.gameId);
  const m = modelGame(g as any, odds ?? undefined);
  res.json({
    gameId: g.gameId,
    modelVersion: 'v1.0.0',
    pHome: m.pHome, pAway: m.pAway,
    expectedSpread: m.expectedSpread,
    totalMean: m.totalMean, totalStd: m.totalStd,
    pOverAtLine: m.pOverAtLine, pUnderAtLine: m.pUnderAtLine,
    line: m.line,
    drivers: ['Elo base + home field', 'Off/Def efficiency blend', 'Weather adjustment applied']
  });
});
