/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from 'next/router';
import { ThreeDots } from "react-loader-spinner";

const Sell = ({ loggedIn, profile }) => {
    const router = useRouter();
    const [prodName, setProdName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [category, setCategory] = useState('');
    const [startBid, setStartBid] = useState(0);
    const [bidIncrement, setBidIncrement] = useState(0);
    const [uploadImage, setUploadImage] = useState('');
    const [itemImages, setItemImages] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    const imageUpload = e => {
        let file = e.target.files[0];
        createImage(file);
    }

    const createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            setUploadImage(e.target.result);
        }
        reader.readAsDataURL(file);
    }

    const fileUpload = e => {
        e.preventDefault();
        let imageItem = {};
        axios({
            method: 'post',
            url: 'https://backend.jortinc.com/public/api/files',
            headers: { 'content-type': 'application/json' },
            data: {
                'file_name': uploadImage
            }
        })
        .then(result => {
            imageItem = { 'url': result.data }
            swal("Success!", "Your image has been uploaded successfully! Be sure to complete your item and submit it to be auctioned.", "success"),
            setItemImages([...itemImages, imageItem])
        })
    }

    const handleProductAdd = () => {
        setShowLoader(true);
        setTimeout(() => {
            axios({
                method: 'post',
                url: 'https://backend.jortinc.com/public/api/products',
                header: { 'content-type': 'application/json' },
                data: {
                    'seller_id': profile.id,
                    'title': prodName,
                    'short_desc': shortDesc,
                    'long_desc': longDesc,
                    'category': category,
                    'current_bid': startBid,
                    'increment': bidIncrement,
                }
            })
            .then(result => {
                setTimeout(() => {
                    for (let i = 0; i < itemImages.length; i++) {
                        axios({
                            method: 'post',
                            url: 'https://backend.jortinc.com/public/api/medias',
                            header: { 'content-type': 'application/json' },
                            data: {
                                'product_id': result.data.data.id,
                                'url': itemImages[i].url
                            }
                        })
                        .then(result => {
                            swal("Success!", "Your item has been added. Redirecting you to the bidding floor now.", "success");
                            router.push('/bid');
                        })
                        .catch(error => swal("Uh oh! Something went wrong. Please try again."));
                    }
                    setShowLoader(false);
                }, 3500);
            })
            .catch(error => swal("Uh oh! Something went wrong. Please try again."));
        }, 5500)
    }

    const fetchClientSecret = () => {
        axios({
            method: "POST",
            url: "https://backend.jortinc.com/public/api/express-account",
            header: { 'content-type': 'application/json' },
            data: {
                'first_name': profile.first_name,
                'last_name': profile.last_name,
                'email': profile.email,
                'country': 'US'
            }
        })
        .then(result => {
            window.localStorage.setItem("stripeKey", result.data.express_account_info.id);
            axios({
                method: "post",
                url: `https://backend.jortinc.com/public/api/stripe-key/${profile.id}`,
                header: { 'content-type': 'application/json' },
                data: {
                    '_method': 'PATCH',
                    'stripeid': result.data.express_account_info.id,
                }
            })
            router.push(result.data.stripe_url.url);
        })
    }

    return (
        <div className="container">
            <ThreeDots 
                height="300" 
                width="500" 
                radius="9"
                color="#993300" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{ position: 'absolute', bottom: 50, left: '35%', zIndex: 999 }}
                wrapperClassName="position-absolute top-50 start-50 translate-middle"
                visible={showLoader}
            />
            <div className="row mx-0 justify-content-center">
                {loggedIn && profile.stripeid ? (
                    <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                        <h2>Sell</h2>
                        <div className="mb-3">
                            <label htmlFor="prodname" className="form-label">Product Name</label>
                            <input type="text" name="prodname" id="prodname" required className="form-control" value={prodName} onChange={e => setProdName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="shortdesc" className="form-label">Short Description</label>
                            <input type="text" name="shortdesc" id="shortdesc" required className="form-control" value={shortDesc} onChange={e => setShortDesc(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="longdesc" className="form-label">Long Description</label>
                            <textarea name="longdesc" id="longdesc" required className="form-control" value={longDesc} onChange={e => setLongDesc(e.target.value)} rows={5} />
                        </div>
                        <div className="mb-3">
                            <select defaultValue="" className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                                <option disabled value="">Please select a category</option>
                                <option value="furniture">Furniture</option>
                                <option value="clothing">Clothing</option>
                                <option value="electronics">Electronics</option>
                                <option value="automotive">Automotive</option>
                                <option value="services">Services</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startBid" className="form-label">Starting Bid (in US dollars)</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input type="text" name="startBid" id="startBid" className="form-control" required value={startBid} onChange={e => setStartBid(e.target.value)} />
                                <span className="input-group-text">.00</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bidIncrement" className="form-label">Bid Increment (in US dollars)</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input type="text" name="bidIncrement" id="bidIncrement" className="form-control" required value={bidIncrement} onChange={e => setBidIncrement(e.target.value)} />
                                <span className="input-group-text">.00</span>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row mb-3">
                                {itemImages.map(i => (
                                    <div className="col-md-2 col-sm-12" key={i.url}>
                                        <img src={i.url} width="100%" alt="Image of item" />
                                    </div>
                                ))}
                                <div className="col-md-2 col-sm-12">
                                    <form onSubmit={fileUpload}>
                                        <input type="file" onChange={imageUpload} className="form-control my-2" />
                                        <h6>Be sure to press the upload button to add the image to the product you are about to sell</h6>
                                        <button type="submit" className="btn btn-outline-success">Upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-primary" onClick={() => handleProductAdd()}>Submit</button>
                        </div>
                    </div>
                ) : (
                    <>
                        {!loggedIn && (
                            <h2>Please Login and agree to the seller terms of service to sell items on this site</h2>
                        )}
                        {!profile.stripeid && (
                            <button onClick={() => fetchClientSecret()}>Please click here to connect to Stripe</button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Sell;