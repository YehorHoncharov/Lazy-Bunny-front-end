import { Footer } from '../../shared/Footer/Footer'
import { Header } from '../../shared/Header/Header'
import { CategoriesOfMovies } from '../../shared/CategoriesOfMovies/CategoriesOfMovies'
import { MainFrame } from '../../shared/MainFrame/MainFrame'

import "./MainPage.css"
import { Search } from '../../shared/Search/Search'

export function MainPage(){

    return (
        <div className='contener'>
                
                <Header />
                <MainFrame />
                <hr />
                <Search/>
                <hr />
                <CategoriesOfMovies />
                <Footer />
                
        </div>
    )
}