import { Link } from 'react-router-dom'
import './Footer.css'

export function Footer(){
    return(
        <footer className="footer"> 
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
                </style>
                <Link to={'/'}>
                    <div className='logodiv'>
                        <img src="/static/img/HeaderBunny.png" alt="" />
                        <h1 className='textgradient'>Lazy Bunny</h1>
                    </div>
                </Link>
                <div className='div1'>
                    <div className='catalog'>
                        <Link to={'/movies'}>
                            <a className='div1' href='/'>Movies</a>
                        </Link>
                        <a className='div1' href="/">Shows</a>
                        <a className='div1' href="/">Mood</a>
                        <a className='div1' href="/">Search</a>
                    </div>
                    <div className='socialMedia'>
                        <div className='viber'>
                            <img className= 'footerSocMedia' src="/static/img/Viber.png" alt="Viber" />
                            <a className='div1' href="/">Viber</a>
                        </div>
                        <div className='instagram'>
                            <img className= 'footerSocMedia' src="/static/img/Instagram.png" alt="Instagram" />
                            <a className='div1' href="/">Instagram</a> 
                        </div>
                        <div className='telegram'>
                            <img className= 'footerSocMedia' src="/static/img/Telegram.png" alt="Telegram" />
                            <a className='div1' href="/">Telegram</a>
                        </div>
                        <div className='facebook'>
                            <img className= 'footerSocMedia' src="/static/img/Facebook.png" alt="Facebook" />
                            <a className='div1' href="/">Facebook</a> 
                        </div>
                    </div>
                </div>
                <div className='div2'>
                    <div className='footerNames'>
                        <a className='namefont' href="/">Bohdanchik</a>
                        <a className='namefont' href="/">Sema</a>
                        <a className='namefont' href="/">Egorushka</a>
                        <a className='namefont' href="/">Mirosya</a>
                    </div>
                    <div className='footerTeam'>
                        <a className='namefont' href="/">Created by Team1</a>
                        <a href="/"><img src="/static/img/FooterBunny.png" alt="FooterBunny" /></a>
                    </div>
                </div>
                
                
        </footer>
    )
}