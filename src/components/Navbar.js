import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'


// 6LfvyMwqAAAAAJlNpZ9noGITS7-gxnMcaqho8Huc
function Navbar() {

    const [email, setEmail] = useState("")
    const [recaptcha, setRecaptcha] = useState(null)  
    return (
        <>
            <nav className="navbar navbar-dark bg-dark px-4">
                <div className="container-fluid">
                    <span className="navbar-brand">Blogs</span>
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Subscription
                    </button>
                </div>
            </nav>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Subscription form</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <input
                                    type='text'
                                    placeholder='Enter Email'
                                    value={email}
                                    className='form-control mb-3'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <ReCAPTCHA
                                    sitekey='6LfvyMwqAAAAAJlNpZ9noGITS7-gxnMcaqho8Huc'
                                    onChange={(data) => setRecaptcha(data)}
                                />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" disabled={!recaptcha} data-bs-toggle="modal" data-bs-target="#exampleModal" >Subscribe</button> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar