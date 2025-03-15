import { Footer } from '../../shared/Footer/Footer'
import { Header } from '../../shared/Header/Header'
import "./Authorisation.css"


export function AuthorisationPage(){
    return(
        <div className = 'AuthorizationPage'>
            <Header></Header>
            <div className="wrapper">
                <form method='POST'>
                <h2>Login</h2>
                    <div className="input-field">
                    <input type="text" required/>
                    <label>Enter your email</label>
                </div>
                <div className="input-field">
                    <input type="password" required/>
                    <label>Enter your password</label>
                </div>
                <button type="submit">Log In</button>
                <div className="register">
                    <p>Don't have an account? <a id='Register' href="/reg">  Register</a></p>
                </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}