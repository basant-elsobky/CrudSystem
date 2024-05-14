'use client'
import Link from 'next/link'
import './signup.css'
import { useState } from 'react'
import supabase from '@/app/Config/supabaseclient'


import { useRouter } from 'next/navigation';
function page() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [check, setcheck] = useState('');


    const handleSignup = async (e) => {
        e.preventDefault();
        let { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        setEmail('');
        setPassword('');
        setcheck(<>
            <div class="alert alert-success" role="alert">
                {error ? error.message : "Here is a gentle confirmation that your account was successful created."}
            </div>
        </>)
        setTimeout(() => {

            router.push('/')
        }, 2000);


    };
    return (
        <>
            <div className="account-pages my-5 pt-sm-5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="text-center top  mt-2">
                                        <h5>
                                            Signup
                                        </h5>

                                    </div>
                                    <div className="p-2 mt-4">
                                        <form onSubmit={handleSignup} >

                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="username">
                                                    Email
                                                </label>
                                                <input onChange={(e) => setEmail(e.target.value)}
                                                    className="form-control"
                                                    id="username"
                                                    placeholder="Enter Your email"
                                                    type="email"
                                                    title="Please enter a valid email address"
                                                    required
                                                    value={email}
                                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"

                                                />
                                                <span class="error mt-1">Invalid Format</span>

                                            </div>

                                            <div className="mb-4 mt-3">
                                                <label className="form-label mt-3" for="userpassword">
                                                    Password
                                                </label>
                                                <input
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                    className="form-control mb-4" id="userpassword"
                                                    placeholder="Enter Your password"
                                                    type="password"
                                                    minLength="8"
                                                />
                                                {password.length > 0 && password.length < 8 && (
                                                    <span className="validation-message text-danger">Password must be at least 8 characters</span>
                                                )}
                                                {check}
                                            </div>
                                            <div className="mt-3 w-100">
                                                <button className="Signupbtn  w-100" type="submit">
                                                    Register
                                                </button>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <div className="or" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <hr style={{ flex: 1 }} />
                                                    <span style={{ margin: '0 10px' }}>OR</span>
                                                    <hr style={{ flex: 1 }} />
                                                </div>



                                                <p className="mb-0">
                                                    Already have an account ?
                                                    <Link className="fw-medium text-primary" href="/Login">
                                                        Login
                                                    </Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div >

            </div >
        </>
    )
}

export default page
