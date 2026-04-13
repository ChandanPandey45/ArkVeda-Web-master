import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import ServicesPage from './pages/ServicesPage';
import TechnologyPage from './pages/TechnologyPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import QuotePage from './pages/QuotePage';
import FAQPage from './pages/FAQPage';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
