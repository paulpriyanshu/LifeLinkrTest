import { useEffect, useState } from "react";

export function useSession() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("https://life.coryfi.com/session", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log("data of user",data)
        if (data.user) setUser(data.user.username);
      } catch (err) {
        console.error("Error fetching session:", err);
      } finally {
        setLoading(false); // 👈
      }
    };

    fetchSession();
  }, []);

  return { user, loading };
}