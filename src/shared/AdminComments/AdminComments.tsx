import { useParams } from "react-router-dom";
import { IUser } from "../../hooks/types";
import { useEffect, useState } from "react";
import './AdminComments.css'
import { useUserByID } from "../../hooks/useUserById";


export function AdminComments(){
    const {id} = useParams()
    const {user, deleteComment} = useUserByID(Number(id))
    const [userState, setUserState] = useState<IUser>()
   
    
    
      useEffect(() => {
      if (userState){
        setUserState(user)
      }
    }, [userState])
    console.log(userState)
    return(
        <div className="adminComments">
            <div className="adminProfiles">
                <h1 style={{fontSize:48}}>Comments</h1>

                <div className="admin-search commentSearch">
                    <div>
                        <input className="admin-input" type="text" placeholder="Search by name or key words" />
                    </div>
                    
                    <div>
                        <input className="admin-input" type="text" placeholder="Filter by ..." />
                    </div>
                    <div>
                    {!userState? <div>No film</div>: 
                        <h1>{userState.nickname}</h1>}
                    </div>
                    
                </div>
            </div>
            {!userState? <div>No film</div>: 

        
            <div className="commentsDiv">
                            {userState.Comments.map((comment) =>{
                                    return (
                                        <div className="adminCommentCard">
                                            <div className="adminCommentInfoDate">
                                                <div className="adminCommentInfo">
                                                    <img src="/static/img/commentBunny.png" alt="" />
                                                    <p>{comment.author.nickname}</p>
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
                                                    <button onClick={() => deleteComment(comment.id)} className="commentButts"><img src="/static/img/trash-2.png" alt="" /></button>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                    )
                            })}
                        </div>}
        </div>
    )
}