import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_TEAMS, MOCK_GAMES } from '../lib/mockDataGen';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { ArrowLeft, CalendarDays, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MOCK_ROSTER } from '../lib/mockData';
import '../pages/Schedule.css'; // Reuse game list styles

export function TeamDetail() {
    const { teamId } = useParams<{ teamId: string }>();
    const navigate = useNavigate();

    const team = MOCK_TEAMS.find(t => t.id === teamId);

    // Safety check
    if (!team) {
        return (
            <div className="p-4 text-center">
                <h2>Team not found.</h2>
                <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
            </div>
        );
    }

    const teamGames = MOCK_GAMES.filter(g => g.homeTeamId === team.id || g.awayTeamId === team.id)
        .sort((a, b) => a.weekNumber - b.weekNumber);

    const completedGames = teamGames.filter(g => g.status === 'completed');

    // Quick calculate record
    let won = 0; let lost = 0; let drawn = 0;
    completedGames.forEach(g => {
        const isHome = g.homeTeamId === team.id;
        const myScore = isHome ? g.homeScore! : g.awayScore!;
        const oppScore = isHome ? g.awayScore! : g.homeScore!;

        if (myScore > oppScore) won++;
        else if (myScore < oppScore) lost++;
        else drawn++;
    });

    return (
        <div className="team-detail-page p-4">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-secondary mb-4 hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
                style={{ fontSize: '0.875rem', fontWeight: 500 }}
            >
                <ArrowLeft size={16} className="mr-1" /> Back
            </button>

            <div className="page-header mb-6">
                <div>
                    <h1 className="page-title">{team.name}</h1>
                    <p className="page-subtitle">{team.division} • {team.coach}</p>
                </div>
                <div className="flex-center gap-2">
                    <div className="px-3 py-1 bg-secondary rounded-full font-bold text-sm">
                        {won}W - {drawn}D - {lost}L
                    </div>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: team.colorPrimary }} />
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Schedule Column */}
                <div className="dashboard-main-col">
                    <Card variant="outline">
                        <CardHeader className="flex-between">
                            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
                                <CalendarDays className="text-brand-primary" size={20} />
                                <CardTitle>Season Schedule</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="no-padding">
                            <div className="games-list" style={{ gridTemplateColumns: '1fr' }}>
                                {teamGames.map(game => {
                                    const isHome = game.homeTeamId === team.id;
                                    const isCompleted = game.status === 'completed';

                                    return (
                                        <div key={game.id} className="game-card-inner p-4 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                                            <div className="game-datetime">
                                                <span className="game-date">{game.date}</span>
                                                <span className="game-time">{game.time}</span>
                                                <a href={game.field.url} target="_blank" rel="noopener noreferrer" className="game-field link">
                                                    {game.field.name}
                                                </a>
                                            </div>

                                            <div className="game-matchup mt-2">
                                                <div className={`team home ${isCompleted && game.homeScore! > game.awayScore! ? 'winner' : ''}`}>
                                                    <div className="team-name">
                                                        {isHome ? <strong>{game.homeTeam}</strong> : <Link to={`/team/${game.homeTeamId}`} className="team-name-link">{game.homeTeam}</Link>}
                                                    </div>
                                                    <div className="team-color-dot" style={{ backgroundColor: game.homeColor }} />
                                                    <span className="score">{isCompleted ? game.homeScore : '-'}</span>
                                                </div>

                                                <div className="vs-divider text-xs text-secondary">
                                                    {isCompleted ? 'Final' : 'vs'}
                                                </div>

                                                <div className={`team away ${isCompleted && game.awayScore! > game.homeScore! ? 'winner' : ''}`}>
                                                    <span className="score">{isCompleted ? game.awayScore : '-'}</span>
                                                    <div className="team-color-dot" style={{ backgroundColor: game.awayColor }} />
                                                    <div className="team-name">
                                                        {!isHome ? <strong>{game.awayTeam}</strong> : <Link to={`/team/${game.awayTeamId}`} className="team-name-link">{game.awayTeam}</Link>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Roster Column */}
                <div className="dashboard-side-col">
                    <Card variant="outline">
                        <CardHeader className="flex-between">
                            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
                                <Users className="text-brand-primary" size={20} />
                                <CardTitle>Team Roster</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="roster-list">
                                {MOCK_ROSTER.slice(0, team.players).map(player => (
                                    <div key={player.id} className="flex-between py-2 border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                                        <div className="flex-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-secondary flex-center font-bold text-xs" style={{ color: 'var(--text-secondary)' }}>
                                                {player.number}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm text-primary">{player.name}</span>
                                                <span className="text-xs text-secondary">{player.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
