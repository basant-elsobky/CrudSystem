'use client'
import Link from 'next/link'
import './navbar.css'
import { useContext, useEffect } from 'react'
import { userContext } from '@/app/Context/usercontext'
import supabase from '@/app/Config/supabaseclient'
import { useRouter } from 'next/navigation';
function Navbar() {
    const router = useRouter()
    const { user, setUser } = useContext(userContext);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
    }
    const logginout = async () => {

        let { error } = await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <nav className="navbar navbar-expand-lg p-3">
            <div className="container-fluid">
                <img src='/images/logo.png' />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">


                            <div class="sec-center">
                                <input class="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                                {user && user.email ? (
                                    <>
                                        <label class="for-dropdown" for="dropdown">Hello {user.email} <i class="uil uil-arrow-down"></i></label>
                                        <div class="section-dropdown">
                                            <a onClick={logginout} href="#">Logout<i class="uil uil-arrow-right"></i></a>
                                        </div>
                                    </>
                                ) : ''}
                            </div>                                </li>

                    </ul>


                </div>
            </div>

        </nav>


    )
}

export default Navbar
