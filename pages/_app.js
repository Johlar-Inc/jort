import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/owl.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col">
          <main className="main">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default MyApp;
