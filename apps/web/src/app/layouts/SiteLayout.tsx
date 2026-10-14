import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
export function SiteLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  async function logout() { await signOut(); navigate('/'); }
  return <div className="app-shell">
    <header className="topbar"><div className="topbar-inner">
      <Link to="/" className="brand"><span className="brand-mark">G</span> GhoomYaar<span className="brand-dot">.</span></Link>
      <nav aria-label="Main navigation">
        <NavLink to="/">Home</NavLink><NavLink to="/explore">Explore India</NavLink>
        {user ? <NavLink to="/profile">My Account</NavLink> : <NavLink to="/login">Sign in</NavLink>}
      </nav>
      {user ? <button className="btn btn-outline btn-small" onClick={() => void logout()}>Sign out</button> : <Link className="btn btn-primary btn-small" to="/register">Join GhoomYaar</Link>}
    </div></header>
    <main><Outlet /></main>
    <footer className="footer"><div className="container">© {new Date().getFullYear()} GhoomYaar • Explore India, Your Way • Phase 1 foundation</div></footer>
  </div>;
}