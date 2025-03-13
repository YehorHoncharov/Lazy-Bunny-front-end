import { Footer } from '../../shared/Footer/Footer'
import { Header } from '../../shared/Header/Header'
import { CategoriesOfMovies } from '../../shared/CategoriesOfMovies/CategoriesOfMovies'
import { MainFrame } from '../../shared/MainFrame/MainFrame'
import { Search } from '../../shared/Search/Search'
import "./MainPage.css"

export function MainPage(){
    return (
        <div className='contener'>
                
                <Header />
                <MainFrame />
                <hr />
                <Search />
                <hr />
                <CategoriesOfMovies />
                <Footer />
                
        </div>
    )
}