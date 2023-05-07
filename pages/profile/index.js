import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const User = ({ loggedIn, profile, setProfile }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setEmail(profile.email);
    }, [profile])

    return (
        <div className="container">
            <div className="row mx-0 justify-content-center">
                {loggedIn ? (
                    <div className="col-12 mx-5 my-5 px-5 py-5 border border-5 shadow rounded">
                        <form onSubmit={e => saveProfile(e)}>
                            <div className="mb-3">
                                <label htmlFor="fname" className="form-label">First Name</label>
                                <input type="text" name="fname" id="fname" required className="form-control" value={firstName} disabled onChange={e => setFirstName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lname" className="form-label">Last Name</label>
                                <input type="text" name="lname" id="lname" required className="form-control" value={lastName} disabled onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" name="email" id="email" required className="form-control" value={email} disabled onChange={e => setEmail(e.target.value)} />
                            </div>
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