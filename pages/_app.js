import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/owl.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col">
          <main className="main">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </div>
  )
}

export default MyApp
