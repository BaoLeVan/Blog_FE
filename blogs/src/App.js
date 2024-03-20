import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './ui/HomePage';
import Login from './ui/Login';
import Logout from './ui/Logout';
import DetailBlog from './ui/DetailBlog';
import ListAccount from './component/admin/ListAccount';
import AddBlog from './component/admin/AddBlog';


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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
