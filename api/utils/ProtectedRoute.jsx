import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("https://life.coryfi.com/session", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
          // Not authenticated → redirect
          window.location.href = "/login";
          return;
        }

        const data = await res.json();
        if (data.user) {
          setUser(data.user.username);
        } else {
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Session error:", err.message);
        window.location.href = "/login"; // Fallback
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <div>Welcome, {user}!</div>;
}