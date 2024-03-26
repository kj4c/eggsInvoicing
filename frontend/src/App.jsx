import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { Navbar, Sidebar } from './components'
import { Dashboard, InvoiceCreation, InvoiceRendering, InvoiceValidation, InvoiceSending} from './pages';
import { useStateContext } from './contexts/ContextProvider';

import './App.css'


const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className='main-Container'>
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
          <div className={activeMenu ? 'isActiveMenu ' : 'unActiveMenu'}>
            <div className='navbar'>
              <Navbar />
            </div>
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
              <Route path="/invoiceSending" element={<InvoiceSending/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App