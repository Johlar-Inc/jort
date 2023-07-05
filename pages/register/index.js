
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useRouter } from 'next/router';
import Head from "next/head";
import Script from "next/script";

const Register = ({ profile, setProfile }) => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [passwordError, setPasswordError] = useState('');

    const isPasswordStrong = password => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/.test(password);
    }

    const saveProfile = e => {
        e.preventDefault();
        if (!isPasswordStrong(password)) {
            setPasswordError("Weak password. Requirements: at least 12 characters, combination of uppercase letters, lowercase letters, numbers, and symbols.");
            return;
        }
        axios({
            method: 'post',
            url: 'https://backend.jortinc.com/public/api/register',
            headers: { 'content-type': 'application/json' },
            data: {
                'email': email,
                'first_name': firstName,
                'last_name': lastName,
                'password': password,
            }
        })
        .then(result => {
            swal("Success!", "You have successfully registered. Please sign in with your new info and happy bidding!", "success");
            router.push('/');
        })
        .catch(error => {
            swal("Uh oh! Something went wrong. Please try again."),
            console.log(error)
        })
    }

    return (
        <>
            <Head>
                <title>Register - Junk or Treasures</title>
                <meta name="title" content="Register - Junk or Treasures" />
                <meta name="description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://jortinc.com/register" />
                <meta property="og:title" content="Register - Junk or Treasures" />
                <meta property="og:description" content="Junk or Treasures is auctioning leveled up. Your junk could very well be somebody else's treasure. You could also find your next valuable item here." />
                <meta property="og:image" content="https://jortinc.com/img/jort-logo.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://jortinc.com/register" />
                <meta property="twitter:title" content="Register - Junk or Treasures" />
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
                    <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                        <form onSubmit={e => saveProfile(e)}>
                        <div className="mb-3">
                                <label htmlFor="fname" className="form-label">First Name</label>
                                <input type="text" name="fname" id="fname" required className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lname" className="form-label">Last Name</label>
                                <input type="text" name="lname" id="lname" required className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" name="email" id="email" required className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" name="password" id="password" required className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                {!isPasswordStrong(password) && 
                                    <small className="form-text text-muted">
                                        Password must be at least 12 characters long with a combination of uppercase letters, lowercase letters, numbers, and symbols.
                                    </small>
                                }
                                {passwordError && <div className="text-danger">{passwordError}</div>}
                            </div>
                            <button className="btn btn-success" type="submit">Save</button><br /><br />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
