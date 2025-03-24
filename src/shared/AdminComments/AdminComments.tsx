import { useParams } from "react-router-dom";
import './AdminComments.css'
import { useUserByID } from "../../hooks/useUserById";
import { useEffect, useState } from "react";
import { AdminSearch } from "../AdminSearch/AdminSearch";


export function AdminComments(){
    const {id} = useParams()
    const {user, deleteComment} = useUserByID(Number(id))
    const comments = user?.comments
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState(comments);

    useEffect(() => {
      setSearchResults(comments);
    }, [comments]);

    const handleSearchChange = (value: string) => {
      setSearchValue(value);

      const filteredResults = comments?.filter(
        (comment) =>
          comment.text.toLowerCase().includes(value.toLowerCase())
      );

      setSearchResults(filteredResults);
    };

   
    //   useEffect(() => {
    //   if (userState){
    //     setUserState(user)
    //   }
    // }, [userState])

    return(
        <div className="adminComments">
            <div className="adminProfiles">
                <h1 style={{fontSize:48}}>Comments</h1>

                <div className="admin-search commentSearch">
                    <div>
                    <AdminSearch
                        placeholder="Search by name or email"
                        onChange={handleSearchChange}
                        className="custom-search-class"
                        inputClassName="custom-input-class"
                        iconSrc="/static/img/Frame.svg"
                        place="custom-search-place"
                    />
                    </div>
                    
                    <div>
                        <input className="admin-input" type="text" placeholder="Filter by ..." />
                    </div>
                    <div>
                    {!user? <div>No film</div>: 
                        <h1>{user.nickname}</h1>}
                    </div>
                    
                </div>
            </div>
            {!user? <div>No film</div>: 

        
            <div className="commentsDiv">
                    {!searchResults ? <div>No film comments</div> : (searchResults.map((comment) =>{
                            return (
                                <div className="adminCommentCard">
                                    <div className="adminCommentInfoDate">
                                        <div className="adminCommentInfo">
                                            <img src="/static/img/commentBunny.png" alt="" />
                                            <p>{user.nickname}</p>
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
                    }))}  
                </div>}
        </div>
    )
}