/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useState } from "react";

const Bid = ({ loggedIn, profile }) => {
    const [userID, setUserID] = useState(profile.id);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const bidData = await axios(
                'https://backend.jortinc.com/public/api/products'
            );

            setProducts(bidData.data.data.reverse());
        }

        fetchData();
    }, [products]);

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
                                        <div className="card px-0">
                                            <img src={i.medias[0].url} width="100%" className="card-img-top" alt={i.title} />
                                            <div className="card-body">
                                                <h4 className="card-title">{i.title}</h4>
                                                <p>{i.short_desc}</p>
                                            </div>
                                        </div>
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