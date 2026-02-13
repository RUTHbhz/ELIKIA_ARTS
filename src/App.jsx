import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ArtworkDetail from './pages/ArtworkDetail';
import Artists from './pages/Artists';
import Journal from './pages/Journal';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import FullGallery from './pages/FullGallery';
import ArtistProfile from './pages/ArtistProfile';
import JournalDetail from './pages/JournalDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import OrderTracking from './pages/OrderTracking';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import './index.css';

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Component to protect admin routes
const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Component to prevent admins from accessing public pages
const AdminExclusiveRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  // If user is admin, redirect them to admin space
  if (currentUser && currentUser.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <CartDrawer />
              <main className="content">
                <Routes>
                  <Route path="/" element={<AdminExclusiveRoute><Home /></AdminExclusiveRoute>} />
                  <Route path="/gallery" element={<AdminExclusiveRoute><FullGallery /></AdminExclusiveRoute>} />
                  <Route path="/artwork/:id" element={<AdminExclusiveRoute><ArtworkDetail /></AdminExclusiveRoute>} />
                  <Route path="/artists" element={<AdminExclusiveRoute><Artists /></AdminExclusiveRoute>} />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <Admin />
                      </AdminRoute>
                    }
                  />
                  <Route path="/contact" element={<AdminExclusiveRoute><Contact /></AdminExclusiveRoute>} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <AdminExclusiveRoute>
                          <Profile />
                        </AdminExclusiveRoute>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/artist/:id" element={<AdminExclusiveRoute><ArtistProfile /></AdminExclusiveRoute>} />
                  <Route path="/journal" element={<AdminExclusiveRoute><Journal /></AdminExclusiveRoute>} />
                  <Route path="/journal/:id" element={<AdminExclusiveRoute><JournalDetail /></AdminExclusiveRoute>} />
                  <Route path="/tracking" element={<OrderTracking />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
