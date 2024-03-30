import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
// No need to import React with the latest React version unless you're using class components or React. useState, etc. explicitly
<<<<<<< HEAD
import { Navbar, Sidebar, UserProfile } from './components'
import { Dashboard, InvoiceCreation, InvoiceReceiving, InvoiceRendering, InvoiceValidation, InvoiceSending, InvoiceInput } from './pages';
=======
import { Navbar, Sidebar } from './components'
import { Dashboard, InvoiceCreation, InvoiceRendering, InvoiceValidation, InvoiceSending, InvoiceInput, InvoiceRendered } from './pages';
>>>>>>> 1f4899c921b6699298631dcce0931d888750a968
import { useStateContext } from './contexts/ContextProvider';
import AuthLogin from './pages/authLogin';
import AuthRegister from './pages/authRegister';
import InvoiceInputJSON from './pages/invoiceInputJson';
import NotFoundPage from './pages/NotFoundPage';
import ForgetPassword from './pages/forgetPassword';
import UserProfile from './components/UserProfile';

import './App.css'

const AppContent = () => {
  const { activeMenu } = useStateContext();
  const location = useLocation();

<<<<<<< HEAD
  // Paths where the sidebar should not be shown
  const hideSidebarPaths = ['/login', '/register'];
  
  // Check if the current path is one of the paths where the sidebar should be hidden
  const showSidebar = !hideSidebarPaths.includes(location.pathname);
=======
  const knownPaths = [
    '/', '/dashboard', '/invoiceCreation', '/invoiceValidation',
    '/invoiceRendering', '/invoiceRendered', '/invoiceSending', '/invoiceInput',
    '/login', '/register', '/invoiceInputJson', '/profile'
  ];

  const hideSidebarPaths = ['/login', '/register', 'reset-password'];
>>>>>>> 1f4899c921b6699298631dcce0931d888750a968

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
            <Route path="/invoiceRendered" element={<InvoiceRendered />} />
            <Route path="/invoiceSending" element={<InvoiceSending />} />
            <Route path="/invoiceInput" element={<InvoiceInput />} />
            <Route path="/invoiceReceiving" element={<InvoiceReceiving />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
<<<<<<< HEAD
=======
            <Route path="/invoiceInputJson" element={<InvoiceInputJSON />} />
            <Route path="/reset-password" element={<ForgetPassword />} />
            <Route path="*" element={<NotFoundPage />} />

>>>>>>> 1f4899c921b6699298631dcce0931d888750a968
            <Route path="/profile" element={<UserProfile />} />
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
