import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/owl.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CookieConsent from "react-cookie-consent";
import swal from 'sweetalert';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.js');
  }, []);

  useEffect(() => {
    const loggingIn = localStorage.getItem("loggedIn");
    if (localStorage.getItem("profile") && loggingIn == "true") {
      setProfile(JSON.parse(localStorage.getItem("profile")));
      setLoggedIn(true);
    }
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
            <CookieConsent
              location="bottom"
              buttonText="Okay"
              buttonStyle={{ backgroundColor: "darkred", color: "white" }}
              style={{ background: "red", zIndex: 9999 }}
            >
              Ahoy me matey! Ye should know that Junk or Treasures collects data such as cookies to help you find the best loot for ye treasure. Refer to argh....I mean our privacy policy for more details.
            </CookieConsent>
          </main>
        </div>
      </div>
    </div>
  )
}

export default MyApp;
