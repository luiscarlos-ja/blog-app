import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/navigation.components";
import Posts from "./routes/posts/posts.component";
import { PostsProvider } from "./context/posts.context";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route
          index={true}
          element={
            <PostsProvider>
              <Posts />
            </PostsProvider>
          }
        />
        <Route path="signIn" element={<h1>SignIn</h1>} />
      </Route>
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}

export default App;
