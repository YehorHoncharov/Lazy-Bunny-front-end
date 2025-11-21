import { useEffect, useState } from "react";
import { IUser } from "./types";

export function useUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function getUsers() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getUsers();
  }, []);
  return { users: users, isLoading: isLoading, error: error };
}
