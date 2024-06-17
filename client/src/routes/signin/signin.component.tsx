import { useState } from "react";
import { GLOBAL } from "../../consts";

export default function SignIn() {
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
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 422) {
            const responseError = await response.json();
            const errorMessages = JSON.parse(responseError.message);
            setError(errorMessages.fieldErrors);
          }
        }
      })
      .finally(() => {
        setLoading(false);
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
          {error.username.map((err) => (
            <span>{err}</span>
          ))}
        </p>
      )}
      {error.password && (
        <p>
          {error.password.map((err) => (
            <span>{err}</span>
          ))}
        </p>
      )}
    </div>
  );
}
