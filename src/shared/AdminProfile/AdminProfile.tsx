import { useParams } from "react-router-dom"
import { useUserByID } from "../../hooks/useUserById"
import "./AdminProfile.css"
import { ProgressBar } from "react-loader-spinner"
import { useState, useRef } from "react"

export function AdminProfile() {
  const { id } = useParams()
  const { user, isLoading, error } = useUserByID(Number(id))

  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Для зберігання вибраного зображення
  const fileInputRef = useRef<HTMLInputElement>(null); // Реф для <input type="file">

  // Обробник вибору файлів
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const imageUrl = URL.createObjectURL(file) // Створюємо URL для нового зображення
      setSelectedImage(imageUrl)
    }
  };

  // Викликаємо клік на <input type="file"> при натисканні на кнопку
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  };

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
    return <div className="profile-main-div">User not found</div>;
  }

  return (
    <div className="profile-main-div">
      <h1>Profile</h1>

      <div className="profile-main-content">
        <div className="profile-photo-div">

          <img
            className="profile-photo"
            src={selectedImage || user.image || "/static/img/frofileIMG.png"}
            alt="Profile"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }} // Приховуємо input
          />
          <button className="panel-button" onClick={handleUploadClick}>
            Upload
          </button>
        </div>

        <div className="profile-info-div">
          <div className="info-div">
            <p className="profile-text">Name:</p>
            <input
              className="profile-input"
              type="text"
              placeholder={user.nickname}
            />
          </div>
          <div className="info-div">
            <p className="profile-text">Password:</p>
            <input
              className="profile-input"
              type="text"
              placeholder="Entered your a new password"
            />
          </div>
          <div className="info-div">
            <p className="profile-text">Email:</p>
            <input
              className="profile-input"
              type="text"
              placeholder={user.email}
            />
          </div>
          <div className="info-div">
            <p className="profile-text">Age:</p>
            <input
              className="profile-input"
              type="text"
              placeholder={user.age?.toString()}
            />
          </div>

          <button className="panel-button">Save</button>
        </div>
      </div>
    </div>
  );
}