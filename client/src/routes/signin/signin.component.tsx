import { useState } from "react";
import { GLOBAL } from "../../consts";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";
import {
  SignInButton,
  SignInContainer,
  SignInError,
  SignInForm,
  SignInInput,
  SignInLoading,
  SignInTitle,
} from "./signin.styles";

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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SignInContainer>
      <SignInTitle>Welcome</SignInTitle>
      {loading && <SignInLoading>Loading...</SignInLoading>}
      <SignInForm onSubmit={handleSubmit}>
        <SignInInput type="text" name="username" placeholder="Username" />
        <SignInInput type="password" name="password" placeholder="Password" />
        <SignInButton type="submit">Sign In</SignInButton>
      </SignInForm>
      {error.username && (
        <SignInError>
          {error.username.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </SignInError>
      )}
      {error.password && (
        <SignInError>
          {error.password.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </SignInError>
      )}
    </SignInContainer>
  );
}
