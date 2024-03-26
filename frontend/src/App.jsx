import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { Navbar, Sidebar } from './components'
import { Dashboard, InvoiceCreation, InvoiceRendering, InvoiceValidation} from './pages';
import { useStateContext } from './contexts/ContextProvider';

import './App.css'


function App() {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className = 'main-container'>
          {/* Sidebar */}
          {activeMenu ? (
            <div className='sidebarActive'>
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
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* pages  */}
                <Route path="/invoiceCreation" element={<InvoiceCreation />} />
                <Route path="/invoiceValidation" element={<InvoiceValidation />} />
                <Route path="/invoiceRendering" element={<InvoiceRendering />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App