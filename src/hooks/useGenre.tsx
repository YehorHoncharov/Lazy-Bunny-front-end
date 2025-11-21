import { useState, useEffect } from "react";
import { IGenre } from "./types";

export function useGenre() {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGenres() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/genres");
        const genresData = await response.json();
        setGenres(genresData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGenres();
  }, []);

  async function addGenre(name: string) {
    try {
      const response = await fetch("http://localhost:3000/genres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const newGenre = await response.json();
      setGenres((prev) => [...prev, newGenre]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error(error);
    }
  }

  async function updateGenre(id: number, name: string) {
    try {
      const updatedGenre = {
        id,
        name,
      };
      const response = await fetch(`http://localhost:3000/genres/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGenre),
      });

      const data = await response.json();
      console.log("User updated:", data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error(error);
    }
  }

  async function deleteGenre(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/genres/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log("Genre updated:", data);

      setGenres((prev) => prev.filter((genre) => genre.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error(error);
    }
  }

  return {
    genres,
    isLoading,
    error,
    addGenre,
    updateGenre,
    deleteGenre,
  };
}
