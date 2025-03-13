import "./Search.css"

export function Search(){
    return(
        <div className="search">

            <h1 id="textSearch">Search</h1>

            <div className="serchInput">
                <img className="searchBunny" src="/static/img/SearchBunny.png" alt="" />
                <input className="input" type="text" placeholder="Enter the film name" />
            </div>

            <button id="buttonFind">Find</button>
        </div>
    )
}