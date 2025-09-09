export type Odds = {
  gameId: string;
  book: 'Fliff';
  moneylineHome: number;
  moneylineAway: number;
  totalPoints: number;
  overOdds: number;
  underOdds: number;
};

export interface OddsSource {
  getOddsByDate(dateISO: string): Promise<Odds[]>;
  getOddsForGame(gameId: string): Promise<Odds | null>;
}

const mock: Record<string, Odds> = {
  '2025-W01-BUF-MIA': {
    gameId: '2025-W01-BUF-MIA',
    book: 'Fliff',
    moneylineHome: -130,
    moneylineAway: +110,
    totalPoints: 46.5,
    overOdds: -105,
    underOdds: -115
  },
  '2025-W01-KC-CIN': {
    gameId: '2025-W01-KC-CIN',
    book: 'Fliff',
    moneylineHome: -140,
    moneylineAway: +120,
    totalPoints: 48.0,
    overOdds: -110,
    underOdds: -110
  },
  '2025-W01-PHI-DAL': {
    gameId: '2025-W01-PHI-DAL',
    book: 'Fliff',
    moneylineHome: -115,
    moneylineAway: -105,
    totalPoints: 47.5,
    overOdds: -108,
    underOdds: -112
  }
};

export const MockOddsSource: OddsSource = {
  async getOddsByDate() {
    return Object.values(mock);
  },
  async getOddsForGame(gameId) {
    return mock[gameId] ?? null;
  }
};
