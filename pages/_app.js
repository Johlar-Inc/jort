import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrivacyAlert from '../components/PrivacyAlert';
import '../styles/owl.css';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState();

  return (
    <div className="container-fluid px-0">
      <div className="row mx-0">
        <div className="col px-0">
          <main className="main">
            <Header loggedIn={loggedIn} profile={profile} />
            <Component {...pageProps} loggedIn={loggedIn} setLoggedIn={setLoggedIn} profile={profile} setProfile={setProfile} />
            <Footer />
            <PrivacyAlert />
          </main>
        </div>
      </div>
    </div>
  )
}

export default MyApp;
