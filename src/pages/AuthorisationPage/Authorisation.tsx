import { Footer } from '../../shared/Footer/Footer'
import { Header } from '../../shared/Header/Header'
import "./Authorisation.css"


export function AuthorisationPage(){
    return(
        <div className = 'RegistrationPage'>
            <Header></Header>
            <div className='reg-mainDiv'>
                <h1 className='H1'>Authorization</h1>
        
                <form method='POST'>
                    <input type="text" placeholder="Enter your nickname" className='InputReg' />
                    <input type="text" placeholder="Enter email" className='InputReg'/>
                    <input type="text" placeholder="Enter password" className='InputReg'/>
                    <button type="submit" className='Reg'>Authorization</button>
                </form>
                </div>
            <Footer />
        </div>
    )
}