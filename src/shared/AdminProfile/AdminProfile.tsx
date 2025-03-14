import { useParams } from "react-router-dom"
import { useUserByID } from "../../hooks/useUserById"
import "./AdminProfile.css"
import { ProgressBar } from "react-loader-spinner"

export function AdminProfile(){

    const {id} = useParams()
    const {user, isLoading, error} = useUserByID(Number(id))

    if (isLoading) {
        return (
            <div className="profile-main-div">
                <ProgressBar visible={true} height="80" width="80" borderColor="purple" barColor="green" ariaLabel="progress-bar-loading" wrapperStyle={{}} wrapperClass=""/>
            </div>
        );
    }

    if (error) {
        return <div className="profile-main-div">{error}</div>;
    }

    if (!user) {
        return <div className="profile-main-div">Post not found</div>;
    }

    return (
        <div className="profile-main-div">
            <h1>Profile</h1>

            <div className="profile-main-content">
                <div className="profile-photo-div">
                    <img className="profile-photo" src={user.image || "/static/img/Фото прифиля.png"}  alt="" />
                    <button className="panel-button">Upload</button>
                </div>

                <div className="profile-info-div">
                    <div className="info-div">
                        <p className="profile-text">Name:</p>
                        <input type="text" placeholder={user.nickname}/>
                    </div>
                    <div className="info-div">
                        <p className="profile-text">Password:</p>
                        <input type="text" placeholder="Entered your a new password"/>
                    </div>
                    <div className="info-div">
                        <p className="profile-text">Email:</p>
                        <input type="text" placeholder={user.email}/>
                    </div>
                    <div className="info-div">
                        <p className="profile-text">Age:</p>
                        <input type="text" placeholder={user.age?.toString()}/>
                    </div>

                    <button className="panel-button">Save</button>
                </div>
            </div>
        </div>
    )
}