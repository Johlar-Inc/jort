import { useState } from 'react';

const PrivacyAlert = () => {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(true);

    const onDismiss = () => {
        setVisible(false);
        setCount(count + 1);
    }

    return (
        <div>
            {count === 0 && visible ? (
                <div className="alert alert-success fixed-bottom row" role="alert">
                    <div className="col-10 offset-1">
                        <h4 className="alert-heading">Your Privacy Is Important To Us</h4>
                        <p>This website uses cookies to enhance the user experience. Please see our privacy policy for more details.</p>
                    </div>
                    <div className="col-1">
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => onDismiss()}></button>
                    </div>
                </div>
            ) : (
                <div>&nbsp;</div>
            )}
        </div>
    )
}

export default PrivacyAlert;
