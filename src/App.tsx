import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './HomePage';
import ServicesPage from './pages/ServicesPage';
import TechnologyPage from './pages/TechnologyPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import QuotePage from './pages/QuotePage';
import FAQPage from './pages/FAQPage';
import PDFPreviewPage from './pages/PDFPreviewPage';
import Navbar from './components/Navbar';
import Breadcrumb from './components/Breadcrumb';
import './App.css';

function AppLayout() {
  const location = useLocation();
  const hideChrome = location.pathname === '/pdf-preview';

  return (
    <>
      {!hideChrome && <Navbar />}
      {!hideChrome && <Breadcrumb />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="admin/pdf-preview" element={<PDFPreviewPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
