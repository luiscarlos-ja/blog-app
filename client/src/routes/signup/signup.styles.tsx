import styled from "styled-components";
import { NavLink as BaseNavLink } from "react-router-dom";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SignUpInput = styled.input`
  padding: 0.5rem;
`;

export const SignUpButton = styled.button`
  padding: 0.5rem;
  font-size: 16px;
`;

export const SignUpError = styled.p`
  color: red;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

export const SignUpLoading = styled.p`
  color: blue;
`;

export const SignUpTitle = styled.h1`
  text-align: center;
`;

export const SignUpSuccess = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SignUpLink = styled(BaseNavLink)`
  text-align: center;
`;

export const SignUpLinkText = styled.p`
  text-align: center;
`;
