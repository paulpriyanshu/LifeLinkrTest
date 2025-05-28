import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("https://life.coryfi.com/session", {
          method: "GET",
          credentials: "include", // ✅ important for sending the auth-token
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        console.log("User data:", data);

        if (data.user) {
          setUser(data.user.username);
        }
      } catch (err) {
        console.error("Failed to fetch session:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>You are not logged in.</div>;

  return <div>Welcome, {user}!</div>;
}