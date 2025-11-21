// import { useState } from "react";
// import { useGenre } from "../../hooks/useGenre";
// import "./AdminAddFilm.css";
// import { ProgressBar } from "react-loader-spinner";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import * as yup from "yup";
// import { useFilmByID } from "../../hooks/useFilmByID";
// import { useParams } from "react-router-dom";
// import { Header } from "../Header/Header";

// export function AdminAddFilm(){
//    const { id } = useParams();
//   const { film, isLoading, error, addFilm } = useFilmByID(Number(id));
//   const [newFilm, setNewFilm] = useState("");
//   const [editFilms, setEditFilms] = useState<Record<number, string>>({});

//   // const filmSchema = yup.object().shape({
//   //   name: yup.string().required("Это поле обязательно").min(3, "Название должно содержать минимум 3 символа"),
//   //   id: yup.number().required("Это поле обязательно").positive("ID должен быть положительным числом"),
//   //   description: yup.string().required("Это поле обязательно").min(10, "Описание должно содержать минимум 10 символов"),
//   //   releaseDate: yup.string().required("Это поле обязательно"),
//   //   year: yup.number().required("Это поле обязательно").positive("Год должен быть положительным числом"),
//   //   genres: yup.array().of(yup.object().shape({
//   //     name: yup.string().required("Название жанра обязательно")
//   //   })).required("Это поле обязательно"),
//   //   country: yup.string().required("Это поле обязательно"),
//   //   director: yup.string().required("Это поле обязательно"),
//   //   duration: yup.string().required("Это поле обязательно"),
//   //   screenwriter: yup.string().required("Это поле обязательно"),
//   //   baner: yup.string().required("Это поле обязательно"),
//   //   img: yup.string().required("Это поле обязательно"),
//   //   moments: yup.array().of(yup.object().shape({
//   //     })).required("Это поле обязательно"),
//   //   actors: yup.array().of(yup.object().shape({
//   //     name: yup.string().required("Имя актера обязательно"),
//   //     surname: yup.string().required("Фамилия актера обязательна"),

//   // });

//   const handleSave = async () => {
//       try {
//         const filmData = { film };

//         // await filmSchema.validate(filmData, { abortEarly: false });

//         const updatedFilm = {
//           ...filmData
//         };

//         const response = await fetch(`http://localhost:3000/movies`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedFilm),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to update user");
//         }

//         const data = await response.json();
//         console.log("User updated:", data);
//         toast.success("User updated successfully!");
//       } catch (error) {
//         if (error instanceof yup.ValidationError) {
//           error.inner.forEach((err) => {
//             toast.error(err.message);
//           });
//         } else {
//           console.error("Failed to update user:", error);
//           toast.error("Failed to update user");
//         }
//       }
//     };
//   return (
//       <div className="profilePage">
//               <Header />
//               <div className="profileInfo">
//                   <p className="profileTitle">Film</p>
//                   <div className="infoWithoutCards">
//                       <div className="profile-photo-div">
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                           ref={fileInputRef}
//                           style={{ display: "none" }}
//                         />
//                         <button className="panel-button" onClick={handleUploadClick}>
//                           Upload
//                         </button>

//                       </div>

//                       <div className="userInfo">
//                           <p className="profileUsername">Username: {user.nickname}</p>
//                           <p className = "profileAge">Age: {user.age}</p>
//                           <button className="panel-button" onClick={handleSave}>
//                               Save
//                           </button>
//                       </div>
//                   </div>

//                   <h1 style={{ fontSize: 36, color: "white" }}>Recent</h1>
//                   <div className="category-recent">
//                       {recentFilms.map((film, index) => {
//                           if (index < 5){
//                               return <Card film={film}></Card>
//                           }
//                           return null
//                       })}
//                   </div>
//                   <h1 style={{ fontSize: 36, color: "white" }}>Favourite</h1>

//                 {user.favouriteMovies ? <div className="category-recent">
//                       {user.favouriteMovies.map((film, index) => {
//                           if (index < 10){
//                               return <Card film={film}></Card>
//                           }
//                           return null
//                       })}
//                   </div> : <p> No </p>}

//               </div>
//               <Footer />
//           </div>
//   )
// }

export {};
