import { Footer } from '../../shared/Footer/Footer'
import { Header } from '../../shared/Header/Header'
import "./Registration.css"


export function RegistrationPage(){
    return(
        <div className = 'RegistrationPage'>
            <Header></Header>
            <div className='reg-mainDiv'>
                <h1 className='H1'>Registration</h1>
        
                <form method='POST'>
                    <input type="text" placeholder="Enter your nickname" className='InputReg' />
                    <input type="text" placeholder="Enter email" className='InputReg'/>
                    <input type="text" placeholder="Enter password" className='InputReg'/>
                    <button type="submit" className='Reg'>Registration</button>
                </form>
                </div>
            <Footer />
        </div>
    )
}