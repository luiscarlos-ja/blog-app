import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";
import { useState } from "react";
import { GLOBAL } from "../../consts";
import {
  NavigationAuthContainer,
  NavigationButton,
  NavigationContainer,
  NavigationLink,
  NavigationList,
  NavigationListItem,
  NavigationLoading,
  NavigatorLoggedContainer,
  NavigatorSubContainer,
} from "./navigation.styles";

export default function Navigation() {
  const { authUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    setIsLoading(true);
    await fetch(`${GLOBAL.API_URL}/auth/signout`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        signOut();
        navigate("/signIn");
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error signing out", error);
      });
  };

  return (
    <>
      <NavigationContainer>
        <NavigationList>
          {isLoading && <NavigationLoading>Loading...</NavigationLoading>}
          {authUser ? (
            <NavigatorLoggedContainer>
              <NavigatorSubContainer>
                <NavigationListItem>
                  <h5>@{authUser.username}</h5>
                </NavigationListItem>
                <NavigationListItem>
                  <NavigationButton onClick={handleLogOut}>
                    Logout
                  </NavigationButton>
                </NavigationListItem>
              </NavigatorSubContainer>
            </NavigatorLoggedContainer>
          ) : (
            <NavigationAuthContainer>
              <NavigationListItem>
                <NavigationLink to="/signIn">SigIn</NavigationLink>
              </NavigationListItem>
              <NavigationListItem>
                <NavigationLink to="/signUp">SignUp</NavigationLink>
              </NavigationListItem>
            </NavigationAuthContainer>
          )}
        </NavigationList>
      </NavigationContainer>
      <Outlet />
    </>
  );
}
