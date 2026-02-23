import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import './Auth.css';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <CardHeader>
                    <div className="flex-center" style={{ marginBottom: '1rem' }}>
                        <span className="brand-logo" style={{ fontSize: '2.5rem' }}>⚽</span>
                    </div>
                    <CardTitle style={{ textAlign: 'center' }}>Welcome Back</CardTitle>
                    <p className="auth-subtitle">Sign in to Kickers League</p>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="auth-form-content">
                        {error && <div className="auth-error">{error}</div>}
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </CardContent>
                    <CardFooter className="auth-footer">
                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                        <div className="auth-links">
                            <span className="text-secondary">Don't have an account?</span>{' '}
                            <Link to="/signup">Create one here</Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
