import * as React from 'react';
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import './styles/theme.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

// Contexts
import { TeamProvider } from './context/TeamContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Nav from './components/Nav';
import Footer from './components/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';

// Lazy loaded components
const Employees = lazy(() => import('./components/Employees'));
const GroupedTeamMembers = lazy(() => import('./components/GroupedTeamMembers'));
const NotFound = lazy(() => import('./components/NotFound'));
const Header = lazy(() => import('./components/Header'));
const AdvancedDashboard = lazy(() => import('./components/AdvancedDashboard'));
const DraggableTeamBoard = lazy(() => import('./components/DraggableTeamBoard'));

function App() {
  return (
    <ThemeProvider>
      <TeamProvider>
        <Router basename="/">
          <div className="App">
            <Nav />
            <Suspense fallback={<LoadingSpinner />}>
              <Header />
              <Routes>
                <Route exact path="/" element={<Employees />} />
                <Route path="/dashboard" element={<AdvancedDashboard />} />
                <Route path="/grouped-team-members" element={<GroupedTeamMembers />} />
                <Route path="/drag-and-drop" element={<DraggableTeamBoard />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
            <ThemeToggle />
            <Footer />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </TeamProvider>
    </ThemeProvider>
  );
}

export default App;