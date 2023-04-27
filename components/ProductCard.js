import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const ProductCard = ({ i, itemBid, userID, levelUp }) => {
    const [timer, setTimer] = useState(0);
    const [bidLevel, setBidLevel] = useState(i.bid_level);
    const [winningBidder] = useState(i.bids[i.bids.length - 1].first_name);

    useEffect(() => {
        let dateTime = new Date(i.current_timer + ' UTC');
    
        let currentDate = new Date();
    

        setInterval(() => {
            if (dateTime > currentDate) {
                setTimer((dateTime - currentDate) / 1000);
            }
        }, 1000);


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timer])
    
    return (
        <div className="card px-0">
            <img src={i.medias[0].url} width="100%" className="card-img-top" alt={i.title} />
            <div className="row card-body">
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
                    <h3>{winningBidder} is winning!</h3>
                    {timer > 0 && <h3>{timer}</h3>}
                </div>
            </div>
        </div>
    )
}

export default ProductCard;