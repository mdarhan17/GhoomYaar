import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SiteLayout } from '../layouts/SiteLayout';
import { AuthGuard } from '../guards/AuthGuard';
import { HomePage } from '../../features/home/pages/HomePage';
import { ExplorePage } from '../../features/explore-india/pages/ExplorePage';
import { AuthPage } from '../../features/auth/pages/AuthPage';
import { ProfilePage } from '../../features/profile/pages/ProfilePage';

export function AppRouter() {
  return <BrowserRouter><Routes><Route element={<SiteLayout />}>
    <Route index element={<HomePage />} />
    <Route path="explore" element={<ExplorePage />} />
    <Route path="login" element={<AuthPage mode="login" />} />
    <Route path="register" element={<AuthPage mode="register" />} />
    <Route path="profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route></Routes></BrowserRouter>;
}