import "./FilmComments.css"
import { CardComment } from "../../shared/CardComment/CardComment";
import { IFilm } from "../../hooks/types";

interface IFilmCommentsProps{
    film: IFilm;
}

export function FilmComments(props: IFilmCommentsProps){
    const { film } = props
    
    return(
        <div className="comments">
            <h1 className="description">Comments</h1>
            <div className="commentInputDiv">
                <input type="text" placeholder="Your comment" className="commentInput" />
            </div>

            <div className="commentsNameAndSend">
                <input type="text" placeholder="Your name" className="commentInputName" />
                <button className="sendComment">Send</button>
            </div>
            
            <div className="commentsDiv">
                {film.Comments.map((comment) =>{
                        return <CardComment 
                        author={comment.author}
                        text={comment.text}
                        commentId={comment.commentId}>      
                        </CardComment>
                })}
            </div>
            
            
        </div>
    )
}