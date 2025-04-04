import { useForm } from 'react-hook-form'
import { Footer } from '../../shared/Footer/Footer'
import { Header } from '../../shared/Header/Header'
import "./Authorisation.css"
import { useUserContext } from '../../context/userContext'

interface IAuthForm {
    email: string,
    password: string,
}

export function AuthorisationPage(){
    const {login} = useUserContext()
    const {register: registerUser, formState, handleSubmit} = useForm <IAuthForm>({
        mode: 'onSubmit'
    })

    function onSubmit(data: IAuthForm){
        login(data.email, data.password)
}
    
    return(
        
        <div className = 'AuthorizationPage'>
            <Header></Header>
            <div className="wrapper">
                <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                    <div className="input-field">
                    <input type="text" className='input-field' placeholder="Enter your email"{...registerUser('email', {
                        required: {value: true, message: 'Field is required'}, 
                        minLength: {value: 7, message: 'This field should be more than 7 symbols'}, 
                        maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />
                    <p>{formState.errors.email?.message}</p>
                </div>
                <div className="input-field">
                    <input type="password" className='input-field' placeholder="Enter your password"{...registerUser('password', {
                            required: {value: true, message: 'Field is required'}, 
                            minLength: {value: 4, message: 'This field should be more than 4 symbols'}, 
                            maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} required/>
                    <p>{formState.errors.password?.message}</p>
                </div>
                <button className="reg-button" type="submit" >Log In</button>
                <div className="register">
                    <p>Don't have an account? <a id='Register' href="/reg">  Register</a></p>
                </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}