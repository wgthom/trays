import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import './Auth.css';

export function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                    }
                }
            });

            if (signUpError) throw signUpError;

            if (data.user && data.user.identities && data.user.identities.length === 0) {
                setError('An account with this email address already exists.');
            } else {
                setSuccessMsg('Registration successful! Check your email to verify your account, or sign in if verification is disabled.');
                // In a real app with email verification forced off, we might just navigate.
                // For MVP, if it succeeds, let's redirect to login for them to try, or they will Auto-login.
                setTimeout(() => navigate('/'), 3000);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
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
                    <CardTitle style={{ textAlign: 'center' }}>Create Account</CardTitle>
                    <p className="auth-subtitle">Join Kickers League</p>
                </CardHeader>
                <form onSubmit={handleSignup}>
                    <CardContent className="auth-form-content">
                        {error && <div className="auth-error">{error}</div>}
                        {successMsg && <div className="auth-success">{successMsg}</div>}

                        <div className="form-row">
                            <Input
                                label="First Name"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <Input
                                label="Last Name"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

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
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </CardContent>
                    <CardFooter className="auth-footer">
                        <Button type="submit" fullWidth disabled={loading}>
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </Button>
                        <div className="auth-links">
                            <span className="text-secondary">Already have an account?</span>{' '}
                            <Link to="/login">Sign in</Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
