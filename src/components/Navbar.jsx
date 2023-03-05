import "./Navbar.css";

import { GREEN } from "../helpers/Colors";

//other Component
import { Search } from "./Index";

import { Navigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="container-fluid shadow-lg">
          <div className="row">
            <div className="col-s-12 col-md-6 col-lg-6 my-3  py-2">
              <i class="fas fa-id-badge" style={{ color: GREEN }}></i>
              <span className="navbar-brand" style={{ color: GREEN }}>
                اپلیکیشن مدیریت مخاطبین
              </span>{" "}
            </div>
            <div className="col-s-12 col-md-6 col-lg-6 my-3">
              {" "}
              {location.pathname === "/contacts" ? <Search /> : null}
              {/* <Search search={search} query={query} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
