import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import React from 'react'
import { Navbar, Sidebar } from './components'
import { Dashboard, InvoiceCreation, InvoiceRendering, InvoiceValidation, InvoiceSending, InvoiceInput} from './pages';
import { useStateContext } from './contexts/ContextProvider';

import './App.css'


function App() {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <BrowserRouter>
        <div className='main-container'>
          {/* SideBar */}
          {activeMenu ? (
            <div className='sidebar sidebarActive'>
              <Sidebar />
            </div>
          ) : (
            <div className='sidebarUnActive'>
              <Sidebar />
            </div>
          )}

          {/* Navbar */}
          <div className={activeMenu ? 'activeMenu md-ml-72' : 'unActiveMenu' }>
            <div className='navbar md-static'>
              <Navbar />
            </div>

            {/* Routes */}
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path='/' element={(<Dashboard />)} />
                <Route path='/dashboard' element={(<Dashboard />)} />

                {/* pages  */}
                <Route path="/invoiceCreation" element={<InvoiceCreation />} />
                <Route path="/invoiceValidation" element={<InvoiceValidation />} />
                <Route path="/invoiceRendering" element={<InvoiceRendering />} />
                <Route path="/invoiceSending" element={<InvoiceSending/>}/>
                <Route path="/invoiceInput" element={<InvoiceInput/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App