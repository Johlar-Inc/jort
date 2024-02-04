/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import ProductCard from '../../components/ProductCard';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from "next/router";

const Bid = ({ loggedIn, profile }) => {
  const [userID, setUserID] = useState();
  const [products, setProducts] = useState([]);
  const r = useRouter();

  useEffect(() => {
    async function fetchData() {
      const prodData = await axios(
        'https://backend.jortinc.com/public/api/products'
      );

      setProducts(prodData.data.data.reverse());
    }

    fetchData();

    if (profile) setUserID(profile.id);
  }, [products, profile]);

  useEffect(() => {
    if (r.query?.successPay) {
      async function notifySeller() {
        await axios(
          `https://backend.jortinc.com/public/api/winners/items/${r.query?.paidItem}`
        );
      }

      notifySeller();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTooltipClick = (item) => {
    swal(
      `Name: ${item.title}`,
      `${item.long_desc}`,
      'info'
    );
  };

  const filteredProducts = products.filter((product) => product.bid_level < 5)

  const renderBiddingPage = () => {
    return (
      <>
        <Head>
            <title>Bidding Floor - Junk or Treasures</title>
            <meta name="title" content="Bidding Floor - Junk or Treasures" />
            <meta name="description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
            <meta name="robots" content="all" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://jortinc.com/bid" />
            <meta property="og:title" content="Bidding Floor - Junk or Treasures" />
            <meta property="og:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
            <meta property="og:image" content="https://jortinc.com/img/jort-logo.png" />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://jortinc.com/bid" />
            <meta property="twitter:title" content="Bidding Floor - Junk or Treasures" />
            <meta property="twitter:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
            <meta property="twitter:image" content="https://jortinc.com/img/jort-logo.png" />
            <link rel="icon" href="favicon.ico" />
            <link rel="manifest" href="manifest.json" />
        </Head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-HFH3XL7FNY"/>
        <Script
            id='google-analytics'
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-HFH3XL7FNY', {
                page_path: window.location.pathname,
                });
            `,
            }}
        />
        <div className="container">
          <div className="row mx-0 justify-content-center">
            <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded bg-white">
              <h2>Welcome to the Bidding Floor</h2>
              <div className="container">
                <div className="row justify-content-center">
                  {filteredProducts.map((i) => (
                    <div className="col-md-4 col-sm-6 py-2" key={i.id}>
                      <div className="position-relative">
                        <ProductCard
                          i={i}
                          userID={userID}
                          profile={profile}
                        />
                        <button
                          className="position-absolute top-0 start-0 translate-middle btn btn-primary btn-sm"
                          style={{ zIndex: 1 }}
                          onClick={() => handleTooltipClick(i)}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Click for more information"
                        >
                          More Info
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderLoginMessage = () => {
    return <h2>Please log in to access the Item page.</h2>;
  };

  return (
    <div>
      {loggedIn && profile ? renderBiddingPage() : renderLoginMessage()}
    </div>
  );
};

export default Bid;


