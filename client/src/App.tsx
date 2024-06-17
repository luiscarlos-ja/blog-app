import { Route, Routes } from "react-router-dom";
import Navigation from "./components/navigation/navigation.components";
import Posts from "./routes/posts/posts.component";
import { PostsProvider } from "./context/posts.context";
import SignUp from "./routes/signup/signup.component";
import SignIn from "./routes/signin/signin.component";
import PrivateRoute from "./utils/private-routes.utils";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Navigation />}>
          <Route
            index={true}
            element={
              <PostsProvider>
                <Posts />
              </PostsProvider>
            }
          />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}

export default App;
