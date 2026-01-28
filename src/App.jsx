import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
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
import Footer from './components/layout/Footer';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<FullGallery />} />
                <Route path="/artwork/:id" element={<ArtworkDetail />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/artist/:id" element={<ArtistProfile />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/journal/:id" element={<JournalDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
