import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthProvider';

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const isRegister = mode === 'register';
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      if (isRegister) await signUp(name, email, password);
      else await signIn(email, password);
      const from = (location.state as {from?: unknown} | null)?.from;
      navigate(typeof from === 'string' && from.startsWith('/') && !from.startsWith('//') ? from : '/profile', { replace: true });
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to continue'); }
    finally { setBusy(false); }
  }
  return <section className="auth-wrap"><div className="auth-card"><span className="eyebrow">Welcome to GhoomYaar</span><h1>{isRegister ? 'Start exploring.' : 'Welcome back.'}</h1><p>{isRegister ? 'Create your traveller profile to prepare for your next adventure.' : 'Sign in to manage your GhoomYaar account.'}</p>
    <form onSubmit={e => void submit(e)}>
      {isRegister && <label>Full name<input autoComplete="name" required minLength={2} maxLength={80} value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" /></label>}
      <label>Email address<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" /></label>
      <label>Password<input type="password" required minLength={isRegister ? 10 : 1} autoComplete={isRegister ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={isRegister ? 'At least 10 characters' : 'Your password'} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-primary full" disabled={busy} type="submit">{busy ? 'Please wait…' : isRegister ? 'Create account →' : 'Sign in →'}</button>
    </form><p className="switch-link">{isRegister ? 'Already have an account?' : 'New to GhoomYaar?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create one'}</Link></p>
  </div></section>;
}