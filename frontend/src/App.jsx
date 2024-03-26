import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Sidebar from './components/Sidebar';
import { Dashboard, InvoiceCreation, InvoiceRendering, InvoiceValidation} from './pages';
import { useStateContext } from './contexts/ContextProvider';

import './App.css'


const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className='main-Container'>
          {activeMenu ? (
            <div className='sidebarActive'>
              <Sidebar />
            </div>
          ) : (
            <div className='sidebarUnActive'>
              <Sidebar />
            </div>
          )} 

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
      </BrowserRouter>
    </div>
  )
}

export default App