import Head from "next/head";
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
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="display-2">Commission Base for JORTinc.com</h2>
                        <p>The following is the commission base for JORTinc.com this may change with a min of a 30 day written notice to all users that is selling items or using their service to post on the website. Also we will provide a 30 day notice to the e-commerce venue that is used. These numbers are tentative and may change in the first 6 months after the site is up and operational.</p>
                        <p>John Throneberry, CEO, JORTinc</p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">3%-$1.00 to $15 = .03-.45</li>
                            <li className="list-group-item">4%-$15.01 to $25.00 = .64 -$1.00</li>
                            <li className="list-group-item">5%-$25.01 to $50.00 = $1.35-$2.50</li>
                            <li className="list-group-item">6%=$50.01 to $75.00 = $3.06-$4.50</li>
                            <li className="list-group-item">7%-$75.01 to $100.00 = $5.32-$7.00</li>
                            <li className="list-group-item">8%-$100.01 to $150.00 = $8.08-$12.00</li>
                            <li className="list-group-item">9%-$150.01 to $200.00 = $13.59-$18.00</li>
                            <li className="list-group-item">10%-$200.01 to $250.00 = $20.10-$25.00</li>
                            <li className="list-group-item">11%-$250.01 to $350.00 = $27.61-$38.50</li>
                            <li className="list-group-item">12%-$350.01 to $450.00 = $42.12-$54.00</li>
                            <li className="list-group-item">13%-$450.01 to $550.00 = $58.63-$71.50</li>
                            <li className="list-group-item">14%-$550.01 to $700.00 = $77.14-$98.00</li>
                            <li className="list-group-item">15%-$700.01 to $850.00 = $105.15-$127.50</li>
                            <li className="list-group-item">16%-$850.01 to $1000.00 = $136.16-$160.00</li>
                            <li className="list-group-item">17%-$1000.01 to $1500.00 = $170.17-$212.50</li>
                            <li className="list-group-item">18%-$1500.01 to $2000.00 = $225.18-$360.00</li>
                            <li className="list-group-item">19%-$2000.01 to $2500.00 = $380.19-$475.00</li>
                            <li className="list-group-item">20%-$2500 and up = $500.00 and up.</li>
                        </ul>
                        <p>We are going to max out at 20% commission so anything above $2500.00 is going to be charged the 20% commission fee. I think that is fair for all parties to be considered. Now as mentioned in the terms this will be part of the terms as well. The commission will be taken out before any bank and shipping fees are taken out.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommissionTutorial;