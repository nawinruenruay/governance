import "./App.css";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import LayoutManage from "./Layout/LayoutManage";
import LayoutAdmin from "./Layout/LayoutAdmin";

import Home from "./Page/Home";

import Complaint from "./Page/Complaint";
import General from "./Page/Genaral";
import Ethics from "./Page/Ethics";
import Progress from "./Page/Progress";
import Success from "./Page/Success";
import Dontaccept from "./Page/Dontaccept";

import NotFound from "./Page/Notfound";
import Login from "./Page/Login";
import Manageadmin from "./Page/Manageadmin";

const ProtectRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/complaint/loginadmin";
  } else {
    axios
      .post("http://localhost:7777/authen", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log("Token is valid:", response.data);
      })
      .catch((error) => {
        window.location.href = "/complaint/loginadmin";
      });
  }
  return element;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<LayoutManage />}>
          <Route path="/" element={<ProtectRoute element={<Complaint />} />} />
          <Route
            path="/complaint/home"
            element={<ProtectRoute element={<Complaint />} />}
          />
          <Route
            path="/complaint/general"
            element={<ProtectRoute element={<General />} />}
          />
          <Route
            path="/complaint/ethics"
            element={<ProtectRoute element={<Ethics />} />}
          />
          <Route
            path="/complaint/progress"
            element={<ProtectRoute element={<Progress />} />}
          />
          <Route
            path="/complaint/success"
            element={<ProtectRoute element={<Success />} />}
          />
          <Route
            path="/complaint/dontaccept"
            element={<ProtectRoute element={<Dontaccept />} />}
          />
        </Route>
        <Route path="/" element={<LayoutAdmin />}>
          <Route
            path="/complaint/manageadmin"
            element={<ProtectRoute element={<Manageadmin />} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/complaint/loginadmin" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
