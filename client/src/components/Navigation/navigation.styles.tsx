import styled from "styled-components";
import { NavLink as BaseNavLink } from "react-router-dom";

export const NavigationContainer = styled.nav`
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  height: 32px;
`;

export const NavigationAuthContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: end;
  margin-right: 24px;
  height: 32px;
`;

export const NavigatorLoggedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 32px;
  margin-right: 24px;
  margin-left: 24px;
`;

export const NavigatorSubContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: end;
`;

export const NavigationList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  height: 32px;
`;

export const NavigationListItem = styled.li`
  list-style: none;
`;

export const NavigationLink = styled(BaseNavLink)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const NavigationButton = styled.button`
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const NavigationLoading = styled.p`
  color: blue;
`;
