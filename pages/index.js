import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import swal from "sweetalert";
import { useRouter } from 'next/router';

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
            router.push('/bid');
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="container">
            <div className="row mx-0 justify-content-center">
                {!loggedIn ? (
                    <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
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
                ) : (
                    <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                        &nbsp;
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;