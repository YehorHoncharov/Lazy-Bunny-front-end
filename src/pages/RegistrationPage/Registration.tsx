import { Footer } from '../../shared/Footer/Footer'
import { Header } from '../../shared/Header/Header'
import "./Registration.css"


export function RegistrationPage(){
    return(
        <div className = 'RegistrationPage'>
            <Header></Header>
                <div className="wrapper">
                    <form method='POST'>
                    <h2>Create account</h2>
                        <div className="input-field">
                        <input type="text" required/>
                        <label>Enter your email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" required/>
                        <label>Enter your password</label>
                    </div>
                    <button type="submit">Create your account</button>
                    <div className="register">
                        <p>Do you have an account? <a id='SignIn' href="/auth">  Sign in</a></p>
                    </div>
                    </form>
                </div>
            <Footer />
        </div>
    )
}