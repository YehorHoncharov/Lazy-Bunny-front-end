import "./FilmComments.css"
import { CardComment } from "../../shared/CardComment/CardComment";
import { IFilm } from "../../hooks/types";
import { useUserContext } from "../../context/userContext";
import { useState } from "react";

interface IFilmCommentsProps {
    film: IFilm;
}

interface ICommentData {
    text: string;
    movieId: number;
    authorId: number;
}

export function FilmComments(props: IFilmCommentsProps) {
    const { film } = props;
    const { user } = useUserContext();
    const [commentText, setCommentText] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!commentText || !user) {
            return
        }
        
        const commentData: ICommentData = {
            text: commentText,
            movieId: film.id,
            authorId: user.id
        };

        try {
            const response = await fetch(`http://localhost:3001/movies/${film.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData)
            });

            if (!response.ok) {
                throw new Error("Failed to post comment");
            }

            setCommentText("");
 


        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <div className="comments">
            <h1 className="description">Comments</h1>
            
            {user ? (
                <div className="commentInputDiv">
                    <form onSubmit={handleSubmit} className="commentsNameAndSend">
                    <textarea 
                        placeholder="Your comment" 
                        className="commentInput" 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                        <button className="sendComment" type="submit">Send</button>
                    </form>
                </div>
            ) : (
                <p className="no-results">Please log in to leave a comment</p>
            )}
            
            <div className="commentsDiv">
                {film.Comments.map((comment) => {
                    return (
                        <CardComment
                            key={comment.id}
                            id={comment.id}
                            author={comment.author}
                            text={comment.text}
                            commentId={comment.commentId}
                        />
                    );
                })}
            </div>
        </div>
    );
}