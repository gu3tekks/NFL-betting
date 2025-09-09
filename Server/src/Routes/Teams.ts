import { Router } from 'express';
export const teamsRouter = Router();

const teams = [
  { teamId: 'ARI', name: 'Arizona Cardinals', abbreviation: 'ARI', conference: 'NFC', division: 'West' },
  { teamId: 'ATL', name: 'Atlanta Falcons', abbreviation: 'ATL', conference: 'NFC', division: 'South' },
  { teamId: 'BAL', name: 'Baltimore Ravens', abbreviation: 'BAL', conference: 'AFC', division: 'North' },
  { teamId: 'BUF', name: 'Buffalo Bills', abbreviation: 'BUF', conference: 'AFC', division: 'East' },
  { teamId: 'CAR', name: 'Carolina Panthers', abbreviation: 'CAR', conference: 'NFC', division: 'South' },
  { teamId: 'CHI', name: 'Chicago Bears', abbreviation: 'CHI', conference: 'NFC', division: 'North' },
  { teamId: 'CIN', name: 'Cincinnati Bengals', abbreviation: 'CIN', conference: 'AFC', division: 'North' },
  { teamId: 'CLE', name: 'Cleveland Browns', abbreviation: 'CLE', conference: 'AFC', division: 'North' },
  { teamId: 'DAL', name: 'Dallas Cowboys', abbreviation: 'DAL', conference: 'NFC', division: 'East' },
  { teamId: 'DEN', name: 'Denver Broncos', abbreviation: 'DEN', conference: 'AFC', division: 'West' },
  { teamId: 'DET', name: 'Detroit Lions', abbreviation: 'DET', conference: 'NFC', division: 'North' },
  { teamId: 'GB', name: 'Green Bay Packers', abbreviation: 'GB', conference: 'NFC', division: 'North' },
  { teamId: 'HOU', name: 'Houston Texans', abbreviation: 'HOU', conference: 'AFC', division: 'South' },
  { teamId: 'IND', name: 'Indianapolis Colts', abbreviation: 'IND', conference: 'AFC', division: 'South' },
  { teamId: 'JAX', name: 'Jacksonville Jaguars', abbreviation: 'JAX', conference: 'AFC', division: 'South' },
  { teamId: 'KC', name: 'Kansas City Chiefs', abbreviation: 'KC', conference: 'AFC', division: 'West' },
  { teamId: 'LV', name: 'Las Vegas Raiders', abbreviation: 'LV', conference: 'AFC', division: 'West' },
  { teamId: 'LAC', name: 'Los Angeles Chargers', abbreviation: 'LAC', conference: 'AFC', division: 'West' },
  { teamId: 'LAR', name: 'Los Angeles Rams', abbreviation: 'LAR', conference: 'NFC', division: 'West' },
  { teamId: 'MIA', name: 'Miami Dolphins', abbreviation: 'MIA', conference: 'AFC', division: 'East' },
  { teamId: 'MIN', name: 'Minnesota Vikings', abbreviation: 'MIN', conference: 'NFC', division: 'North' },
  { teamId: 'NE', name: 'New England Patriots', abbreviation: 'NE', conference: 'AFC', division: 'East' },
  { teamId: 'NO', name: 'New Orleans Saints', abbreviation: 'NO', conference: 'NFC', division: 'South' },
  { teamId: 'NYG', name: 'New York Giants', abbreviation: 'NYG', conference: 'NFC', division: 'East' },
  { teamId: 'NYJ', name: 'New York Jets', abbreviation: 'NYJ', conference: 'AFC', division: 'East' },
  { teamId: 'PHI', name: 'Philadelphia Eagles', abbreviation: 'PHI', conference: 'NFC', division: 'East' },
  { teamId: 'PIT', name: 'Pittsburgh Steelers', abbreviation: 'PIT', conference: 'AFC', division: 'North' },
  { teamId: 'SF', name: 'San Francisco 49ers', abbreviation: 'SF', conference: 'NFC', division: 'West' },
  { teamId: 'SEA', name: 'Seattle Seahawks', abbreviation: 'SEA', conference: 'NFC', division: 'West' },
  { teamId: 'TB', name: 'Tampa Bay Buccaneers', abbreviation: 'TB', conference: 'NFC', division: 'South' },
  { teamId: 'TEN', name: 'Tennessee Titans', abbreviation: 'TEN', conference: 'AFC', division: 'South' },
  { teamId: 'WAS', name: 'Washington Commanders', abbreviation: 'WAS', conference: 'NFC', division: 'East' }
];

teamsRouter.get('/', (_req, res) => res.json({ teams }));
