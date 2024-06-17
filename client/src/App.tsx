import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.components";
import Posts from "./routes/posts/posts.component";
import { PostsProvider } from "./context/posts.context";
import SignUp from "./routes/signup/signup.component";
import SignIn from "./routes/signin/signin.component";
import PrivateRoute from "./utils/private-routes.utils";
import useAuth from "./hooks/useAuth.hook";

function App() {
  const { authUser, signOut } = useAuth();

  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    const newArgs = args;
    newArgs[1] = {
      ...newArgs[1],
      credentials: "include",
      mode: "cors",
    };
    const response = await originalFetch(...newArgs);

    if (response.status === 401) {
      signOut();
    }
    return response;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route element={<PrivateRoute />}>
          <Route
            index={true}
            element={
              <PostsProvider>
                <Posts />
              </PostsProvider>
            }
          />
        </Route>
        {!authUser && (
          <>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
          </>
        )}
      </Route>
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}

export default App;
