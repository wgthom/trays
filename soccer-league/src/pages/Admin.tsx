import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Settings, Users, CalendarPlus, Trophy } from 'lucide-react';
import './Admin.css';

export function Admin() {
    return (
        <div className="admin-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Admin Control Panel</h1>
                    <p className="page-subtitle">Manage league settings, seasons, and divisions.</p>
                </div>
            </div>

            <div className="admin-grid">
                <Card variant="outline" className="admin-widget">
                    <CardHeader>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
                            <Trophy className="text-brand-primary" size={24} />
                            <CardTitle>Seasons & Divisions</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-secondary mb-4">Create new seasons, set up age groups, and configure standings rules.</p>
                        <Button fullWidth>Manage Seasons</Button>
                    </CardContent>
                </Card>

                <Card variant="outline" className="admin-widget">
                    <CardHeader>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
                            <Users className="text-brand-primary" size={24} />
                            <CardTitle>User Management</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-secondary mb-4">Assign coaches to teams, manage admin roles, and handle parent accounts.</p>
                        <Button fullWidth variant="secondary">Manage Users</Button>
                    </CardContent>
                </Card>

                <Card variant="outline" className="admin-widget">
                    <CardHeader>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
                            <CalendarPlus className="text-brand-primary" size={24} />
                            <CardTitle>Schedule Generator</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-secondary mb-4">Auto-generate league schedules, assign fields, and resolve conflicts.</p>
                        <Button fullWidth variant="outline">Generate Schedule</Button>
                    </CardContent>
                </Card>

                <Card variant="outline" className="admin-widget">
                    <CardHeader>
                        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.75rem' }}>
                            <Settings className="text-brand-primary" size={24} />
                            <CardTitle>System Settings</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-secondary mb-4">Configure league branding, notifications, and registration windows.</p>
                        <Button fullWidth variant="ghost">Open Settings</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
