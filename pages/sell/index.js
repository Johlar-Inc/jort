/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from 'next/router';
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";

const Sell = ({ loggedIn, profile, setProfile }) => {
    const router = useRouter();
    const [prodName, setProdName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');
    const [category, setCategory] = useState('');
    const [startBid, setStartBid] = useState(0);
    const [bidIncrement, setBidIncrement] = useState(0);
    const [salesTax, setSalesTax] = useState(0);
    const [shippingState, setShippingState] = useState('');
    const [limit, setLimit] = useState(0);
    const [shipping, setShipping] = useState(0.0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [tosCheck, setTosCheck] = useState(false);
    const [uploadImage, setUploadImage] = useState('');
    const [itemImages, setItemImages] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        if (profile) {
            if (profile.stripeid) {
                axios({
                    method: 'post',
                    url: 'https://backend.jortinc.com/public/api/retrieve-stripe',
                    data: {
                        'stripekey': profile.stripeid
                    }
                })
                .then(result => {
                    console.log(result);
                })
                .catch(error => console.log(error.data));
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (tosCheck && prodName && startBid && bidIncrement && shortDesc && shipping && shippingState) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [tosCheck, prodName, startBid, bidIncrement, shortDesc, shipping, shippingState]);

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
        setIsDisabled(true);
        switch (shippingState) {
            case 'AL':
            case 'GA':
            case 'NY':
            case 'WY':
                setSalesTax(4.00);
                break;
            case 'AZ':
                setSalesTax(5.60);
                break;
            case 'AK':
            case 'KS':
            case 'WA':
                setSalesTax(6.50);
                break;
            case 'CA':
                setSalesTax(7.25);
                break;
            case 'CO':
                setSalesTax(2.90);
                break;
            case 'CT':
                setSalesTax(6.35);
                break;
            case 'DC':
            case 'FL':
            case 'ID':
            case 'IA':
            case 'KY':
            case 'MD':
            case 'MI':
            case 'PA':
            case 'SC':
            case 'VT':
            case 'WV':
                setSalesTax(6.00);
                break;
            case 'IL':
            case 'MA':
            case 'TX':
                setSalesTax(6.25);
                break;
            case 'IN':
            case 'MS':
            case 'RI':
            case 'TN':
                setSalesTax(7.00);
                break;
            case 'LA':
                setSalesTax(4.45);
                break;
            case 'ME':
            case 'NE':
                setSalesTax(5.50);
                break;
            case 'MN':
                setSalesTax(6.88);
                break;
            case 'MO':
                setSalesTax(4.23);
                break;
            case 'NV':
                setSalesTax(6.85);
                break;
            case 'NJ':
                setSalesTax(6.63);
                break;
            case 'NM':
            case 'ND':
            case 'WI':
                setSalesTax(5.00);
                break;
            case 'NC':
                setSalesTax(4.75);
                break;
            case 'OH':
                setSalesTax(5.75);
                break;
            case 'OK':
            case 'SD':
                setSalesTax(4.50);
                break;
            case 'UT':
                setSalesTax(6.10);
                break;
            case 'VA':
                setSalesTax(5.30);
                break;
            default:
                setSalesTax(0)
                break;
        }
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
                    'new_bid': startBid,
                    'bid_limit': limit,
                    'item_shipping': shipping,
                    'sales_tax': salesTax,
                    'stripeid': profile.stripeid,
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
            axios({
                method: "post",
                url: `https://backend.jortinc.com/public/api/stripe-key/${profile.id}`,
                header: { 'content-type': 'application/json' },
                data: {
                    '_method': 'PATCH',
                    'stripeid': result.data.express_account_info.id,
                }
            })
            .then(result => {
                setProfile(result.data);
                setTimeout(() => {
                    localStorage.setItem("profile", JSON.stringify(result.data));
                    swal('Connecting you to Stripe now');
                }, 1500);
            })
            setTimeout(() => {
                router.push(result.data.stripe_url.url);
            }, 3000);
        })
    }

    return (
        <>
            <Head>
                <title>Sell - Junk or Treasures</title>
                <meta name="title" content="Sell - Junk or Treasures" />
                <meta name="description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://jortinc.com/sell" />
                <meta property="og:title" content="Sell - Junk or Treasures" />
                <meta property="og:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
                <meta property="og:image" content="https://jortinc.com/img/jort-logo.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://jortinc.com/sell" />
                <meta property="twitter:title" content="Sell - Junk or Treasures" />
                <meta property="twitter:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
                <meta property="twitter:image" content="https://jortinc.com/img/jort-logo.png" />
                <link rel="icon" href="favicon.ico" />
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
                    {loggedIn ? (
                        <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                            {profile.stripeid ? (
                                <>
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
                                    <div className="mb-3">
                                        <label htmlFor="bidLimit" className="form-label">Bid Limit (in US dollars)</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input type="text" name="bidLimit" id="bidLimit" className="form-control" required value={limit} onChange={e => setLimit(e.target.value)} />
                                            <span className="input-group-text">.00</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="shipping" className="form-label">Amount Needed for Shipping (in US dollars)</label>
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input type="number" name="shipping" id="shipping" className="form-control" required value={shipping} onChange={e => setShipping(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="state" className="form-label">From Which State Will This Item Be Sold? (Select a state; at this time JORT only supports shipping from the continental 48 United States)</label>
                                        <select className="form-select form-select-lg" value={shippingState} onChange={e => setShippingState(e.target.value)}>
                                            <option value="AL">Alabama</option>
                                            <option value="AZ">Arizona</option>
                                            <option value="AR">Arkansas</option>
                                            <option value="CA">California</option>
                                            <option value="CO">Colorado</option>
                                            <option value="CT">Connecticut</option>
                                            <option value="DE">Delaware</option>
                                            <option value="DC">District of Columbia</option>
                                            <option value="FL">Florida</option>
                                            <option value="GA">Georgia</option>
                                            <option value="ID">Idaho</option>
                                            <option value="IL">Illinois</option>
                                            <option value="IN">Indiana</option>
                                            <option value="IA">Iowa</option>
                                            <option value="KS">Kansas</option>
                                            <option value="KY">Kentucky</option>
                                            <option value="LA">Louisiana</option>
                                            <option value="ME">Maine</option>
                                            <option value="MD">Maryland</option>
                                            <option value="MA">Massachusetts</option>
                                            <option value="MI">Michigan</option>
                                            <option value="MN">Minnesota</option>
                                            <option value="MS">Mississippi</option>
                                            <option value="MO">Missouri</option>
                                            <option value="MT">Montana</option>
                                            <option value="NE">Nebraska</option>
                                            <option value="NV">Nevada</option>
                                            <option value="NH">New Hampshire</option>
                                            <option value="NJ">New Jersey</option>
                                            <option value="NM">New Mexico</option>
                                            <option value="NY">New York</option>
                                            <option value="NC">North Carolina</option>
                                            <option value="ND">North Dakota</option>
                                            <option value="OH">Ohio</option>
                                            <option value="OK">Oklahoma</option>
                                            <option value="OR">Oregon</option>
                                            <option value="PA">Pennsylvania</option>
                                            <option value="RI">Rhode Island</option>
                                            <option value="SC">South Carolina</option>
                                            <option value="SD">South Dakota</option>
                                            <option value="TN">Tennessee</option>
                                            <option value="TX">Texas</option>
                                            <option value="UT">Utah</option>
                                            <option value="VT">Vermont</option>
                                            <option value="VA">Virginia</option>
                                            <option value="WA">Washington</option>
                                            <option value="WV">West Virginia</option>
                                            <option value="WI">Wisconsin</option>
                                            <option value="WY">Wyoming</option>
                                        </select>
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
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="tosconfirm" value={tosCheck} onChange={e => setTosCheck(e.target.checked)} />
                                        <label className="form-check-label" htmlFor="tosconfirm">
                                            By checking this box, you agree to the JORT Seller&rsquo;s <Link href="/terms">Terms of Service</Link>.
                                        </label>
                                    </div>
                                    <div className="mb-3">
                                        <button type="button" className="btn btn-primary" disabled={isDisabled} onClick={() => handleProductAdd()}>Submit</button>
                                    </div>
                                </>
                            ) : (
                                <button onClick={() => fetchClientSecret()}>Please click here to connect to Stripe</button>
                            )}
                        </div>
                    ) : (
                        <h2>Please Login and agree to the seller terms of service to sell items on this site</h2>
                    )}
                </div>
            </div>
        </>
    )
}

export default Sell;