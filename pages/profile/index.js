import axios from "axios";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";

const User = ({ loggedIn, profile }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [shippingAdds, setShippingAdds] = useState([]);
    const [billingAdds, setBillingAdds] = useState([]);
    const [showing, setShowing] = useState(false);
    const [street1, setStreet1] = useState('');
    const [street2, setStreet2] = useState('');
    const [city, setCity] = useState('');
    const [customerState, setCustomerState] = useState('');
    const [zip, setZip] = useState('');
    const [newOrOld, setNewOrOld] = useState(0);
    const [type, setType] = useState('');
    const [oldId, setOldId] = useState();

    useEffect(() => {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setEmail(profile.email);

        async function fetchShipping() {
            const shippingData = await axios(
                `https://backend.jortinc.com/public/api/shipping-addresses/${profile.id}`
            );

            setShippingAdds(shippingData.data.data);
        }

        async function fetchBilling() {
            const billingData = await axios(
                `https://backend.jortinc.com/public/api/billing-addresses/${profile.id}`
            );

            setBillingAdds(billingData.data.data);
        }

        fetchShipping();
        fetchBilling();
    }, [profile, shippingAdds, billingAdds]);

    const handleClose = () => {
        setShowing(false);
    }

    const newAddressModal = (addType) => {
        setType(addType);
        setShowing(true);
    }

    const updateAddressModal = (addType, id, street_1, street_2, custCity, custState, custZip) => {
        setType(addType);
        setShowing(true);
        setStreet1(street_1);
        setStreet2(street_2);
        setCity(custCity);
        setCustomerState(custState);
        setZip(custZip);
        setNewOrOld(1);
        setOldId(id);
    }

    const modalSaveFunction = () => {
        if (newOrOld === 1) {
            updateAddress();
        } else {
            addNewAddress();
        }
    }

    const addNewAddress = () => {
        let newAddUrl = "";
        if (type === 'Shipping') {
            newAddUrl = "https://backend.jortinc.com/public/api/shipping-addresses"
        } else if (type === 'Billing') {
            newAddUrl = "https://backend.jortinc.com/public/api/billing-addresses"
        }
        axios({
            method: 'post',
            url: newAddUrl,
            headers: { 'content-type': 'application/json' },
            data: {
                'user_id': profile.id,
                'street_1': street1,
                'street_2': street2,
                'city': city,
                'state': customerState,
                'postal_code': zip,
                'is_primary': 0
            }
        })
        .then(result => {
            swal("Success!", "Your new address has been added! We'll be sure to update our records!", "success"),
            setStreet1(''),
            setStreet2(''),
            setCity(''),
            setCustomerState(''),
            setZip(''),
            setShowing(false)
        })
        .catch(error => {
            swal("Uh oh! Something went wrong. Please try again.")
        })
    }

    const updateAddress = () => {
        let updateUrl = "";
        if (type === 'Shipping') {
            updateUrl = `https://backend.jortinc.com/public/api/shipping-addresses/address/${oldId}`
        } else if (type === 'Billing') {
            updateUrl = `https://backend.jortinc.com/public/api/billing-addresses/address/${oldId}`
        }
        axios({
            method: 'post',
            url: updateUrl,
            headers: { 'content-type': 'application/json' },
            data: {
                '_method': 'patch',
                'street_1': street1,
                'street_2': street2,
                'city': city,
                'state': customerState,
                'postal_code': zip,
                'is_primary': 0
            }
        })
        .then(result => {
            swal("Success!", "Your address has been updated! We'll be sure to update our records!", "success"),
            setStreet1(''),
            setStreet2(''),
            setCity(''),
            setCustomerState(''),
            setZip(''),
            setShowing(false),
            setOldId(),
            setNewOrOld(0)
        })
        .catch(error => {
            swal("Uh oh! Something went wrong. Please try again.")
        })
    }

    const clearAll = () => {
        setStreet1('');
        setStreet2('');
        setCity('');
        setCustomerState('');
        setZip('');
        setShowing(false);
    }

    const deleteAddress = (id, delType) => {
        let deleteUrl = "";
        if (delType === 'Shipping') {
            deleteUrl = `https://backend.jortinc.com/public/api/shipping-addresses/address/${id}`
        } else if (delType === 'Billing') {
            deleteUrl = `https://backend.jortinc.com/public/api/billing-addresses/address/${id}`
        }
        swal({
            title: "Are you sure?",
            text: "Once you've deleted this address, it cannot be undone!",
            icon: "warning",
            dangerMode: true,
        })
        .then(willDelete => {
            if (willDelete) {
                axios({
                    method: 'delete',
                    url: deleteUrl
                })
                .then(result => swal('Success!', 'Address deleted', 'success'))
                .catch(error => swal('Uh oh. Something went wrong. Try again.'));
            }
        })
    }

    return (
        <>
            <Head>
                <title>Profile - Junk or Treasures</title>
                <meta name="title" content="Profile - Junk or Treasures" />
                <meta name="description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://jortinc.com/profile" />
                <meta property="og:title" content="Profile - Junk or Treasures" />
                <meta property="og:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
                <meta property="og:image" content="https://jortinc.com/img/jort-logo.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://jortinc.com/profile" />
                <meta property="twitter:title" content="Profile - Junk or Treasures" />
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
                <div className="row mx-0 justify-content-center">
                    {loggedIn ? (
                        <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                            <h3 className="display-5">{firstName}&nbsp;{lastName}</h3>
                            <h5>{email}</h5>
                            {shippingAdds && (
                                <div className="container my-3 py-1">
                                    <h4>Shipping Address</h4>
                                    {shippingAdds.map(i => (
                                        <div className="row border-top py-2" key={i.id}>
                                            <div className="col-8">
                                                <h5>
                                                    {i.street_1}
                                                </h5>
                                                {i.street_2 && (
                                                    <h5>
                                                        {i.street_2}
                                                    </h5>
                                                )}
                                                <h5>
                                                    {i.city}, {i.state}&nbsp;&nbsp;{i.postal_code}
                                                </h5>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-outline-success" onClick={() => updateAddressModal('Shipping', i.id, i.street_1, i.street_2, i.city, i.state, i.postal_code)}>Update</button>
                                                <button className="btn btn-outline-danger" onClick={() => deleteAddress(i.id, 'Shipping')}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button className="btn btn-success" onClick={() => newAddressModal('Shipping')}>Add Shipping Address</button>
                            {billingAdds && (
                                <div className="container my-3 py-1">
                                    <h4>Billing Address</h4>
                                    {billingAdds.map(i => (
                                        <div className="row border-top py-2" key={i.id}>
                                            <div className="col-8">
                                                <h5>
                                                    {i.street_1}
                                                </h5>
                                                {i.street_2 && (
                                                    <h5>
                                                        {i.street_2}
                                                    </h5>
                                                )}
                                                <h5>
                                                    {i.city}, {i.state}&nbsp;&nbsp;{i.postal_code}
                                                </h5>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-outline-success" onClick={() => updateAddressModal('Billing', i.id, i.street_1, i.street_2, i.city, i.state, i.postal_code, i.is_primary)}>Update</button>
                                                <button className="btn btn-outline-danger" onClick={() => deleteAddress(i.id, 'Billing')}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button className="btn btn-success" onClick={() => newAddressModal('Billing')}>Add Billing Address</button>
                        </div>
                    ) : (
                        <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                            &nbsp;
                        </div>
                    )}
                </div>
                <Modal show={showing} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New {type} Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="street1" className="form-label">Street Line 1</label>
                            <input type="text" name="street1" id="street1" required className="form-control" value={street1} onChange={e => setStreet1(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="street2" className="form-label">Street Line 2</label>
                            <input type="text" name="street2" id="street2" className="form-control" value={street2} onChange={e => setStreet2(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" name="city" id="city" required className="form-control" value={city} onChange={e => setCity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>State</label>
                            <select class="form-select" defaultValue={customerState} onChange={e => setCustomerState(e.target.value)}>
                                <option value="">Select a State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AS">American Samoa</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="UM-81">Baker Island</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="GU">Guam</option>
                                <option value="HI">Hawaii</option>
                                <option value="UM-84">Howland Island</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="UM-86">Jarvis Island</option>
                                <option value="UM-67">Johnston Atoll</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="UM-89">Kingman Reef</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="UM-71">Midway Atoll</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="UM-76">Navassa Island</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="MP">Northern Mariana Islands</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="UM-95">Palmyra Atoll</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UM">United States Minor Outlying Islands</option>
                                <option value="VI">United States Virgin Islands</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="UM-79">Wake Island</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="zip" className="form-label">Zip/Postal Code</label>
                            <input type="text" name="zip" id="zip" required className="form-control" value={zip} onChange={e => setZip(e.target.value)} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={() => clearAll()}>Cancel</button>
                        <button className="btn btn-success" onClick={() => modalSaveFunction()}>Save Changes</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default User;