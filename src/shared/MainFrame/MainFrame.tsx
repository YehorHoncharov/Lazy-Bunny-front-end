import { Link } from "react-router-dom"

import "./MainFrame.css"

export function MainFrame(){
    return (
        <div className="mainFrame">
            <div className="lazyFrame">

                <div>
                    <h1 className="lazybunny">LAZY</h1>
                    <h1 className="lazybunny">BUNNY</h1>
                </div>

                <div>
                <h3 id="textFrame">Movies picked for </h3>
                <h3 id="textFrame">your mood, </h3>
                <h3 id="textFrame">relax and enjoy!</h3>
                </div>

                <Link to="/movies">
                    <button id="buttonStart">Start picking!</button>
                </Link>
            </div>
        </div>
    )
}