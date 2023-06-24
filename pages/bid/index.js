/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import ProductCard from "../../components/ProductCard";

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

        setUserID(profile.id);
    }, [products, profile]);

    return (
        <div className="container">
            <div className="row mx-0 justify-content-center">
                {loggedIn ? (
                    <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                        <h2>Welcome to the Bidding Floor</h2>
                        <div className="container">
                            <div className="row justify-content-center">
                                {products.map(i => (
                                    <div className="col-md-4 col-sm-6 py-2" key={i.id}>
                                        {i.bid_level < 5 && (
                                            <ProductCard i={i} userID={userID} profile={profile} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <h2>Please Login to start bidding</h2>
                )}
            </div>
        </div>
    )
}

export default Bid;