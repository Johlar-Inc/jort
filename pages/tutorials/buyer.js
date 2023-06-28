import Head from "next/head";
import Script from "next/script";

const BuyerTutorial = () => {
    return (
        <>
            <Head>
                <title>Buyer Tutorial - Junk or Treasures</title>
                <meta name="title" content="Buyer Tutorial - Junk or Treasures" />
                <meta name="description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://jortinc.com/tutorial/buyer" />
                <meta property="og:title" content="Buyer Tutorial - Junk or Treasures" />
                <meta property="og:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
                <meta property="og:image" content="https://jortinc.com/img/jort-logo.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://jortinc.com/tutorial/buyer" />
                <meta property="twitter:title" content="Buyer Tutorial - Junk or Treasures" />
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
            <div className="container-fluid px-0">
                <div className="row mx-0">
                    <div className="col-12 px-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="display-2">Buyer Tutorial</h2>
                                    <h4>Webster Defines &ldquo;Auction&rdquo; as:</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 px-0">
                        <blockquote className="blockquote">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <p>&ldquo;A sale to the highest bidder&rdquo;</p>
                                    </div>
                                </div>
                            </div>
                        </blockquote>
                    </div>
                    <div className="col-12 px-0">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <p>Now with that said a basic tutorial on how JORTinc.com works is it is very simple, You have a main page and you choose whether you&rsquo;re a buyer or seller.</p>
                                    <ol>
                                        <li>Buyer you are directed immediately to the sell page where there is a list of items complete with pictures that are up for sell, some are used and some are services.</li>
                                        <li>What is good about this site is it is geographically motivated you choose how far from your local zip code you want to search for goods or services to bid on. It can be local or long distance this gives advantages especially for larger items to be placed to sell as well as local business to be able to offer their services.</li>
                                        <li>We have 4 different types of sells, the first is the standard auction, then we have what is called Junk sale, and the third is Booty sell, No it&rsquo;s not selling your butt. And then there are services.</li>
                                        <li>One on One Auction, each seller posts a item or items on the site for sell. Now there is a 6 hour window in which there are pre-bids and then you will receive a email anytime someone else bids on the same item that way you have the option to come back in and increase your bid, or you can wait for the timer to count down and then you can come in and have a bidding war, their will be a countdown and each item will have a going once, twice and sold. Now if there is nobody else that is bidding on any item or service once it goes live then the highest pre-bid wins. This is the same regardless of which type of Auction.</li>
                                        <li>Services Auction, This is for anybody in the service industry regardless of what it is can place part of their service up for Auction and you bid on this and the highest bids win, types of services can be, salon, carpenter, electrician, plumbers, dentist, doctors, and others you get the idea, this is basically for small business promotions in the local communities.</li>
                                        <li>Junk sell, now this is just a phrase we are definitely not selling junk, we do not encourage trashy looking stuff on the site although we do allow used items we require them to be displayed in a clean and workable condition, what a Junk sell Is when a seller can place up to 9 items on the site as well as a short video detailing the items. Now each item will have a individual bid, this of course will be on the 6 hour window, however it will go live 2 min apart as it&rsquo;s 9 items we don&rsquo;t want all 9 items going live at the same time, this allows you as the buyer to bid on each item.</li>
                                        <li>Booty sell, this is similar to a all in one sell, this is when a seller places all 9 items up for sell as well as a short video however there is only one price, one bid gets all 9 items kinda like a estate sell highest bid wins all 9 items.</li>
                                        <li>Once you win the bid you will be then directed to a sign up page, this is when you put your shipping address in where you want to receive your items you won as well as your credit card information, you may have to put a different billing address in, you will have that option just in case you feel generous and you want to buy me something and have my address as a shipping address, JK this way you can store several shipping addresses in case you want to have them sent to another person. Just make sure you pick the correct one.Also your cc information will be stored for future use, you will only see the sign up page one time, although when you have the winning bid you will be directed to authorize your payment as well as make sure the shipping information is correct, you will choose your default shipping address, the billing address will always remain the same unless you choose to change that on your profile page.</li>
                                        <li>Now throughout the site from time to time their will be secret items up for sell that will have a auto win on this item, and you bid on it you automatically win the item so keep your eye out for these. You will not know until you bid.</li>
                                    </ol>
                                    <p>I hope this information was helpful and if you have any questions please feel free to reach out to us via e-mail and we will definitely reach back to you as soon as we possibly can. You can send us a message through our contact us form.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyerTutorial;