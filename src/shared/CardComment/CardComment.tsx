import "./CardComment.css"
// import { useGetAllFilms } from "../../hooks/useGetAllFilms";
import { IComment } from '../../hooks/types'
export function CardComment(props: IComment){
    return(

        <div className="comment">
                <div className="commentInfo">
                    <div>
                        <img src="/static/img/commentBunny.png" alt="" className="commentImg"/>
                    </div>
                    <div className="commentNameAndText">
        
                        <p className="commentName">{props.author}</p>
                        <p className="commentText">{props.text}</p>
                    </div>
                    

                </div>
                
            </div>
    )
}