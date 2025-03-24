// import { useState } from "react"
// import { useGenre } from "../../hooks/useGenre"
// import "./AdminGenres.css"
// import { ProgressBar } from "react-loader-spinner"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import yup from "yup"


// const genreSchema = yup.object().shape({
//   name: yup.string().required("Название жанра обязательно").min(3, "Название должно содержать минимум 3 символа"),
// })

// export function AdminGenres() {
//   const { genres, addGenre, deleteGenre, updateGenre, isLoading, error } = useGenre()
//   const [newGenre, setNewGenre] = useState("")
//   const [editGenres, setEditGenres] = useState<Record<number, string>>({})
//   const [searchValue, setSearchValue] = useState("");
//   const [searchResults, setSearchResults] = useState(genres);

//   const handleSearchChange = (value: string) => {
//     setSearchValue(value);

//     const filteredResults = genres.filter(
//       (genre) =>
//         genre.name.toLowerCase().includes(value.toLowerCase())
//     );

//     setSearchResults(filteredResults);
//   };

//   const handleSearchClick = () => {
//     console.log("Search icon clicked!");
//   }

//   const handleAddGenre = async () => {
//     try {
//       await genreSchema.validate({ name: newGenre })
//       await addGenre(newGenre)
//       setNewGenre("") 
//       toast.success("Жанр успешно добавлен!") 
//     } catch (err) {
//       if (err instanceof yup.ValidationError) {
//         toast.error(err.errors[0]) 
//       } else {
//         toast.error("Ошибка при добавлении жанра!") 
//       }
//     }
//   }


//   async function SaveGenre(genreId: number) {
//     const newName = editGenres[genreId]?.trim()
//     if (!newName) {
//       toast.error("Название жанра не может быть пустым!") 
//       return
//     }

//     try {
//       await genreSchema.validate({ name: newName })
//       await updateGenre(genreId, newName)
//       setEditGenres((prev) => {
//         const newEditGenres = { ...prev }
//         delete newEditGenres[genreId]
//         return newEditGenres
//       })
//       toast.success("Жанр успешно обновлен!")
//     } catch (err) {
//       if (err instanceof yup.ValidationError) {
//         toast.error(err.errors[0]) 
//       } else {
//         toast.error("Ошибка при обновлении жанра!") 
//       }
//     }
//   }

//   const handleDeleteGenre = async (genreId: number) => {
//     try {
//       await deleteGenre(genreId)
//       toast.success("Жанр успешно удален!") 
//     } catch (error) {
//       toast.error("Ошибка при удалении жанра!") 
//     }
//   }

//   return (
//     <div className="adminProfiles">
//       <h1 style={{ fontSize: 48 }}>Genres</h1>

//       <div className="admin-search">
//         <input
//           className="admin-input"
//           type="text"
//           placeholder="Add new genre"
//           value={newGenre}
//           onChange={(e) => setNewGenre(e.target.value)}
//         />
//         <button onClick={handleAddGenre}>Add Genre</button>
//       </div>

//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan={2}>
//                   <ProgressBar
//                     visible={true}
//                     height="80"
//                     width="80"
//                     borderColor="purple"
//                     barColor="green"
//                     ariaLabel="progress-bar-loading"
//                     wrapperStyle={{}}
//                     wrapperClass=""
//                   />
//                 </td>
//               </tr>
//             ) : error ? (
//               <tr>
//                 <td colSpan={2}>{error}</td>
//               </tr>
//             ) : (
//               genres.map((genre) => (
//                 <tr key={genre.id}>
//                   <td>
//                     {editGenres[genre.id] !== undefined ? (
//                       <input
//                         type="text"
//                         value={editGenres[genre.id]}
//                         onChange={(e) => setEditGenres((prev) => ({
//                           ...prev,
//                           [genre.id]: e.target.value
//                         }))}
//                       />
//                     ) : (
//                       genre.name
//                     )}
//                   </td>
//                   <td className="actions">
//                     {editGenres[genre.id] !== undefined ? (
//                       <button onClick={() => SaveGenre(genre.id)}>Save</button>
//                     ) : (
//                       <button onClick={() => setEditGenres((prev) => ({
//                         ...prev,
//                         [genre.id]: genre.name
//                       }))}>
//                         Edit
//                       </button>
//                     )}
//                     <button onClick={() => handleDeleteGenre(genre.id)}>🗑️</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   )
// }

