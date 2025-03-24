import { useParams } from "react-router-dom";
import { useUserByID } from "../../hooks/useUserById";
import "./AdminProfile.css";
import { ProgressBar } from "react-loader-spinner";
import { useState, useRef, useEffect } from "react";
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userSchema = yup.object().shape({
  nickname: yup.string().required('Nickname is required'),
  password: yup.string().min(6, 'Password must be at least 8 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().positive('Age must be a positive number').integer('Age must be an integer'),
});

export function AdminProfile() {
  const { id } = useParams();
  const { user, isLoading, error } = useUserByID(Number(id));

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || "");
      setEmail(user.email || "");
      setAge(user.age?.toString() || "");
      setSelectedImage(user.image || null);
    }
  }, [user]);

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

  async function uploadImage(file: File): Promise<string>{
    const formData = new FormData();
    formData.append("image", file);
  
    const response = await fetch(`http://localhost:3001/users/${id}`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
  
    const data = await response.json();
    return data.imageUrl;
  };

  const handleSave = async () => {
    try {
      const userData = {
        nickname,
        password,
        email,
        age: Number(age),
      };

      await userSchema.validate(userData, { abortEarly: false });

      let imageUrl = user?.image;

      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        imageUrl = await uploadImage(file);
      }

      const updatedUser = {
        ...userData,
        image: imageUrl,
      };

      const response = await fetch(`http://localhost:3001/users/${id}`, {
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
      toast.success("User updated successfully!");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        console.error("Failed to update user:", error);
        toast.error("Failed to update user");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="profile-main-div">
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
            style={{ display: "none" }}
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
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={user.nickname}
            />
          </div>
          <div className="info-div">
            <p className="profile-text">Password:</p>
            <input
              className="profile-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a new password"
            />
          </div>
          <div className="info-div">
            <p className="profile-text">Email:</p>
            <input
              className="profile-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={user.email}
            />
          </div>
          <div id="age-text" className="info-div">
            <p className="profile-text">Age:</p>
            <input
              className="profile-input"
              id="age"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={user.age?.toString()}
            />
          </div>

          <button className="panel-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}