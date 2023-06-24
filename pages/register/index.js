
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useRouter } from 'next/router';

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
            swal("Success!", "Your form submission was successful. You should hear back from us shortly.", "success");
            router.push('/');
        })
        .catch(error => {
            swal("Uh oh! Something went wrong. Please try again."),
            console.log(error)
        })
    }

    return (
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
    )
}

export default Register;
