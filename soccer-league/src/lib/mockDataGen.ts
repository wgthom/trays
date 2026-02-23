// Utility to generate a comprehensive mock data set for the League
// Spring 2026 starts April 4, 2026
const SEASON_START = new Date('2026-04-04T09:00:00');

type DivisionConfig = {
    name: string;
    teamCount: number;
    trackStandings: boolean;
};

export const DIVISIONS: DivisionConfig[] = [
    { name: 'U6 Kinder Kickers', teamCount: 8, trackStandings: false },
    { name: 'U8 Little Kickers', teamCount: 10, trackStandings: false },
    { name: 'U10 Biddy', teamCount: 8, trackStandings: true },
    { name: 'U12 Inter', teamCount: 6, trackStandings: true },
    { name: 'U15 Senior', teamCount: 6, trackStandings: true },
];

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e'];
const MASCOTS = ['Tigers', 'Lions', 'Eagles', 'Sharks', 'Falcons', 'Dragons', 'Panthers', 'Wolves', 'Hawks', 'Bears', 'Storm', 'Thunder', 'Lightning', 'Tornadoes', 'Wildcats'];

export type MockTeam = {
    id: string;
    division: string;
    name: string;
    coach: string;
    colorPrimary: string;
    players: number;
};

export type MockGame = {
    id: string;
    division: string;
    homeTeam: string;
    homeColor: string;
    awayTeam: string;
    awayColor: string;
    date: string;
    time: string;
    field: {
        name: string;
        url: string;
    };
    status: 'scheduled' | 'completed';
    homeScore: number | null;
    awayScore: number | null;
    weekNumber: number;
};

export type MockStanding = {
    rank: number;
    team: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    points: number;
    gd: string;
};

function generateTeams(): MockTeam[] {
    const teams: MockTeam[] = [];
    let teamCounter = 1;

    DIVISIONS.forEach(div => {
        const divisionMascots = [...MASCOTS].sort(() => 0.5 - Math.random());
        const divisionColors = [...COLORS].sort(() => 0.5 - Math.random());

        for (let i = 0; i < div.teamCount; i++) {
            teams.push({
                id: `t${teamCounter++}`,
                division: div.name,
                name: divisionMascots[i] || `Team ${i + 1}`,
                coach: `Coach ${String.fromCharCode(65 + i)}`,
                colorPrimary: divisionColors[i % divisionColors.length],
                players: Math.floor(Math.random() * 4) + 12 // 12-15 players
            });
        }
    });

    return teams;
}

function generateSchedule(teams: MockTeam[]): MockGame[] {
    const games: MockGame[] = [];
    let gameCounter = 1;

    DIVISIONS.forEach(div => {
        const divisionTeams = teams.filter(t => t.division === div.name);

        // Simple Round Robin generator for 8 weeks
        // If odd number of teams, one gets a 'bye' (handled vaguely here by ignoring)
        for (let week = 1; week <= 8; week++) {
            // Assign a date for the week (Saturday)
            const gameDate = new Date(SEASON_START);
            gameDate.setDate(gameDate.getDate() + ((week - 1) * 7));

            const dateStr = gameDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            // Randomly pair teams up for the week
            const availableTeams = [...divisionTeams].sort(() => 0.5 - Math.random());

            while (availableTeams.length >= 2) {
                const home = availableTeams.pop()!;
                const away = availableTeams.pop()!;

                // Set times spaced out
                const timeStr = `${9 + Math.floor(Math.random() * 6)}:00 AM`;

                // Half the season is over (Weeks 1-4 completed)
                const isCompleted = week <= 4;
                const simulateScore = isCompleted && div.trackStandings;

                games.push({
                    id: `g${gameCounter++}`,
                    division: div.name,
                    homeTeam: home.name,
                    homeColor: home.colorPrimary,
                    awayTeam: away.name,
                    awayColor: away.colorPrimary,
                    date: dateStr,
                    time: timeStr,
                    field: {
                        name: `SSPJ Upper`,
                        url: `https://maps.app.goo.gl/CwzaZYJqmyJ5GRND6`
                    },
                    status: isCompleted ? 'completed' : 'scheduled',
                    weekNumber: week,
                    homeScore: simulateScore ? Math.floor(Math.random() * 5) : null,
                    awayScore: simulateScore ? Math.floor(Math.random() * 5) : null
                });
            }
        }
    });

    return games;
}

export function calculateStandings(games: MockGame[], divisionName: string): MockStanding[] {
    const divisionGames = games.filter(g => g.division === divisionName && g.status === 'completed' && g.homeScore !== null);

    const stats: Record<string, any> = {};

    divisionGames.forEach(game => {
        if (!stats[game.homeTeam]) stats[game.homeTeam] = { played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0 };
        if (!stats[game.awayTeam]) stats[game.awayTeam] = { played: 0, won: 0, drawn: 0, lost: 0, points: 0, gf: 0, ga: 0 };

        stats[game.homeTeam].played++;
        stats[game.awayTeam].played++;

        stats[game.homeTeam].gf += game.homeScore!;
        stats[game.homeTeam].ga += game.awayScore!;
        stats[game.awayTeam].gf += game.awayScore!;
        stats[game.awayTeam].ga += game.homeScore!;

        if (game.homeScore! > game.awayScore!) {
            stats[game.homeTeam].won++;
            stats[game.homeTeam].points += 3;
            stats[game.awayTeam].lost++;
        } else if (game.homeScore! < game.awayScore!) {
            stats[game.awayTeam].won++;
            stats[game.awayTeam].points += 3;
            stats[game.homeTeam].lost++;
        } else {
            stats[game.homeTeam].drawn++;
            stats[game.awayTeam].drawn++;
            stats[game.homeTeam].points += 1;
            stats[game.awayTeam].points += 1;
        }
    });

    const standings = Object.keys(stats).map(teamName => {
        const s = stats[teamName];
        const gd = s.gf - s.ga;
        return {
            rank: 0,
            team: teamName,
            played: s.played,
            won: s.won,
            drawn: s.drawn,
            lost: s.lost,
            points: s.points,
            gd: gd > 0 ? `+${gd}` : `${gd}`
        };
    });

    // Sort by points, then gd, then team name
    standings.sort((a, b) => b.points - a.points || (parseInt(b.gd) - parseInt(a.gd)) || a.team.localeCompare(b.team));

    return standings.map((s, index) => ({ ...s, rank: index + 1 }));
}

// Generate the data ONCE
export const MOCK_TEAMS = generateTeams();
export const MOCK_GAMES = generateSchedule(MOCK_TEAMS);
export const MOCK_STANDINGS_U10 = calculateStandings(MOCK_GAMES, 'U10 Biddy');
export const MOCK_STANDINGS_U12 = calculateStandings(MOCK_GAMES, 'U12 Inter');
