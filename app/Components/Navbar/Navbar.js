import Link from 'next/link'
import './navbar.css'
function Navbar() {
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
                                <label class="for-dropdown" for="dropdown">Hello User <i class="uil uil-arrow-down"></i></label>
                                <div class="section-dropdown">
                                    <Link href="/Login">Login <i class="uil uil-arrow-right"></i></Link>
                                    <Link href="/Signup">Signup <i class="uil uil-arrow-right"></i></Link>
                                    <a href="#">Logout<i class="uil uil-arrow-right"></i></a>

                                </div>
                            </div>                                </li>

                    </ul>
  

                </div>
            </div>
          
        </nav>


    )
}

export default Navbar
