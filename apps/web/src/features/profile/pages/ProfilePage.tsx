import { useAuth } from '../../../app/providers/AuthProvider';
export function ProfilePage() {
  const { user } = useAuth();
  return <section className="container section profile"><span className="eyebrow">Your travel space</span><h1>Namaste, {user?.name} 👋</h1><p>Your traveller account is ready. Saved trips, road-trip builder, group travel and itineraries will be added in upcoming phases.</p><div className="profile-card"><h2>Account details</h2><dl><dt>Name</dt><dd>{user?.name}</dd><dt>Email</dt><dd>{user?.email}</dd><dt>Account type</dt><dd>{user?.role}</dd></dl></div></section>;
}