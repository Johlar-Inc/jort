import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrivacyAlert from '../components/PrivacyAlert';
import '../styles/owl.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.js');
  }, [])

  return (
    <div className="container-fluid px-0">
      <div className="row mx-0">
        <div className="col px-0">
          <main className="main">
            <Header loggedIn={loggedIn} profile={profile} />
            <Component {...pageProps} loggedIn={loggedIn} setLoggedIn={setLoggedIn} profile={profile} setProfile={setProfile} />
            <div className="container">
              <div className="row">
                <div className="col mb-3 pb-3">
                  &nbsp;
                </div>
              </div>
            </div>
            <Footer />
            <PrivacyAlert />
          </main>
        </div>
      </div>
    </div>
  )
}

export default MyApp;