import { useState, useEffect } from "react";
import { useGenre } from "../../hooks/useGenre";
import "./AdminGenres.css";
import { ProgressBar } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { AdminSearch } from "../AdminSearch/AdminSearch"; // Импортируем компонент поиска

const genreSchema = yup.object().shape({
  name: yup.string().required("Название жанра обязательно").min(3, "Название должно содержать минимум 3 символа"),
});

export function AdminGenres() {
  const { genres, addGenre, deleteGenre, updateGenre, isLoading, error } = useGenre();
  const [newGenre, setNewGenre] = useState("");
  const [editGenres, setEditGenres] = useState<Record<number, string>>({});
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(genres);


  useEffect(() => {
    setSearchResults(genres);
  }, [genres]);


  const handleSearchChange = (value: string) => {
    setSearchValue(value);


    const filteredResults = genres.filter((genre) =>
      genre.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filteredResults);
  };


  const handleSearchClick = () => {
    console.log("Search icon clicked!");
  };


  const handleAddGenre = async () => {
    try {
      await genreSchema.validate({ name: newGenre });
      await addGenre(newGenre);
      setNewGenre("");
      toast.success("Жанр успешно добавлен!");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        toast.error(err.errors[0]);
      } else {
        toast.error("Ошибка при добавлении жанра!");
      }
    }
  };


  async function SaveGenre(genreId: number) {
    const newName = editGenres[genreId]?.trim();
    if (!newName) {
      toast.error("Название жанра не может быть пустым!");
      return;
    }

    try {
      await genreSchema.validate({ name: newName });
      await updateGenre(genreId, newName);
      setEditGenres((prev) => {
        const newEditGenres = { ...prev };
        delete newEditGenres[genreId];
        return newEditGenres;
      });
      toast.success("Жанр успешно обновлен!");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        toast.error(err.errors[0]);
      } else {
        toast.error("Ошибка при обновлении жанра!");
      }
    }
  }


  const handleDeleteGenre = async (genreId: number) => {
    try {
      await deleteGenre(genreId);
      toast.success("Жанр успешно удален!");
    } catch (error) {
      toast.error("Ошибка при удалении жанра!");
    }
  };

  return (
    <div className="adminProfiles">
      <h1 style={{ fontSize: 48 }}>Genres</h1>


      <AdminSearch
        placeholder="Search by genre name"
        onChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        className="custom-search-class"
        inputClassName="custom-input-class"
        iconSrc="/static/img/Frame.svg"
        place="custom-search-place"
      />


      <div className="admin-search">
        <input
          className="admin-input"
          type="text"
          placeholder="Add new genre"
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
        />
        <button onClick={handleAddGenre}>Add Genre</button>
      </div>


      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={2}>
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
                <td colSpan={2}>{error}</td>
              </tr>
            ) : searchResults.length > 0 ? (
              searchResults.map((genre) => (
                <tr key={genre.id}>
                  <td>
                    {editGenres[genre.id] !== undefined ? (
                      <input
                        type="text"
                        value={editGenres[genre.id]}
                        onChange={(e) => setEditGenres((prev) => ({
                          ...prev,
                          [genre.id]: e.target.value
                        }))}
                      />
                    ) : (
                      genre.name
                    )}
                  </td>
                  <td className="actions">
                    {editGenres[genre.id] !== undefined ? (
                      <button onClick={() => SaveGenre(genre.id)}>Save</button>
                    ) : (
                      <button onClick={() => setEditGenres((prev) => ({
                        ...prev,
                        [genre.id]: genre.name
                      }))}>
                        Edit
                      </button>
                    )}
                    <button onClick={() => handleDeleteGenre(genre.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}