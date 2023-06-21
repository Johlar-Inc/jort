import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/owl.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CookieConsent from "react-cookie-consent";
import Cookies from "js-cookie";
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
    if (!profile) {
      setLoggedIn(false);
      const cookieProfile = Cookies.get("profilekey");
      if (cookieProfile) {
        axios({
          method: 'get',
          url: 'https://backend.jortinc.com/public/api/user',
          headers: { 'content-type': 'application/json' },
          data: {
            'token': cookieProfile
          }
        })
        .then(result => {
          setLoggedIn(true);
          setProfile(result.data);
          router.push('/bid');
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const stripeCookie = Cookies.get("stripekey");
    if (profile && (profile.stripeid !== null && !stripeCookie)) {
      axios({
        method: 'post',
        url: `https://backend.jortinc.com/public/api/stripe-key/${profile.id}`,
        headers: { 'content-type': 'application/json' },
        data: {
          '_method': 'PATCH',
          'stripeid': null
        }
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => { console.log(error) })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    axios({
      method: 'post',
      url: `https://backend.jortinc.com/public/api/stripe-key/${profile.id}`,
      headers: { 'content-type': 'application/json' },
      data: {
        '_method': 'PATCH',
        'stripeid': null
      }
    })
    .then(result => {
      Cookies.remove("profilekey");
      Cookies.remove("stripekey");
      console.log(result, Cookies.get("profilekey"));
      // swal('Successfully logged out');
      // setProfile(null);
      // setLoggedIn(false);
      // router.push('/');
    })
    .catch(error => { swal('Error logging out. Please try again.') })
  }

  const setStripeSession = stripeKey => {
    axios({
      method: 'post',
      url: `https://backend.jortinc.com/public/api/stripe-key/${profile.id}`,
      headers: { 'content-type': 'application/json' },
      data: {
        '_method': 'PATCH',
        'stripeid': stripeKey
      }
    })
    .then(result => {
      console.log(result);
      swal('Stripe successfully added');
      Cookies.set("stripekey", stripeKey, { expires: 1 });
      router.push('/sell');
    })
    .catch(error => { swal('Error logging out. Please try again.') })
  }

  return (
    <div className="container-fluid px-0">
      <div className="row mx-0">
        <div className="col px-0">
          <main className="main">
            <Header loggedIn={loggedIn} profile={profile} />
            <Component {...pageProps} loggedIn={loggedIn} setLoggedIn={setLoggedIn} profile={profile} setProfile={setProfile} logout={logout} setStripeSession={setStripeSession} />
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
