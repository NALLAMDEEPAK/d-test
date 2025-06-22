import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import TopicProblems from './pages/TopicProblems';
import ProblemDetail from './pages/ProblemDetail';
import MockArena from './pages/MockArena';
import InterviewRoom from './pages/InterviewRoom';
import MockInterview from './pages/MockInterview';
import InviteAccept from './pages/InviteAccept';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/topic/:topic" element={<TopicProblems />} />
            <Route path="/problem/:id" element={<ProblemDetail />} />
            <Route path="/mock-arena" element={<MockArena />} />
            <Route path="/interview/:id" element={<InterviewRoom />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/invite/:id" element={<InviteAccept />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;