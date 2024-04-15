import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// No need to import React with the latest React version unless you're using class components or React. useState, etc. explicitly

import { Navbar, Sidebar, UserProfile } from './components';
import {
  Dashboard,
  InvoiceCreation,
  InvoiceRendering,
  InvoiceValidation,
  ValidationReport,
  InvoiceSending,
  InvoiceInput,
  InvoiceRendered,
  InvoiceReceiving,
  HtmlRendering,
  InvoiceCreationUploadDocument,
  InvoiceInputMultiple,
  InvoiceInputMultipleJson,
  InvoicesSent,
  Team,
  TeamCreate,
} from './pages';
import TeamJoin from './pages/TeamJoin';
import { useStateContext } from './contexts/ContextProvider';
import AuthLogin from './pages/authLogin';
import AuthRegister from './pages/authRegister';
import InvoiceInputJSON from './pages/invoiceInputJson';
import NotFoundPage from './pages/NotFoundPage';
import ForgetPassword from './pages/forgetPassword';
import './App.css';
import SendEmailLater from './pages/sendEmailLater';
import LandingPage from './pages/LandingPage';

const AppContent = () => {
  const { activeMenu } = useStateContext();
  const location = useLocation();

  const knownPaths = [
    '/',
    '/dashboard',
    '/invoiceCreation',
    '/invoiceValidation',
    '/validationReport',
    '/invoiceRendering',
    '/invoiceRendered',
    '/invoiceSending',
    '/invoiceInput',
    '/login',
    '/register',
    '/invoiceInputJson',
    '/profile',
    '/invoiceReceiving',
    '/invoiceInputMultiple',
    '/invoiceInputMultipleJson',
    '/invoiceInputMultipleJson1',
    'htmlRendering',
    '/invoiceCreation/uploadDocument',
    '/sendEmailLater',
    '/invoicesSent',
    '/team',
    '/teamcreate',
    '/team/join',
    '/team/info',
  ];

  const hideSidebarPaths = ['/login', '/register', 'reset-password'];

  const showSidebar =
    knownPaths.includes(location.pathname) &&
    !hideSidebarPaths.includes(location.pathname);
  return (
    <div className='main-container'>
      {showSidebar && (
        <div
          className={activeMenu ? 'sidebar sidebarActive' : 'sidebarUnActive'}
        >
          <Navbar />
          <Sidebar />
        </div>
      )}

      <div
        className={
          activeMenu && showSidebar ? 'activeMenu md-ml-72' : 'unActiveMenu'
        }
      >
        <div>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/landingPage' element={<LandingPage />} />
            <Route path='/invoiceCreation' element={<InvoiceCreation />} />
            <Route
              path='/invoiceCreation/uploadDocument'
              element={<InvoiceCreationUploadDocument />}
            />
            <Route path='/invoiceValidation' element={<InvoiceValidation />} />
            <Route path='/validationReport' element={<ValidationReport />} />
            <Route path='/invoiceRendering' element={<InvoiceRendering />} />
            <Route path='/invoiceRendered' element={<InvoiceRendered />} />
            <Route path='/invoiceSending' element={<InvoiceSending />} />
            <Route path='/invoiceInput' element={<InvoiceInput />} />
            <Route
              path='/invoiceInputMultiple'
              element={<InvoiceInputMultiple />}
            />
            <Route
              path='/invoiceInputMultipleJson'
              element={<InvoiceInputMultipleJson />}
            />
            <Route
              path='/invoiceInputMultipleJson1'
              element={<InvoiceInputMultipleJson />}
            />
            <Route path='/invoiceReceiving' element={<InvoiceReceiving />} />
            <Route path='/login' element={<AuthLogin />} />
            <Route path='/register' element={<AuthRegister />} />
            <Route path='/login' element={<AuthLogin />} />
            <Route path='/register' element={<AuthRegister />} />
            <Route path='/invoiceInputJson' element={<InvoiceInputJSON />} />
            <Route path='/reset-password' element={<ForgetPassword />} />
            <Route path='/htmlRendering' element={<HtmlRendering />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/sendEmailLater' element={<SendEmailLater />}></Route>
            <Route path='/invoicesSent' element={<InvoicesSent />}></Route>
            <Route path='/team' element={<Team />}></Route>
            <Route path='/team/info' element={<Team />}></Route>
            <Route path='/teamcreate' element={<TeamCreate />}></Route>
            <Route path='/team/join' element={<TeamJoin />}></Route>
            <Route path='/profile' element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
