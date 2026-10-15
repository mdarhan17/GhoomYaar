import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './app/providers/AuthProvider';
import { AppRouter } from './app/router';
import './styles/global.css';

const container = document.getElementById('root');
if (!container) throw new Error('React mount point missing');
createRoot(container).render(<React.StrictMode><AuthProvider><AppRouter /></AuthProvider></React.StrictMode>);