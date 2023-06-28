/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import swal from "sweetalert";
import { useRouter } from 'next/router';
import Head from "next/head";
import Script from "next/script";

const Home = ({ loggedIn, setLoggedIn, setProfile }) => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://backend.jortinc.com/public/api/login',
            headers: { 'content-type': 'application/json' },
            data: {
                'email': email,
                'password': password
            }
        })
        .then(result => {
            setLoggedIn(true);
            setProfile(result.data.user);
            swal("Success!", "Logging you in now...", "success");
            setTimeout(() => {
                localStorage.setItem("loggedIn", true);
                localStorage.setItem("profile", JSON.stringify(result.data.user));
                router.push('/bid');
            }, 1500);
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <>
            <Head>
                <title>Junk or Treasures - Auctioning Leveled Up</title>
                <meta name="title" content="Junk or Treasures - Auctioning Leveled Up" />
                <meta name="description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://jortinc.com/" />
                <meta property="og:title" content="Junk or Treasures - Auctioning Leveled Up" />
                <meta property="og:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
                <meta property="og:image" content="https://jortinc.com/img/jort-logo.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://jortinc.com/" />
                <meta property="twitter:title" content="Junk or Treasures - Auctioning Leveled Up" />
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
                <div className="row mx-0 justify-content-center">
                    {!loggedIn ? (
                        <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                            <div className="container">
                                <div className="row">
                                    <div className="col-4">
                                        <img src="https://jortinc.com/img/jort-logo.png" width="85%" alt="Junk or Treasures logo" />
                                    </div>
                                    <div className="col-8">
                                        <form onSubmit={e => logIn(e)}>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Address</label>
                                                <input type="email" name="email" id="email" required className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" name="password" id="password" required className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <button className="btn btn-success" type="submit">Log In</button><br /><br />
                                            <Link href="/register">Don&rsquo;t have an account? Create one</Link>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                            &nbsp;
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;