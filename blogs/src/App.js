import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './ui/HomePage';
import Login from './ui/Login';
import Logout from './ui/Logout';
import DetailBlog from './ui/DetailBlog';
import ListAccount from './component/admin/ListAccount';
import AddBlog from './component/admin/AddBlog';
import Favorite from './ui/Favorite';
import FindBlogByTopic from './ui/FindBlogByTopic';
import ManageBlog from './component/admin/ManageBlog';
import EditBlog from './component/admin/EditBlog';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={""} element={<HomePage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/logout"} element={<Logout />} />
          <Route path={"/detail/:id"} element={<DetailBlog />} />
          <Route path={"/list/blog"} element={<ListAccount />} />
          <Route path={"/add/blog"} element={<AddBlog />} />
          <Route path={"/favorite"} element={<Favorite />} />
          <Route path={"/findBlogByTopic"} element={<FindBlogByTopic />} />
          <Route path={"/manageBlog"} element={<ManageBlog />} />
          <Route path={"/editBlog/:id"} element={<EditBlog/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
