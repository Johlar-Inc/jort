import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const User = ({ profile, setProfile }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setEmail(profile.email);
    })

    const saveProfile = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://backend.jortinc.com/public/api/login',
            headers: { 'content-type': 'application/json' },
            data: {
                'email': email,
                'first_name': firstName,
                'last_name': lastName,
            }
        })
        .then(result => {
            swal("Success!", "Your form submission was successful. You should hear back from us shortly.", "success")
        })
        .catch(error => swal("Uh oh! Something went wrong. Please try again."))
    }

    return (
        <div className="container">
            <div className="row mx-0 justify-content-center">
                {loggedIn ? (
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
                            </div>
                            <button className="btn btn-success" type="submit">Save</button><br /><br />
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

export default User;