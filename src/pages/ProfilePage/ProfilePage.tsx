import { useState, useRef, useEffect, useContext } from "react";
import { useUserContext } from "../../context/userContext";
import { Card } from "../../shared/CardBunny/CardBunny";
import { recentFilmsContext } from "../../shared/MovieApp/MovieApp";
import { Header } from "../../shared/Header/Header";
import { Footer } from "../../shared/Footer/Footer";
import { IFilm } from "../../hooks/types";
import "./ProfilePage.css";

export function ProfilePage() {
  const { recentFilms } = useContext(recentFilmsContext);
  const { user, updateUser } = useUserContext();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [favouriteMovies, setFavouriteMovies] = useState<IFilm[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      if (user && !initialLoadDone) {
        try {
          const response = await fetch(`http://localhost:3001/users/${user.id}`);
          
          if (!isMounted) return;
          if (!response.ok) throw new Error("Failed to fetch user data");
          
          const userData = await response.json();
          
          if (isMounted) {
            setSelectedImage(userData.image || null);
            const movies = userData.favoriteMovies || userData.favouriteMovies || [];
            setFavouriteMovies(movies);
            // Видалено updateUser, щоб уникнути зайвих рендерів
            setInitialLoadDone(true);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, [user, initialLoadDone]); // Видалено updateUser з залежностей

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  async function updateFavouriteMovies() {
    try {
      if (!user) return;
      
      const response = await fetch(`http://localhost:3001/users/${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch updated data");
      
      const updatedUser = await response.json();
      updateUser(updatedUser);
      const movies = updatedUser.favoriteMovies || updatedUser.favouriteMovies || [];
      setFavouriteMovies(movies);
    } catch (error) {
      console.error("Error updating favourite movies:", error);
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      
      try {
        const uploadedImage = await uploadImage(file);
        if (uploadedImage?.imageUrl) {
          setSelectedImage(uploadedImage.imageUrl);
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await fetch(`http://localhost:3001/users/${user?.id}/image`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error("Failed to upload image");
      return await response.json();
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!user || isSaving) return;
    
    try {
      setIsSaving(true);
      const userData = {
        image: selectedImage || user.image
      };

      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Failed to update user");

      const data = await response.json();
      updateUser(data);
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsSaving(false);
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
            <button 
              className="panel-button" 
              onClick={handleUploadClick}
              disabled={isSaving}
            >
              Upload
            </button>
          </div>

          <div className="userInfo">
            <p className="profile-username">Username: {user.nickname}</p>
            <p className="profile-age">Age: {user.age || 'Not specified'}</p>
            <button 
              className="panel-button" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
        
        <h1 style={{ fontSize: 36, color: "white" }}>Recent</h1>
        <div className="category-recent">
          {recentFilms.slice(0, 5).map((film) => (
            <Card key={`film-${film.id}`} film={film} onUpdate={updateFavouriteMovies}/>
          ))}
        </div>
        
        <h1 style={{ fontSize: 36, color: "white" }}>Favorites</h1>
        <div className="category-recent">
          {favouriteMovies.length > 0 ? (
            favouriteMovies
              .filter((film, index, self) => 
                index === self.findIndex(f => f.id === film.id)
              )
              .slice(0, 10)
              .map((film) => (
                <Card 
                  key={`film-${film.id}`}
                  film={film} 
                  onUpdate={updateFavouriteMovies}
                />
              ))
          ) : (
            <p>No favorite movies yet</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}