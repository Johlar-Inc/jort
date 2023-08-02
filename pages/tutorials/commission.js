import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

const CommissionTutorial = () => {
    return (
        <>
            <Head>
                <title>Commission Tutorial - Junk or Treasures</title>
                <meta name="title" content="Commission Tutorial - Junk or Treasures" />
                <meta name="description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://jortinc.com/tutorials/commission" />
                <meta property="og:title" content="Commission Tutorial - Junk or Treasures" />
                <meta property="og:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
                <meta property="og:image" content="https://jortinc.com/img/jort-logo.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://jortinc.com/tutorials/commission" />
                <meta property="twitter:title" content="Commission Tutorial - Junk or Treasures" />
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
            <div className="container mb-3 pb-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="display-2">Commission Base for JORTinc.com</h2>
                        <p>The following is the commission base for JORTinc.com this may change with a min of a 30 day written notice to all users that is selling items or using their service to post on the website. Also we will provide a 30 day notice to the e-commerce venue that is used. These numbers are tentative and may change in the first 6 months after the site is up and operational.</p>
                        <p>John Throneberry, CEO, JORTinc</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">3%-$1.00 to $20.00</li>
                            <li className="list-group-item">4%-$20.01 to $40.00</li>
                            <li className="list-group-item">5%-$40.01 to $70.00</li>
                            <li className="list-group-item">6%=$70.01 to $100.00</li>
                            <li className="list-group-item">7%-$100.01 to $150.00</li>
                            <li className="list-group-item">8%-$150.01 to $300.00</li>
                            <li className="list-group-item">9%-$300.01 to $1000.00</li>
                            <li className="list-group-item">10%-$1000.01 and up</li>
                        </ul>
                        <p>We are going to max out at 10% commission so anything above $1000.00 is going to be charged the 10% commission fee. I think that is fair for all parties to be considered. Now as mentioned in the terms this will be part of the terms as well. The commission will be taken out before any bank and shipping fees are taken out. However, Stripe also takes a small percentage out for their processing fee. Please see the Stripe terms of service located on our <Link href="/terms">Terms of Service</Link> page.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommissionTutorial;