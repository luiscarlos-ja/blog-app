import { useState } from "react";
import { GLOBAL } from "../../consts";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [error, setError] = useState({
    username: [],
    password: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setError({
      username: [],
      password: [],
    });
    setLoading(true);
    await fetch(`${GLOBAL.API_URL}/auth/signin`, {
      method: "POST",
      body: formData,
      credentials: "include",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode) {
          if (data.statusCode === 422) {
            const errorMessages = JSON.parse(data.message);
            setError(errorMessages.fieldErrors);
          }
        } else {
          signIn(data);
          navigate("/");
        }
      });
  };

  return (
    <div>
      <h1>Sign In</h1>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
      {error.username && (
        <p>
          {error.username.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </p>
      )}
      {error.password && (
        <p>
          {error.password.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </p>
      )}
    </div>
  );
}
