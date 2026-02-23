export const MOCK_GAMES = [
    {
        id: 'g1',
        division: 'U10 Boys',
        homeTeam: 'Thunder FC',
        homeColor: '#2563eb',
        awayTeam: 'Falcons',
        awayColor: '#ef4444',
        date: 'Oct 12, 2026',
        time: '09:00 AM',
        field: 'Field 1',
        status: 'completed',
        homeScore: 3,
        awayScore: 1
    },
    {
        id: 'g2',
        division: 'U8 COED',
        homeTeam: 'Tornadoes',
        homeColor: '#f59e0b',
        awayTeam: 'Wildcats',
        awayColor: '#8b5cf6',
        date: 'Oct 14, 2026',
        time: '11:30 AM',
        field: 'Field 3',
        status: 'scheduled',
        homeScore: null,
        awayScore: null
    },
    {
        id: 'g3',
        division: 'U12 Girls',
        homeTeam: 'Lightning',
        homeColor: '#10b981',
        awayTeam: 'Storm',
        awayColor: '#ec4899',
        date: 'Oct 14, 2026',
        time: '01:00 PM',
        field: 'Main Stadium',
        status: 'scheduled',
        homeScore: null,
        awayScore: null
    }
];

export const MOCK_STANDINGS = [
    { rank: 1, team: 'Thunder FC', played: 5, won: 4, drawn: 1, lost: 0, points: 13, gd: '+8' },
    { rank: 2, team: 'Falcons', played: 5, won: 3, drawn: 1, lost: 1, points: 10, gd: '+4' },
    { rank: 3, team: 'Eagles', played: 5, won: 2, drawn: 0, lost: 3, points: 6, gd: '-2' },
    { rank: 4, team: 'Sharks', played: 5, won: 0, drawn: 0, lost: 5, points: 0, gd: '-10' },
];
