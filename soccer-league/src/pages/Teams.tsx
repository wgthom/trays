import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Dialog } from '../components/ui/Dialog';
import { Users, MoreVertical, Plus } from 'lucide-react';
import { MOCK_TEAMS } from '../lib/mockDataGen';
import { MOCK_ROSTER } from '../lib/mockData'; // Roster stays static for now
import './Teams.css';

export function Teams() {
    const [selectedTeam, setSelectedTeam] = useState<any | null>(null);
    const [isRosterOpen, setIsRosterOpen] = useState(false);

    const handleViewRoster = (team: any) => {
        setSelectedTeam(team);
        setIsRosterOpen(true);
    };

    return (
        <div className="teams-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Teams</h1>
                    <p className="page-subtitle">Manage league rosters and coaching staff.</p>
                </div>
                <Button className="flex-center" style={{ gap: '0.5rem' }}>
                    <Plus size={18} />
                    Create Team
                </Button>
            </div>

            <div className="teams-grid">
                {MOCK_TEAMS.map((team) => (
                    <Card key={team.id} className="team-card" variant="outline">
                        <div className="team-color-strip" style={{ backgroundColor: team.colorPrimary }} />
                        <CardHeader className="team-card-header">
                            <div>
                                <CardTitle>{team.name}</CardTitle>
                                <span className="team-division">{team.division}</span>
                            </div>
                            <button className="icon-button"><MoreVertical size={20} /></button>
                        </CardHeader>
                        <CardContent className="team-content">
                            <div className="team-stat">
                                <span className="stat-label">Coach</span>
                                <span className="stat-value">{team.coach}</span>
                            </div>
                            <div className="team-stat">
                                <span className="stat-label">Players</span>
                                <span className="stat-value flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem' }}>
                                    <Users size={16} />
                                    {team.players}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="secondary"
                                fullWidth
                                onClick={() => handleViewRoster(team)}
                            >
                                View Roster
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Dialog
                isOpen={isRosterOpen}
                onClose={() => setIsRosterOpen(false)}
                title={selectedTeam ? `${selectedTeam.name} Roster` : 'Team Roster'}
                footer={
                    <Button onClick={() => setIsRosterOpen(false)}>Close</Button>
                }
            >
                <div className="roster-list">
                    {MOCK_ROSTER.map(player => (
                        <div key={player.id} className="roster-item">
                            <div className="player-number">{player.number}</div>
                            <div className="player-info">
                                <span className="player-name">{player.name}</span>
                                <span className="player-role">{player.role}</span>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                    ))}
                </div>
            </Dialog>
        </div>
    );
}
