import { useState, useRef, useEffect, useContext } from "react";
import * as yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from "../../context/userContext";
import { Card } from "../../shared/CardBunny/CardBunny";
import { recentFilmsContext } from "../../shared/MovieApp/MovieApp";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import "./ProfilePage.css"

export function ProfilePage() {
  const { recentFilms } = useContext(recentFilmsContext);
  const {user} = useUserContext();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || "");
      setAge(user.age?.toString() || "");
      setSelectedImage(user.image || null);
    }
  }, [user]);

  // if (!user || !user.favouriteFilms) {
  //   return <p>Загрузка данных...</p>;
  // }

  // if (user.favouriteFilms.length === 0) {
  //   return <p>У вас пока нет избранных фильмов</p>;
  // }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  function handleUploadClick(){
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  

  async function uploadImage(file: File){
    const formData = new FormData();
    formData.append("image", file);

  };

  const handleSave = async () => {
    try {
      const userData = {
        nickname,
        age: Number(age),
      };

      let imageUrl = user?.image;

      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        uploadImage(file);
      }

      const updatedUser = {
        ...userData,
        image: imageUrl,
      };
      if (user){
        const response = await fetch(`http://localhost:3001/users/${user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          });
    
          if (!response.ok) {
            throw new Error("Failed to update user");
          }
    
          const data = await response.json();
          console.log("User updated:", data);
      }
      
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
        });
      } else {
        console.error("Failed to update user:", error);
      }
    }
  };


  if (!user) {
    return <div className="profile-main-div">User not found</div>;
  }

  return (
    <div className="profilePage">
        <Header />
        <div className="profileInfo">
            <p className="profileTitle">Profile</p>
            <div className="infoWithoutCards">
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
                    style={{ display: "none" }}
                  />
                  <button className="panel-button" onClick={handleUploadClick}>
                    Upload
                  </button>

                </div>

                <div className="userInfo">
                    <p className="profileUsername">Username: {user.nickname}</p>
                    <p className = "profileAge">Age: {user.age}</p>
                    <button className="panel-button" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
            
            
            <div className="category-recent">
                {recentFilms.map((film, index) => {
                    if (index < 5){
                        return <Card film={film}></Card>
                    }
                    return null
                })}
            </div>
            <div className="category-recent">
                {user.favouriteMovies.map((film, index) => {
                    if (index < 5){
                        return <Card film={film}></Card>
                    }
                    return null
                })}
            </div>
        </div>
        <Footer />
    </div>
        
    
  );
}