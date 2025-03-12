
import "./AdminProfiles.css";

export function AdminProfiles(){
    return (
        <div className="adminProfiles">
            <h1 style={{fontSize:48}}>Profiles</h1>

            <div className="admin-search">
                <input className="admin-input" type="text" placeholder="Search by name or email" />
                <img id="admin-img-search" src="/static/img/Frame.svg" alt="" />
            </div>
        </div>
    )
}