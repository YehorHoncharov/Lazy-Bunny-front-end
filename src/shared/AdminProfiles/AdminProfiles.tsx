import { ProgressBar } from "react-loader-spinner";
import { useUsers } from "../../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./AdminProfiles.css";
import { AdminSearch } from "../AdminSearch/AdminSearch";

export function AdminProfiles() {
  const { users, isLoading, error } = useUsers();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(users);

  useEffect(() => {
    setSearchResults(users);
  }, [users]);

  function handleSearchChange(value: string) {
    setSearchValue(value);

    const filteredResults = users.filter(
      (user) =>
        user.nickname.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filteredResults);
  }

  async function handleDelete(event: React.MouseEvent, userId: number) {
    console.log("Delete button clicked");
    event.stopPropagation();

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const updatedUsers = users.filter((user) => user.id !== userId);
      setSearchResults(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  return (
    <div className="adminProfiles">
      <h1 style={{ fontSize: 48 }}>Profiles</h1>

      <AdminSearch
        placeholder="Search by name or email"
        onChange={handleSearchChange}
        className="custom-search-class"
        inputClassName="custom-input-class"
        iconSrc="/static/img/Frame.svg"
        place="custom-search-place"
      />

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
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => navigate(`/admin/profile/${user.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.age}</td>
                  <td className="actions">
                    <button
                      className="delete"
                      onClick={(event) => handleDelete(event, user.id)}
                    >
                      <img src="/static/img/trash-2.png" alt="Delete" />
                    </button>
                    <button className="edit">
                      <img src="/static/img/edit-3.png" alt="Edit" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
