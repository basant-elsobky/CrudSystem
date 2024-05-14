'use client'
import Link from 'next/link'
import './Login.css'
import { useContext, useState } from 'react';
import supabase from '@/app/Config/supabaseclient';
import { userContext } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setcheck] = useState('');
  const {setUser} = useContext(userContext)
  const router = useRouter()
  const getUser = async () => {
    const { data:{ user }} = await supabase.auth.getUser()
    sessionStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }
  const handleSignIn = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      let errorMessage = 'User not found. Please check your email or create an account.';
  
     
        errorMessage = 'User not found. Please check your email or create an account.';
      
  
      setcheck(
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      );
    } else if (data) {
      await getUser();
      router.push('/Home');
    }
  };
  
  
  return (
    <>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
         
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
                    <form onSubmit={handleSignIn}>
                      <div className="mb-3">
                        <label className="form-label" for="username">
                          Email
                        </label>
                        <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-control" id="username" 
                        placeholder="Enter Your Email" 
                        type="text" 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
                      </div>
                      <div className="mb-3">

                        <label className="form-label" for="userpassword">
                          Password
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} 
                        className="form-control" 
                        id="userpassword" 
                        placeholder="Enter Your password" type="password" 
                       
                        />
                        
                      </div>
                      {check}
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
