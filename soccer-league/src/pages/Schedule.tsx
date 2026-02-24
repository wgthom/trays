import { useState } from 'react';
import { MOCK_GAMES, DIVISIONS, calculateStandings } from '../lib/mockDataGen';
import type { MockGame, MockStanding } from '../lib/mockDataGen';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import './Schedule.css';

export function Schedule() {
    const [activeTab, setActiveTab] = useState<'schedule' | 'standings'>('schedule');
    const [activeDivision, setActiveDivision] = useState(DIVISIONS[2].name); // Default U10 Biddy

    // Fetch and group games for the active division
    const divisionGames = MOCK_GAMES.filter(g => g.division === activeDivision);

    // Group all games by match day (date)
    const gamesGroupedByDate = divisionGames.reduce((acc, game) => {
        if (!acc[game.date]) acc[game.date] = [];
        acc[game.date].push(game);
        return acc;
    }, {} as Record<string, MockGame[]>);

    // Sort dates chronologically
    const sortedDates = Object.keys(gamesGroupedByDate).sort((a, b) => Date.parse(a) - Date.parse(b));

    // Standings calculation
    const trackStandings = DIVISIONS.find(d => d.name === activeDivision)?.trackStandings;
    const standings: MockStanding[] = trackStandings ? calculateStandings(MOCK_GAMES, activeDivision) : [];

    return (
        <div className="schedule-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">League Center</h1>
                    <p className="page-subtitle">View upcoming matches and current standings.</p>
                </div>

                <div className="tab-container">
                    <button
                        className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
                        onClick={() => setActiveTab('schedule')}
                    >
                        Schedule
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'standings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('standings')}
                    >
                        Standings
                    </button>
                </div>
            </div>

            {/* Division Switcher */}
            <div className="division-switcher" style={{ marginBottom: '2rem' }}>
                {DIVISIONS.map(div => (
                    <button
                        key={div.name}
                        className={`div-btn ${activeDivision === div.name ? 'active' : ''}`}
                        onClick={() => setActiveDivision(div.name)}
                    >
                        {div.name}
                    </button>
                ))}
            </div>

            {activeTab === 'schedule' ? (
                <Card variant="outline" className="schedule-card">
                    <CardContent className="no-padding">
                        <div className="table-wrapper">
                            <table className="schedule-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Home</th>
                                        <th>Score</th>
                                        <th>Away</th>
                                        <th>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {divisionGames.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-secondary text-center p-4">No games scheduled for this division.</td>
                                        </tr>
                                    ) : (
                                        divisionGames.sort((a, b) => Date.parse(a.date) - Date.parse(b.date) || a.time.localeCompare(b.time)).map(game => {
                                            const isCompleted = game.status === 'completed';
                                            // Handle parsing 'Apr 4, 2026' into '04/04'
                                            const parsedDate = new Date(game.date);
                                            const shortDate = `${String(parsedDate.getMonth() + 1).padStart(2, '0')}/${String(parsedDate.getDate()).padStart(2, '0')}`;

                                            return (
                                                <tr key={game.id} className="game-row">
                                                    <td className="game-date-cell">{shortDate}</td>
                                                    <td className="game-time">{game.time}</td>
                                                    <td className="team-cell home text-right">
                                                        <span className="team-name">
                                                            <Link to={`/team/${game.homeTeamId}`} className="team-name-link">{game.homeTeam}</Link>
                                                        </span>
                                                        <div className="team-color-dot" style={{ backgroundColor: game.homeColor }} />
                                                    </td>
                                                    <td className="score-cell text-center">
                                                        {isCompleted ? (
                                                            <span className="score font-bold">
                                                                {game.homeScore} - {game.awayScore}
                                                            </span>
                                                        ) : (
                                                            <span className="vs text-secondary">vs</span>
                                                        )}
                                                    </td>
                                                    <td className="team-cell away">
                                                        <div className="team-color-dot" style={{ backgroundColor: game.awayColor }} />
                                                        <span className="team-name">
                                                            <Link to={`/team/${game.awayTeamId}`} className="team-name-link">{game.awayTeam}</Link>
                                                        </span>
                                                    </td>
                                                    <td className="location-cell">
                                                        <a href={game.field.url} target="_blank" rel="noopener noreferrer" className="game-field link">
                                                            {game.field.name}
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="standings-tables-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {!trackStandings ? (
                        <div className="standings-note text-secondary" style={{ padding: '0 1rem', fontSize: '0.875rem' }}>
                            Note: The {activeDivision} division does not track standings.
                        </div>
                    ) : (
                        <Card variant="outline" className="standings-card">
                            <CardHeader>
                                <CardTitle>{activeDivision} - Current Standings</CardTitle>
                            </CardHeader>
                            <CardContent className="no-padding">
                                <div className="table-wrapper">
                                    <table className="standings-table">
                                        <thead>
                                            <tr>
                                                <th>Pos</th>
                                                <th>Team</th>
                                                <th>P</th>
                                                <th>W</th>
                                                <th>D</th>
                                                <th>L</th>
                                                <th>GD</th>
                                                <th>Pts</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {standings.map(row => (
                                                <tr key={row.rank}>
                                                    <td className="rank">{row.rank}</td>
                                                    <td className="team-cell">
                                                        <Link to={`/team/${row.teamId}`} className="team-name-link">{row.team}</Link>
                                                    </td>
                                                    <td>{row.played}</td>
                                                    <td>{row.won}</td>
                                                    <td>{row.drawn}</td>
                                                    <td>{row.lost}</td>
                                                    <td>{row.gd}</td>
                                                    <td className="points">{row.points}</td>
                                                </tr>
                                            ))}
                                            {standings.length === 0 && (
                                                <tr>
                                                    <td colSpan={8} className="text-center text-secondary py-4">No results recorded yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
}
