import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ConfigurationPage from './pages/configuration/configuration.pages';
import LoginPage from './pages/login/login.pages';
import MessagePage from './pages/message/message.pages';
import MessagesPage from './pages/messages/messages.pages';
import MetricsPage from './pages/metrics/metrics.pages';
import PasswordResetPage from './pages/password-reset/password-reset.pages';
import ReelPage from './pages/reel/reel.pages';
import ReelsPage from './pages/reels/reels.pages';
import TestimonialPage from './pages/testimonial/testimonial.pages';
import TestimonialsPage from './pages/testimonials/testimonials.pages';
import UpdatePasswordPage from './pages/update-password/update-password.pages';

import Footer from './components/app/footer/footer.component';
import HamburgerMenu from './components/app/hamburger-menu/hamburger-menu.component';
import Header from './components/app/header/header.component';
import Spinner from './components/reusable/spinner/spinner.component';

import { tokenName } from './config';

import './App.css';

function App() {
  const [ loading, setLoading ] = useState(true);
  const [ token, setToken ] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem(tokenName));
    setLoading(false);
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
                <Route path='/messages' element={<MessagesPage />} />
                <Route path='/messages/:id' element={<MessagePage />} />
                <Route path='/reels' element={<ReelsPage />} />
                <Route path='/reels/:id' element={<ReelPage />} />
                <Route path='/testimonials' element={<TestimonialsPage />} />
                <Route path='/testimonials/:id' element={<TestimonialPage />} />
                <Route path='/configuration' element={<ConfigurationPage />} />
                <Route path='/configuration/update-password' element={<UpdatePasswordPage />} />
            </Routes>
            <Footer />
          </div>
        </div>
      )
    }
    
    return (
      <div>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path='/password-reset/*' element={<PasswordResetPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        {loading ?
          <Spinner />
        :
          appView()
        }
      </BrowserRouter>
    </div>
  );
}

export default App;