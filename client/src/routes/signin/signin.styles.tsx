import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SignInInput = styled.input`
  padding: 0.5rem;
`;

export const SignInButton = styled.button`
  padding: 0.5rem;
  font-size: 16px;
`;

export const SignInError = styled.p`
  color: red;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

export const SignInLoading = styled.p`
  color: blue;
`;

export const SignInTitle = styled.h1`
  text-align: center;
`;
