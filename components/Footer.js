import Link from "next/link";

const Footer = () => {
    return (
        <div className="footer container-fluid px-0 py-2 bg-light fixed-bottom border-top border-white">
            <div className="row px-3">
                <div className="col">
                    <p className="text-white">
                        <Link href="/bid" className="text-white">Items</Link>&nbsp;&nbsp;
                        <Link href="/sell" className="text-white">Seller</Link>&nbsp;&nbsp;
                        <Link href="/privacy" className="text-white">Privacy</Link>&nbsp;&nbsp;
                        <Link href="/terms" className="text-white">Terms of Service</Link>&nbsp;&nbsp;
                        <Link href="/tutorials/seller" className="text-white">Seller Tutorial</Link>&nbsp;&nbsp;
                        <Link href="/tutorials/buyer" className="text-white">Buyer Tutorial</Link>&nbsp;&nbsp;
                        <Link href="/tutorials/commission" className="text-white">Commission</Link>&nbsp;&nbsp;
                        | &copy; {(new Date().getFullYear())} Junk or Treasure Inc. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;