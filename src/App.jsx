import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/SignupPage';
import { LoginPage } from './pages/LoginPage';
import { ExplorePage } from './pages/ExplorePage';
import { CreateIdeaPage } from './pages/CreateIdeaPage';
import { IdeaDetailsPage } from './pages/IdeaDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / → IdeaHub Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* /signup → Create Your Account page (kept exactly as it looks) */}
        <Route path="/signup" element={<SignupPage />} />

        {/* /login → Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* /explore → Explore Ideas page */}
        <Route path="/explore" element={<ExplorePage />} />

        {/* /create → Create Idea page */}
        <Route path="/create" element={<CreateIdeaPage />} />

        {/* /idea/:id → Idea Details page */}
        <Route path="/idea/:id" element={<IdeaDetailsPage />} />

        {/* /profile → User Profile page */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* /profile/edit → Edit Profile page */}
        <Route path="/profile/edit" element={<EditProfilePage />} />

        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


