import { useState } from 'react';
import { MOCK_GAMES, MOCK_STANDINGS_U10, MOCK_STANDINGS_U12 } from '../lib/mockDataGen';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import './Schedule.css';

export function Schedule() {
    const [activeTab, setActiveTab] = useState<'schedule' | 'standings'>('schedule');

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

            {activeTab === 'schedule' ? (
                <div className="games-list">
                    {MOCK_GAMES.map(game => (
                        <Card key={game.id} className="game-card" variant="outline">
                            <div className="game-card-inner">
                                <div className="game-datetime">
                                    <span className="game-date">{game.date}</span>
                                    <span className="game-time">{game.time}</span>
                                    <a href={game.field.url} target="_blank" rel="noopener noreferrer" className="game-field link">
                                        {game.field.name}
                                    </a>
                                    <span className="game-division">{game.division}</span>
                                </div>

                                <div className="game-matchup">
                                    <div className="team home">
                                        <span className="team-name">{game.homeTeam}</span>
                                        <div className="team-color-dot" style={{ backgroundColor: game.homeColor }} />
                                        <span className="score">{game.status === 'completed' ? game.homeScore : '-'}</span>
                                    </div>

                                    <div className="vs-divider">
                                        {game.status === 'completed' ? 'Final' : 'vs'}
                                    </div>

                                    <div className="team away">
                                        <span className="score">{game.status === 'completed' ? game.awayScore : '-'}</span>
                                        <div className="team-color-dot" style={{ backgroundColor: game.awayColor }} />
                                        <span className="team-name">{game.awayTeam}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="standings-tables-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Card variant="outline" className="standings-card">
                        <CardHeader>
                            <CardTitle>U10 Biddy - Current Standings</CardTitle>
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
                                        {MOCK_STANDINGS_U10.map(row => (
                                            <tr key={row.rank}>
                                                <td className="rank">{row.rank}</td>
                                                <td className="team-cell">{row.team}</td>
                                                <td>{row.played}</td>
                                                <td>{row.won}</td>
                                                <td>{row.drawn}</td>
                                                <td>{row.lost}</td>
                                                <td>{row.gd}</td>
                                                <td className="points">{row.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <Card variant="outline" className="standings-card">
                        <CardHeader>
                            <CardTitle>U12 Inter - Current Standings</CardTitle>
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
                                        {MOCK_STANDINGS_U12.map(row => (
                                            <tr key={row.rank}>
                                                <td className="rank">{row.rank}</td>
                                                <td className="team-cell">{row.team}</td>
                                                <td>{row.played}</td>
                                                <td>{row.won}</td>
                                                <td>{row.drawn}</td>
                                                <td>{row.lost}</td>
                                                <td>{row.gd}</td>
                                                <td className="points">{row.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="standings-note text-secondary" style={{ padding: '0 1rem', fontSize: '0.875rem' }}>
                        Note: U8 divisions and below do not track standings.
                    </div>
                </div>
            )}
        </div>
    );
}
