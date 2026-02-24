import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CalendarDays, Trophy, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_GAMES, DIVISIONS, calculateStandings } from '../lib/mockDataGen';
import type { MockGame } from '../lib/mockDataGen';
import './Dashboard.css';

export function Dashboard() {
    const [activeDivision, setActiveDivision] = useState(DIVISIONS[2].name); // Default to U10 Biddy

    // Fetch games for active division
    const divisionGames = MOCK_GAMES.filter(g => g.division === activeDivision);

    // Filter and group Upcoming Games
    const upcomingGames = divisionGames.filter(g => g.status === 'scheduled');
    const upcomingGrouped = upcomingGames.reduce((acc, game) => {
        if (!acc[game.date]) acc[game.date] = [];
        acc[game.date].push(game);
        return acc;
    }, {} as Record<string, MockGame[]>);

    const upcomingDates = Object.keys(upcomingGrouped)
        .sort((a, b) => Date.parse(a) - Date.parse(b))
        .slice(0, 3); // next 3 match days

    // Filter and group Recent Results
    const completedGames = divisionGames.filter(g => g.status === 'completed');
    const completedGrouped = completedGames.reduce((acc, game) => {
        if (!acc[game.date]) acc[game.date] = [];
        acc[game.date].push(game);
        return acc;
    }, {} as Record<string, MockGame[]>);

    const completedDates = Object.keys(completedGrouped)
        .sort((a, b) => Date.parse(b) - Date.parse(a))
        .slice(0, 3); // last 3 match days backwards

    // Conditionally fetch Standings
    const trackStandings = DIVISIONS.find(d => d.name === activeDivision)?.trackStandings;
    const standings = trackStandings ? calculateStandings(MOCK_GAMES, activeDivision) : [];
    const topStandings = standings.slice(0, 3);

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">League Center</h1>
                    <p className="page-subtitle">Welcome to the Fall 2026 Season</p>
                </div>
            </div>

            {/* Division Switcher */}
            <div className="division-switcher">
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

            <div className="dashboard-grid">
                {/* Main Content Column */}
                <div className="dashboard-main-col">
                    <Card className="dashboard-main-card">
                        <CardHeader className="flex-between">
                            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
                                <CalendarDays className="text-brand-primary" size={20} />
                                <CardTitle>Upcoming Games ({activeDivision})</CardTitle>
                            </div>
                            <Link to="/schedule" className="view-all-link">
                                Full Schedule <ArrowRight size={16} />
                            </Link>
                        </CardHeader>
                        <CardContent className="no-padding">
                            <div className="game-list-compact">
                                {upcomingDates.length === 0 ? (
                                    <div className="p-4 text-center text-secondary">No upcoming games scheduled.</div>
                                ) : (
                                    upcomingDates.map(date => (
                                        <React.Fragment key={date}>
                                            <div className="matchday-header">{date}</div>
                                            {upcomingGrouped[date].map(game => (
                                                <div key={game.id} className="game-item-compact">
                                                    <div className="game-datetime-compact">
                                                        <span className="time">{game.time}</span>
                                                    </div>
                                                    <div className="game-matchup-compact">
                                                        <div className="team-compact right">
                                                            <Link to={`/team/${game.homeTeamId}`} className="team-name-link">{game.homeTeam}</Link>
                                                        </div>
                                                        <div className="vs-badge">VS</div>
                                                        <div className="team-compact left">
                                                            <Link to={`/team/${game.awayTeamId}`} className="team-name-link">{game.awayTeam}</Link>
                                                        </div>
                                                    </div>
                                                    <div className="game-location-compact hidden-mobile">
                                                        <a href={game.field.url} target="_blank" rel="noopener noreferrer" className="field link">
                                                            {game.field.name}
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="dashboard-main-card mt-6">
                        <CardHeader className="flex-between">
                            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
                                <Activity className="text-brand-primary" size={20} />
                                <CardTitle>Recent Results ({activeDivision})</CardTitle>
                            </div>
                            <Link to="/schedule" className="view-all-link">
                                All Results <ArrowRight size={16} />
                            </Link>
                        </CardHeader>
                        <CardContent className="no-padding">
                            <div className="game-list-compact">
                                {completedDates.length === 0 ? (
                                    <div className="p-4 text-center text-secondary">No recent results to display.</div>
                                ) : (
                                    completedDates.map(date => (
                                        <React.Fragment key={date}>
                                            <div className="matchday-header">{date}</div>
                                            {completedGrouped[date].map(game => (
                                                <div key={game.id} className="game-item-compact result">
                                                    <div className="game-datetime-compact hidden-mobile">
                                                        <a href={game.field.url} target="_blank" rel="noopener noreferrer" className="field link" style={{ fontSize: '0.75rem' }}>
                                                            {game.field.name}
                                                        </a>
                                                    </div>
                                                    <div className="game-matchup-compact">
                                                        <div className={`team-compact right ${game.homeScore! > game.awayScore! ? 'winner' : ''}`}>
                                                            <Link to={`/team/${game.homeTeamId}`} className="team-name-link">{game.homeTeam}</Link>
                                                            <span className="score-badge">{game.homeScore}</span>
                                                        </div>
                                                        <div className="vs-badge subtle">-</div>
                                                        <div className={`team-compact left ${game.awayScore! > game.homeScore! ? 'winner' : ''}`}>
                                                            <span className="score-badge">{game.awayScore}</span>
                                                            <Link to={`/team/${game.awayTeamId}`} className="team-name-link">{game.awayTeam}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="dashboard-side-col">
                    {trackStandings && (
                        <Card variant="outline" className="mb-6">
                            <CardHeader className="flex-between">
                                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
                                    <Trophy className="text-brand-primary" size={20} />
                                    <CardTitle>Top Teams</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="no-padding">
                                <table className="standings-table-compact">
                                    <thead>
                                        <tr>
                                            <th>Pos</th>
                                            <th>Team</th>
                                            <th>Pts</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topStandings.map(row => (
                                            <tr key={row.rank}>
                                                <td className="rank">{row.rank}</td>
                                                <td className="team-name">
                                                    <Link to={`/team/${row.teamId}`} className="team-name-link">{row.team}</Link>
                                                </td>
                                                <td className="points">{row.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-4 text-center">
                                    <Link to="/schedule">
                                        <Button variant="outline" fullWidth size="sm">Full Standings</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card variant="outline">
                        <CardHeader>
                            <CardTitle>Announcements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="announcement-item">
                                <strong>Field 3 Maintenance</strong>
                                <p className="text-secondary text-sm mt-1">Field 3 will be closed for maintenance next Tuesday.</p>
                            </div>
                            <div className="announcement-item mt-4">
                                <strong>Photo Day Details</strong>
                                <p className="text-secondary text-sm mt-1">Team photos will take place on Saturday Oct 24th.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
