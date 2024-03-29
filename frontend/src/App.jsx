import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
// No need to import React with the latest React version unless you're using class components or React. useState, etc. explicitly
import { Navbar, Sidebar } from './components'
import { Dashboard, InvoiceCreation, InvoiceRendering, InvoiceValidation, InvoiceSending, InvoiceInput } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import AuthLogin from './pages/authLogin';
import AuthRegister from './pages/authRegister';
import InvoiceInputJSON from './pages/invoiceInputJson';
import NotFoundPage from './pages/NotFoundPage';
import ForgetPassword from './pages/forgetPassword';

import './App.css'

const AppContent = () => {
  const { activeMenu } = useStateContext();
  const location = useLocation();

  const knownPaths = [
    '/', '/dashboard', '/invoiceCreation', '/invoiceValidation',
    '/invoiceRendering', '/invoiceSending', '/invoiceInput',
    '/login', '/register', '/invoiceInputJson'
  ];

  const hideSidebarPaths = ['/login', '/register', 'reset-password'];

  const showSidebar = knownPaths.includes(location.pathname) && !hideSidebarPaths.includes(location.pathname);

  return (
    <div className='main-container'>
      {showSidebar && (
        <div className={activeMenu ? 'sidebar sidebarActive' : 'sidebarUnActive'}>
          <Navbar />
          <Sidebar />
        </div>
      )}

      <div className={activeMenu && showSidebar ? 'activeMenu md-ml-72' : 'unActiveMenu'}>
        <div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/invoiceCreation" element={<InvoiceCreation />} />
            <Route path="/invoiceValidation" element={<InvoiceValidation />} />
            <Route path="/invoiceRendering" element={<InvoiceRendering />} />
            <Route path="/invoiceSending" element={<InvoiceSending />} />
            <Route path="/invoiceInput" element={<InvoiceInput />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/invoiceInputJson" element={<InvoiceInputJSON />} />
            <Route path="/reset-password" element={<ForgetPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
