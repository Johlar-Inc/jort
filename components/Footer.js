import Link from "next/link";

const Footer = () => {
    return (
        <div className="container-fluid px-0 py-2 bg-light sticky-bottom border-top border-primary">
            <div className="row">
                <div className="col">
                    <p>
                        <Link href="/">Home</Link>&nbsp;&nbsp;
                        <Link href="/">Items</Link>&nbsp;&nbsp;
                        <Link href="/">Seller</Link>&nbsp;&nbsp;
                        <Link href="/">Privacy</Link>&nbsp;&nbsp;
                        <Link href="/">Terms of Service</Link>&nbsp;&nbsp;
                        <Link href="/">Seller Tutorial</Link>&nbsp;&nbsp;
                        <Link href="/">Buyer Tutorial</Link>&nbsp;&nbsp;
                        <Link href="/">Commission</Link>&nbsp;&nbsp;
                        | &copy; {(new Date().getFullYear())} Junk or Treasure Inc. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;