import { useState } from "react";
import { GLOBAL } from "../../consts";
import {
  SignUpContainer,
  SignUpLoading,
  SignUpTitle,
  SignUpError,
  SignUpForm,
  SignUpInput,
  SignUpButton,
  SignUpSuccess,
  SignUpLink,
  SignUpLinkText,
} from "./signup.styles";

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
    <SignUpContainer>
      <SignUpTitle>Sign Up</SignUpTitle>
      {loading && <SignUpLoading>Loading...</SignUpLoading>}
      {success ? (
        <SignUpSuccess>
          <SignUpLinkText>Success! You are now signed up.</SignUpLinkText>
          <SignUpLink to="/">Go to Sing In</SignUpLink>
        </SignUpSuccess>
      ) : (
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpInput type="text" name="username" placeholder="Username" />
          <SignUpInput type="password" name="password" placeholder="Password" />
          <SignUpInput
            type="password"
            name="passwordConfirm"
            placeholder="Password Confirm"
          />
          <SignUpButton type="submit">Sign Up</SignUpButton>
        </SignUpForm>
      )}
      {error.username && (
        <SignUpError>
          {error.username.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </SignUpError>
      )}
      {}
      {error && error.password && (
        <SignUpError>
          {error.password.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </SignUpError>
      )}
      {error && error.passwordConfirm && (
        <SignUpError>
          {error.passwordConfirm.map((err, idx) => (
            <span key={idx}>{err}</span>
          ))}
        </SignUpError>
      )}
    </SignUpContainer>
  );
}
