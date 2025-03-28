import { useState } from "react" 
import { ProgressBar } from "react-loader-spinner" 
import { useGetAllFilms } from "../../hooks/useGetAllFilms" 
import { Footer } from "../../shared/Footer/Footer" 
import { Header } from "../../shared/Header/Header" 
import { Card } from "../../shared/CardBunny/CardBunny" 

import "./ShowPage.css" 

export function ShowPage() {
    const { films, isLoading } = useGetAllFilms() 
    const [searchTerm, setSearchTerm] = useState("") 

    const filterByGenreId = () => {
        if (!films) return [] 
        
        return films.filter(film => 
            film.Genres.some(genre => genre.id === 4)
    )} 

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase()) 
    } 

    const filteredFilms = filterByGenreId().filter(film => 
        film.Name.toLowerCase().includes(searchTerm)
    ) 

    if (isLoading) return (
        <div className="loader-container">
            <ProgressBar
                visible={true}
                height="80"
                width="80"
                borderColor="purple"
                barColor="green"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    ) 

    if (!films) return <p className="no-films">No films found.</p> 

    return (
        <div className='contener'>
            <Header />
            <div className="showpage-div">
                <h1 className="profileTitle">Shows</h1>

                <div className="admin-search">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search shows..."
                            className="admin-input"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                
                {filteredFilms.length > 0 ? (
                    <div className="films-grid">
                        {filteredFilms.map((film, index) => (
                            <Card key={film.id} film={film} />
                        ))}
                    </div>
                ) : (
                    <p className="no-results">
                        {searchTerm 
                            ? "No matching shows found" 
                            : "No shows available in this category"}
                    </p>
                )}
            </div>
            <Footer />
        </div>
    ) 
}