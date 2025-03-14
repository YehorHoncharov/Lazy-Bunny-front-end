import { ProgressBar } from "react-loader-spinner";
import { useUsers } from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";

import "./AdminProfiles.css";

export function AdminProfiles(){

    const { users, isLoading, error} = useUsers()
    const navigate = useNavigate();

    return (
        <div className="adminProfiles">
            <h1 style={{fontSize:48}}>Profiles</h1>

            <div className="admin-search">
                <input className="admin-input" type="text" placeholder="Search by name or email" />
                <img id="admin-img-search" src="/static/img/Frame.svg" alt="" />
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Age</th>
                            <th>Delete/Editing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                            <td colSpan={5}>
                                <ProgressBar
                                visible={true}
                                height="80"
                                width="80"
                                borderColor="purple"
                                barColor="green"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                />
                            </td>
                            </tr>
                        ) : error ? (
                            <tr>
                            <td colSpan={5}>{error}</td>
                            </tr>
                        ) : (
                            users.map((user, index) =>
                            Array.from({ length: 15 }).map((_, cloneIndex) => (
                            <tr key={user.id} onClick={() => navigate(`/admin/profile/${user.id}`)} style={{ cursor: 'pointer' }}>
                                <td>{user.nickname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.age}</td>
                                <td className="actions">
                                    <button className="edit"><img src="/static/img/trash-2.png" alt="Edit" /></button>
                                    <button className="delete"><img src="/static/img/edit-3.png" alt="Delete" /></button>
                                </td>
                            </tr>
                            ))
                            )
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}