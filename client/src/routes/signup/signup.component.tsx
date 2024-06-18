import { useState } from "react";
import { GLOBAL } from "../../consts";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [error, setError] = useState({
    username: [],
    password: [],
    passwordConfirm: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setError({
      username: [],
      password: [],
      passwordConfirm: [],
    });
    setLoading(true);
    await fetch(`${GLOBAL.API_URL}/auth/signup`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.statusCode) {
          if (response.statusCode === 422) {
            const errorMessages = JSON.parse(response.message);
            setError(errorMessages.fieldErrors);
          }
        } else {
          setSuccess(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {loading && <p>Loading...</p>}
      {success ? (
        <div>
          <p>Success! You are now signed up.</p>
          <Link to="/">Go to Sing In</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Password Confirm"
          />
          <button type="submit">Sign Up</button>
        </form>
      )}
      {error.username && (
        <p>
          {error.username.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </p>
      )}
      {}
      {error && error.password && (
        <p>
          {error.password.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </p>
      )}
      {error && error.passwordConfirm && (
        <p>
          {error.passwordConfirm.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </p>
      )}
    </div>
  );
}
