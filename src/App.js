import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ConfigurationPage from './pages/configuration/configuration.pages';
import LoginPage from './pages/login/login.pages';
import MetricsPage from './pages/metrics/metrics.pages';

import HamburgerMenu from './components/app/hamburger-menu/hamburger-menu.component';
import Header from './components/app/header/header.component';
import Footer from './components/app/footer/footer.component';

import { tokenName } from './config';

import './App.css';

function App() {
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem(tokenName));
  }, []);



  const appView = () => {
    if(token) {

      return (
        <div id="outer-container" className="App">
        <HamburgerMenu />
        <div id="page-wrap">
          <Header />
          <Routes>
              <Route index element={<MetricsPage />} />
              <Route path="/configuration" element={<ConfigurationPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
      )
      
    }

    return (
      <LoginPage /> 
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        { appView() }
      </BrowserRouter>
    </div>
  );
}

export default App;