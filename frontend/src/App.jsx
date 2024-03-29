import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
// No need to import React with the latest React version unless you're using class components or React. useState, etc. explicitly
import { Navbar, Sidebar } from './components'
import { Dashboard, InvoiceCreation, InvoiceRendering, InvoiceValidation, InvoiceSending, InvoiceInput, InvoiceReceiving} from './pages';
import { useStateContext } from './contexts/ContextProvider';
import AuthLogin from './pages/authLogin';
import AuthRegister from './pages/authRegister';

import './App.css'

const AppContent = () => {
  const { activeMenu } = useStateContext();
  const location = useLocation(); // Getting the current path

  // Paths where the sidebar should not be shown
  const hideSidebarPaths = ['/login', '/register'];
  
  // Check if the current path is one of the paths where the sidebar should be hidden
  const showSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <div className='main-container'>
      {/* Conditionally render Sidebar based on the path */}
      {showSidebar && (
        <div className={activeMenu ? 'sidebar sidebarActive' : 'sidebarUnActive'}>
          <Navbar />
          <Sidebar />
        </div>
      )}

      {/* Navbar */}
      <div className={activeMenu && showSidebar ? 'activeMenu md-ml-72' : 'unActiveMenu' }>
      
        {/* Routes */}
        <div>
          <Routes>
            {/* dashboard */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />

            {/* pages */}
            <Route path="/invoiceCreation" element={<InvoiceCreation />} />
            <Route path="/invoiceValidation" element={<InvoiceValidation />} />
            <Route path="/invoiceRendering" element={<InvoiceRendering />} />
            <Route path="/invoiceSending" element={<InvoiceSending />} />
            <Route path="/invoiceInput" element={<InvoiceInput />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />} />
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
