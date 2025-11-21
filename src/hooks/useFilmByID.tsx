import { useState, useEffect } from "react";
import { IFilm } from "./types";

export function useFilmByID(id: number) {
  const [film, setFilm] = useState<IFilm>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  // const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    async function getFilm() {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/movies/${id}`);
        const film = await response.json();

        setFilm(film);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getFilm();
  }, [id]);

  return { film: film, isLoading: isLoading, error: error };
}
