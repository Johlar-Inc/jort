import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const ProductCard = ({ i, itemBid, userID, bidEnd }) => {
    const [timer, setTimer] = useState(0);
    const [winningBidder, setWinningBidder] = useState('');
    const [bidLevel, setBidLevel] = useState('');
    const [barTimer, setBarTimer] = useState(0);
    const [barWidth, setBarWidth] = useState(0);

    useEffect(() => {
        let dateTime = new Date(i.current_timer + ' UTC');
    
        let currentDate = new Date();
    
        if (i.bids.length > 0) {
            setWinningBidder(i.bids[i.bids.length - 1].first_name);
        }

        const intervalId = setInterval(() => {
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
                    bidEnd(i.id, i.current_bid)
                }
            }
        }, 500);
        setBarWidth(Math.ceil((barTimer / 15) * 100));
        return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i.bids, timer])
    
    return (
        <div className="card px-0">
            <img src={i.medias[0].url} width="100%" className="card-img-top" alt={i.title} />
            <div className="row card-body">
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
                        <button className="btn btn-success" onClick={() => itemBid(i.id, i.increment, i.current_bid, 1)}>Bid ${i.current_bid}</button>
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