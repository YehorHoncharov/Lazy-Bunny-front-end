import { useParams } from "react-router-dom";
import { IFilm } from "../../hooks/types";
import { CardComment } from "../CardComment/CardComment";
import { useFilmByID } from "../../hooks/useFilmByID";
import { useEffect, useState } from "react";
import './AdminComments.css'


export function AdminComments(){
    const {id} = useParams()
    const {film} = useFilmByID(Number(id))
    const [filmState, setFilmState] = useState<IFilm>()
      useEffect(() => {
      if (film){
        setFilmState(film)
      }
    }, [film])
    console.log(filmState)
    return(
        <div className="adminComments">
            <div className="adminProfiles">
                <h1 style={{fontSize:48}}>Profiles</h1>

                <div className="admin-search">
                    <input className="admin-input" type="text" placeholder="Search by name or key words" />
                    <img id="admin-img-search" src="/static/img/Frame.svg" alt="" />
                    <input className="admin-input" type="text" placeholder="Filter by ..." />
                </div>
            </div>
            {!filmState? <div>No film</div>: 

        
            <div className="commentsDiv">
                            {filmState.Comments.map((comment) =>{
                                    return (
                                        <div className="adminCommentCard">
                                            <div className="adminCommentInfoDate">
                                                <div className="adminCommentInfo">
                                                    <img src="/static/img/commentBunny.png" alt="" />
                                                    <p>{comment.author}</p>
                                                </div>
                                                <div className="commentDate">
                                                    <p>25.12.2006</p>
                                                </div>
                                                
                                            </div>
                                            <div className="textAndButtons">
                                                <div className="commentText">
                                                    <p>{comment.text}</p>
                                                </div>
                                                
                                                <div className="commentsButtsCon">
                                                    <button className="commentButts"><img src="/static/img/changeBut.png" alt="" /></button>
                                                    <button className="commentButts"><img src="/static/img/trash-2.png" alt="" /></button>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                    )
                            })}
                        </div>}
        </div>
    )
}