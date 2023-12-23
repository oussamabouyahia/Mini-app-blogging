import { Route, Routes, BrowserRouter, Link } from "react-router-dom";

import "./App.css";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Listposts from "./Components/Listposts";
import { CreatePost } from "./Components/CreatePost";

function App() {
  return (
    <>
      <h1>BLOGGING APP</h1>

      <BrowserRouter>
        <div className="linkBloc">
          <Link className="link" to="/posts">
            Posts
          </Link>
          <Link className="link" to="createpost">
            Create Post
          </Link>
          <Link className="link" to="/">
            Register
          </Link>
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Listposts />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
