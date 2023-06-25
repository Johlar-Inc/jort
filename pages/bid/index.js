/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import ProductCard from '../../components/ProductCard';

const Bid = ({ loggedIn, profile }) => {
  const [userID, setUserID] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const prodData = await axios(
        'https://backend.jortinc.com/public/api/products'
      );

      setProducts(prodData.data.data.reverse());
    }

    fetchData();

    if (profile) setUserID(profile.id);
  }, [profile]);

  const handleTooltipClick = (item) => {
    swal(
      `Name: ${item.title}`,
      `${item.long_desc}`,
      'info'
    );
  };

  const renderBiddingPage = () => {
    return (
      <div className="container">
        <div className="row mx-0 justify-content-center">
          <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
            <h2>Welcome to the Bidding Floor</h2>
            <div className="container">
              <div className="row justify-content-center">
                {products.map((i) => (
                  <div className="col-md-4 col-sm-6 py-2" key={i.id}>
                    {i.bid_level < 5 && (
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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


