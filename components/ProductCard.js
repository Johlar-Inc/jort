import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const ProductCard = ({ i, itemBid, userID }) => {
    const [preHours, setPreHours] = useState(0);
    const [preMins, setPreMins] = useState(0);
    const [preSecs, setPreSecs] = useState(0);
    const [timer, setTimer] = useState(0);
    const [winningBidder, setWinningBidder] = useState('');
    const [bidLevel, setBidLevel] = useState('');
    const [barTimer, setBarTimer] = useState(0);
    const [barWidth, setBarWidth] = useState(0);

    useEffect(() => {
        let dateTime = new Date(i.current_timer + ' UTC');

        let sixHourTimer = new Date(i.pre_timer + ' UTC');
    
        let currentDate = new Date();
    
        if (i.bids.length > 0) {
            setWinningBidder(i.bids[i.bids.length - 1].first_name);
        }

        const intervalId = setInterval(() => {
            if (sixHourTimer > currentDate) {
                let preTimer = Math.abs(sixHourTimer - currentDate) / 1000;
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
                if (dateTime > currentDate) {
                    setTimer(Math.ceil((dateTime - currentDate) / 1000));
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
                } else if (timer === 0) {
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
                        })
                        .catch(error => console.log(error.data));
                    }
                }
            }
        }, 500);
        if (barTimer) {
            setBarWidth(Math.ceil((barTimer / 15) * 100));
        }
        return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i.bids, timer, preHours, preMins, preSecs])
    
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
                        <button className="btn btn-success" onClick={() => itemBid(i.id, i.increment, i.current_bid)}>Bid ${i.current_bid}</button>
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