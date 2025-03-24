import { useState, useEffect } from 'react'
import { IComment, IUser } from './types'


export function useUserByID(id: number) {
    const [user, setUser] = useState<IUser>()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>()
    const [comments, setComments] = useState<IComment[]>([])

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoading(true)
                const response = await fetch(`http://localhost:3001/users/${id}`)
                const user = await response.json()
                
                setUser(user)
                
            }
            catch (error) {
               
                if (error instanceof Error){
                    setError(error.message)
                }
                
            }
            finally {
                
                setIsLoading(false)
            }
        }
        
        getUser()
        
    }, [id])

   


    async function deleteComment(id: number){
        try {
            const response = await fetch(`http://localhost:3001/users/comment/${id}`, {
                method: "DELETE",
            })
          
            const data = await response.json()
            console.log("Comment updated:", data)
            
            setComments((prev) => prev.filter((comment) => comment.id !== id))
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
            console.error(error)
        }
    }
    

    
    return {user: user, isLoading: isLoading, error: error, deleteComment: deleteComment
    }

    
}