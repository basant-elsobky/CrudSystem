import Link from 'next/link'
import './Login.css'

function Page() {
  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <a className="mb-5 d-block auth-logo" href="index.html">
                  <img alt="" className="logo logo-dark" height="22" src="assets/images/logo-dark.png" />
                  <img alt="" className="logo logo-light" height="22" src="assets/images/logo-light.png" />
                </a>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center top mt-2">
                    <p>
                      Sign in
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <form action="index.html">
                      <div className="mb-3">
                        <label className="form-label" for="username">
                          Email
                        </label>
                        <input className="form-control" id="username" placeholder="Enter Your Email" type="text" />
                      </div>
                      <div className="mb-3">

                        <label className="form-label" for="userpassword">
                          Password
                        </label>
                        <input className="form-control" id="userpassword" placeholder="Enter Your password" type="password" />
                      </div>

                      <div className="mt-3 w-100">
                        <button className="loginbtn  w-100" type="submit">
                          submit
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="or" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <hr style={{ flex: 1 }} />
                          <span style={{ margin: '0 10px' }}>OR</span>
                          <hr style={{ flex: 1 }} />
                        </div>


                        <p className="mb-0">
                          Don't have an account ?
                          <Link className="fw-medium text-primary" href="/Signup">
                            Signup now
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </>
  )
}

export default Page
