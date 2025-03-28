import { useForm } from 'react-hook-form'
import { Footer } from '../../shared/Footer/Footer'
import { Header } from '../../shared/Header/Header'
import { useUserContext } from '../../context/userContext'

import "./Registration.css"

interface IRegisterForm {
    nickname: string,
    email: string,
    password: string,
}

export function RegistrationPage(){
    const {register} = useUserContext()
    const {register: registerUser, handleSubmit, formState} = useForm <IRegisterForm>({
        mode: 'onSubmit'
    })

        function onSubmit(data: IRegisterForm){
            register(data.nickname, data.email, data.password)
    }

    return(
        <div className = 'RegistrationPage'>
            <Header></Header>
                <div className="wrapper">
                    <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                    <h2>Create account</h2>
                    <div className="input-field">
                        <input type="text" className='input-field' placeholder="Enter your nickname"{...registerUser('nickname', {
                            required: {value: true, message: 'Field is required'}, 
                            minLength: {value: 2, message: 'This field should be more than 2 symbols'}, 
                            maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })} />

                    <p>{formState.errors.email?.message}</p>

                    </div>
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
                            maxLength: {value: 100, message: 'This field should be less than 100 symbols'}, })}/>
                    </div>
                    <p>{formState.errors.password?.message}</p>
                    <button className="reg-button" type="submit">Create your account</button>
                    <div className="register">
                        <p>Do you have an account? <a id='SignIn' href="/auth">  Sign in</a></p>
                    </div>
                    </form>
                </div>
            <Footer />
        </div>
    )
}