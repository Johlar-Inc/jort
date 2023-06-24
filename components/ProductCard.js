/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { StripePublicId } from "./StripeId";

const ProductCard = ({ i, userID, profile }) => {
    const stripePromise = loadStripe(StripePublicId);
    const [preHours, setPreHours] = useState(0);
    const [preMins, setPreMins] = useState(0);
    const [preSecs, setPreSecs] = useState(0);
    const [timer, setTimer] = useState(0);
    const [winningBidder, setWinningBidder] = useState('');
    const [bidLevel, setBidLevel] = useState('');
    const [barTimer, setBarTimer] = useState(0);
    const [barWidth, setBarWidth] = useState(0);
    const [stripeId, setStripeId] = useState();
    const [countdown, setCountdown] = useState();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sixHourWindow, setSixHourWindow] = useState(new Date(i.pre_timer + ' UTC'));

    useEffect(() => {
        if (i.current_timer && currentTime > sixHourWindow) {
            setCountdown(i.current_timer);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i.current_timer, currentTime]);

    useEffect(() => {
        if (preHours === 0 && (preMins < 20 && preMins > 0)) {
            if (i.bids.length > 0) {
                const distinct = (value, index, self) => {
                    return self.indexOf(value) === index;
                }
                const bidEmails = i.bids.filter(distinct);
                for (let b = 0; b < bidEmails.length; b++) {
                    axios({
                        method: 'post',
                        url: 'https://backend.jortinc.com/public/api/products/bid_email',
                        headers: { 'content-type': 'application/json' },
                        data: {
                            'first_name': bidEmails[b].first_name,
                            'email': bidEmails[b].email,
                            'title': i.title
                        }
                    })
                    .then(result => {
                        console.log('Email successfully sent to ' + bidEmails[b].email);
                    })
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (i.bids.length > 0) {
            setWinningBidder(i.bids[i.bids.length - 1].first_name);
        } else {
            setWinningBidder('');
        }

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
            if (sixHourWindow > currentTime) {
                let preTimer = Math.abs(sixHourWindow - currentTime) / 1000;
                let seconds = Math.ceil(preTimer) % 60;
                let minutes = Math.ceil(preTimer / 60) % 60;
                if (seconds < 10) {
                    setPreSecs("0" + seconds);
                } else {
                    setPreSecs(seconds);
                }
                if (seconds === 0) {
                    if (minutes < 10) {
                        setPreMins(("0" + minutes) + 1);
                    } else {
                        setPreMins(minutes + 1);
                    }
                } else {
                    if (minutes < 10) {
                        setPreMins("0" + minutes);
                    } else {
                        setPreMins(minutes);
                    }
                }
                setPreHours(Math.floor(preTimer / 3600));
            } else {
                if (countdown && countdown > currentTime) {
                    setTimer(Math.ceil((countdown - currentTime) / 1000));
                }
                if (timer >= 45 && timer < 60) {
                    setBidLevel('primary');
                    setBarTimer(timer - 45);
                } else if (timer >= 30 && timer < 45) {
                    setBidLevel('success');
                    setBarTimer(timer - 30);
                } else if (timer >= 15 && timer < 30) {
                    setBidLevel('warning');
                    setBarTimer(timer - 15);
                } else if (timer > 0 && timer < 15) {
                    setBidLevel('danger');
                    setBarTimer(timer);
                } else if (timer <= 0) {
                    if (i.bids.length > 0) {
                        if (userID === i.bids[i.bids.length - 1].user_id) {
                            createCheckOutSession()
                        }
                    }
                }
            }
        }, 500);
        if (barTimer) {
            setBarWidth(Math.ceil((barTimer / 15) * 100));
        }
        return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i.bids, timer, preHours, preMins, preSecs, countdown, currentTime]);

    const itemBid = () => {
        axios({
            method: 'post',
            url: `https://backend.jortinc.com/public/api/products/${i.id}`,
            headers: { 'content-type': 'application/json' },
            data: {
                '_method': 'PATCH',
                'current_bid': i.new_bid,
                'new_bid': i.new_bid + i.increment,
                'bid_level': 0,
            }
        })
        .then(result => {
            setCountdown(new Date(result.data.current_timer));
            axios({
                method: 'post',
                url: 'https://backend.jortinc.com/public/api/bids',
                headers: { 'content-type': 'application/json' },
                data: {
                    'user_id': userID,
                    'product_id': i.id,
                    'bid_amount': i.new_bid,
                    'first_name': profile.first_name,
                    'email': profile.email
                }
            })
            .then(result => {
                swal("Success!", "Your bid was placed successfully!", "success")
            })
            .catch(error => console.log(error.data))
        })
    }

    const createCheckOutSession = async () => {
        let jortsCut;
        if (i.current_bid <= 15) {
            jortsCut = parseFloat(i.current_bid * 0.03).toFixed(2);
        } else if (i.current_bid > 15 && i.current_bid <= 25) {
            jortsCut = parseFloat(i.current_bid * 0.04).toFixed(2);
        } else if (i.current_bid > 25 && i.current_bid <= 50) {
            jortsCut = parseFloat(i.current_bid * 0.05).toFixed(2);
        } else if (i.current_bid > 50 && i.current_bid <= 75) {
            jortsCut = parseFloat(i.current_bid * 0.06).toFixed(2);
        } else if (i.current_bid > 75 && i.current_bid <= 100) {
            jortsCut = parseFloat(i.current_bid * 0.07).toFixed(2);
        } else if (i.current_bid > 100 && i.current_bid <= 150) {
            jortsCut = parseFloat(i.current_bid * 0.08).toFixed(2);
        } else if (i.current_bid > 150 && i.current_bid <= 200) {
            jortsCut = parseFloat(i.current_bid * 0.09).toFixed(2);
        } else if (i.current_bid > 200 && i.current_bid <= 250) {
            jortsCut = parseFloat(i.current_bid * 0.10).toFixed(2);
        } else if (i.current_bid > 250 && i.current_bid <= 350) {
            jortsCut = parseFloat(i.current_bid * 0.11).toFixed(2);
        } else if (i.current_bid > 350 && i.current_bid <= 450) {
            jortsCut = parseFloat(i.current_bid * 0.12).toFixed(2);
        } else if (i.current_bid > 450 && i.current_bid <= 550) {
            jortsCut = parseFloat(i.current_bid * 0.13).toFixed(2);
        } else if (i.current_bid > 550 && i.current_bid <= 700) {
            jortsCut = parseFloat(i.current_bid * 0.14).toFixed(2);
        } else if (i.current_bid > 700 && i.current_bid <= 850) {
            jortsCut = parseFloat(i.current_bid * 0.15).toFixed(2);
        } else if (i.current_bid > 850 && i.current_bid <= 1000) {
            jortsCut = parseFloat(i.current_bid * 0.16).toFixed(2);
        } else if (i.current_bid > 1000 && i.current_bid <= 1500) {
            jortsCut = parseFloat(i.current_bid * 0.17).toFixed(2);
        } else if (i.current_bid > 1500 && i.current_bid <= 2000) {
            jortsCut = parseFloat(i.current_bid * 0.18).toFixed(2);
        } else if (i.current_bid > 2000 && i.current_bid <= 2500) {
            jortsCut = parseFloat(i.current_bid * 0.19).toFixed(2);
        } else {
            jortsCut = parseFloat(i.current_bid * 0.20).toFixed(2);
        }
        axios({
            method: "GET",
            url: `https://backend.jortinc.com/public/api/users/${i.seller_id}`
        })
        .then(result => {
            setStripeId(result.data.data.stripeid)
        })
        const stripe = await stripePromise;
        let mediaImage;
        if (i.medias.length > 0) {
            mediaImage = i.medias[0].url
        } else {
            mediaImage = 'https://jortinc.com/img/jort-logo.png'
        }
        const checkoutSession = await axios.post('https://backend.jortinc.com/public/api/create-stripe-session', {
            item: {
                picture: mediaImage,
                price: Math.ceil(i.current_bid * 100),
                title: 'JORTinc - ' + i.title,
            },
            application_fee: Math.ceil(jortsCut * 100),
            stripe_id: stripeId,
        });
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });
        if (result.error) {
          alert(result.error.message);
        } else {
            setBidLevel('');
            setBarTimer(0);
            if (i.bids.length > 0) {
                axios({
                    method: 'post',
                    url: `https://backend.jortinc.com/public/api/products/${i.id}`,
                    headers: { 'content-type': 'application/json' },
                    data: {
                        '_method': 'PATCH',
                        'current_bid': i.current_bid,
                        'bid_level': 5
                    }
                })
                .then(result => {
                    console.log(result.data)
                    axios({
                        method: 'post',
                        url: 'https://backend.jortinc.com/public/api/winners',
                        headers: { 'content-type': 'application/json' },
                        data: {
                            'product_id': i.id,
                            'user_id': i.bids[i.bids.length - 1].user_id,
                            'payment_status': 'pending'
                        }
                    })
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(error => console.log(error.data))
                })
                .catch(error => console.log(error.data));
            }
        }
    };
    
    return (
        <div className="card px-0">
            {i.medias.length > 0 && (
                <div className="position-relative">
                    <img src={i.medias[0].url} width="100%" className="card-img-top" alt={i.title} />
                </div>
            )}
            <div className="row card-body">
                {(preSecs > 0 || preMins > 0 || preHours > 0) && (
                    <div className="col-12">
                        <h6>This item will be ready for full auction soon<br /><br />
                        In the meantime please bid so that you may reserve your place when item is ready for auction in {preHours}:{preMins}:{preSecs}</h6>
                    </div>
                )}
                {timer > 0 && (
                    <div className="col-12">
                        <div className="progress" role="progressbar" aria-label="Item is Being Bidded On" aria-valuenow={barTimer} aria-valuemin="0" aria-valuemax="15">
                            <div className={`progress-bar progress-bar-striped progress-bar-animated bg-${bidLevel}`} style={{ width: `${barWidth}%` }}></div>
                        </div>
                    </div>
                )}
                <div className="col-6">
                    <h4 className="card-title">{i.title}</h4>
                    <p>{i.short_desc}</p>
                    {i.seller_id === userID ? (
                        <h6>You are not allowed to bid on your own item</h6>
                    ) : (
                        <button className="btn btn-success" onClick={() => itemBid()}>Bid ${i.new_bid}</button>
                    )}
                </div>
                <div className="col-6">
                    {winningBidder !== '' && (
                        <h4>{winningBidder} is winning!</h4>
                    )}
                    {bidLevel === 'success' ? (
                        <h4 className="text-success">Going once!</h4>
                    ) : bidLevel === 'warning' ? (
                        <h4 className="text-warning">Going twice!</h4>
                    ) : bidLevel === "danger" && (
                        <h4 className="text-danger">Going thrice!</h4>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard;