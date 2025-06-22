import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import TopicProblems from './pages/TopicProblems';
import ProblemDetail from './pages/ProblemDetail';
import MockArena from './pages/MockArena';
import InterviewRoom from './pages/InterviewRoom';
import MockInterview from './pages/MockInterview';
import InviteAccept from './pages/InviteAccept';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import CodeEditor from './pages/CodeEditor';
import EmailInvite from './pages/EmailInvite';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/invite/:id" element={<InviteAccept />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/topic/:topic" element={
                <ProtectedRoute>
                  <TopicProblems />
                </ProtectedRoute>
              } />
              <Route path="/problem/:id" element={
                <ProtectedRoute>
                  <ProblemDetail />
                </ProtectedRoute>
              } />
              <Route path="/mock-arena" element={
                <ProtectedRoute>
                  <MockArena />
                </ProtectedRoute>
              } />
              <Route path="/interview/:id" element={
                <ProtectedRoute>
                  <InterviewRoom />
                </ProtectedRoute>
              } />
              <Route path="/mock-interview" element={
                <ProtectedRoute>
                  <MockInterview />
                </ProtectedRoute>
              } />
              <Route path="/code-editor" element={
                <ProtectedRoute>
                  <CodeEditor />
                </ProtectedRoute>
              } />
              <Route path="/email-invite" element={
                <ProtectedRoute>
                  <EmailInvite />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;