import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "../../features/counter/authSlice";
const logo = new URL("/src/assets/img/undip.png", import.meta.url);
// import ('../../App.css')
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="container-scroller">
      {/* partial:partials/_navbar.html */}
      <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <div className="me-3">
            <button
              className="navbar-toggler navbar-toggler align-self-center"
              type="button"
              data-bs-toggle="minimize"
            >
              <span className="icon-menu" />
            </button>
          </div>
          <div>
            <a className="navbar-brand brand-logo" href="/page/admin/dashboard">
              <h3 className="navbar-brand my-2">UNDIP</h3>
            </a>
            <a className="navbar-brand brand-logo-mini" href="/dashboard">
              <img src={logo} width={300} alt="logo" />
            </a>
          </div>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-top">
          <ul className="navbar-nav">
            <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
              <h1 className="welcome-text">
                Welcome,{" "}
                <span className="text-black fw-bold text-uppercase">
                  {user && user.data.nama}
                </span>
              </h1>
              <div className="row">
                {/* <img src={logo} alt="logo" width={20}/> */}
                <h2 className="mt-2 text-uppercase">Universitas Diponegoro</h2>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <p className="mx-2 mt-4 ">logout </p>
            <i
              className="fas fa-sign-out mt-3 me-2 nav-link-icon"
              onClick={logout}
            ></i>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-bs-toggle="offcanvas"
          >
            <span className="mdi mdi-menu" />
          </button>
        </div>
      </nav>
      {/* partial */}
      <div className="container-fluid page-body-wrapper">
        {/* partial:partials/_settings-panel.html */}
        <div className="theme-setting-wrapper"></div>
        <div id="right-sidebar" className="settings-panel">
          <i className="settings-close ti-close" />
          <ul
            className="nav nav-tabs border-top"
            id="setting-panel"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="todo-tab"
                data-bs-toggle="tab"
                href="#todo-section"
                role="tab"
                aria-controls="todo-section"
                aria-expanded="true"
              >
                TO DO LIST
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="chats-tab"
                data-bs-toggle="tab"
                href="#chats-section"
                role="tab"
                aria-controls="chats-section"
              >
                CHATS
              </a>
            </li>
          </ul>
        </div>

        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li class="nav-item">
              <a class="nav-link" href="/dashboard">
                <i class="mdi mdi-grid-large menu-icon"></i>
                <span class="menu-title">Dashboard</span>
              </a>
            </li>
            {user && user.data.role === "mahasiswa" && (
              <>
                <li class="nav-item nav-category">Form Pendaftar</li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-bs-toggle="collapse"
                    href="#ui-basic"
                    aria-expanded="false"
                    aria-controls="ui-basic"
                  >
                    <i class="menu-icon mdi mdi-floor-plan"></i>
                    <span class="menu-title">Pendaftaran</span>
                    <i class="menu-arrow"></i>
                  </a>
                  <div class="collapse" id="ui-basic">
                    <ul class="nav flex-column sub-menu">
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/entrykhs">
                          Khs
                        </a>
                      </li>
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/entryirs">
                          Irs
                        </a>
                      </li>
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/entrypkl">
                          Pkl
                        </a>
                      </li>
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/entryskripsi">
                          Skripsi
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}
            \
            {user && user.data.role === "admin" && (
              <>
                <li class="nav-item nav-category">Rekap Data</li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-bs-toggle="collapse"
                    href="#ui-basic"
                    aria-expanded="false"
                    aria-controls="ui-basic"
                  >
                    <i class="menu-icon mdi mdi-floor-plan"></i>
                    <span class="menu-title">Data</span>
                    <i class="menu-arrow"></i>
                  </a>
                  <div class="collapse" id="ui-basic">
                    <ul class="nav flex-column sub-menu">
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/datamahasiswa">
                          Rekap Mahasiswa
                        </a>
                      </li>
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/datapkl">
                         Rekap Progress Pkl
                        </a>
                      </li>
                      {/* <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/entrypkl">
                          Pkl
                        </a>
                      </li> */}
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/dataskripsi">
                          Rekap Progres Skripsi
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="nav-item nav-category">Data User</li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-bs-toggle="collapse"
                    href="#form-elements"
                    aria-expanded="false"
                    aria-controls="form-elements"
                  >
                    <i class="menu-icon mdi mdi-card-text-outline"></i>
                    <span class="menu-title">Data</span>
                    <i class="menu-arrow"></i>
                  </a>

                  <div class="collapse" id="form-elements">
                    <ul class="nav flex-column sub-menu">
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/mahasiswa">
                          Mahasiswa
                        </a>
                      </li>
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/dosen">
                          Dosen
                        </a>
                      </li>
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/admin">
                          Admin
                        </a>
                      </li>

                    </ul>
                  </div>
                </li>
              </>
            )}
              {user && user.data.role === "dosen" && (
              <>
                <li class="nav-item nav-category">Mahasiswa</li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-bs-toggle="collapse"
                    href="#ui-basic"
                    aria-expanded="false"
                    aria-controls="ui-basic"
                  >
                    <i class="menu-icon mdi mdi-floor-plan"></i>
                    <span class="menu-title">Data</span>
                    <i class="menu-arrow"></i>
                  </a>
                  <div class="collapse" id="ui-basic">
                    <ul class="nav flex-column sub-menu">
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/walisiswa">
                          Mahasiswa Perwalian
                        </a>
                      </li>
                      <li class="nav-item">
                        {" "}
                        <a class="nav-link" href="/nilaipkl">
                         Penilaian Pkl
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )}
            <li class="nav-item nav-category">User Setting</li>
            <li class="nav-item">
              <a class="nav-link" href="/setting">
                <i class="menu-icon fas fa-sharp fa-solid fa-gear"></i>
                <span class="menu-title">Setting</span>
              </a>
            </li>
         
          </ul>
        </nav>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-sm-12">
                <div className="home-tab">
                  <main>{children}</main>
                  <footer className="footer">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                      <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                        Copyright © 2022. Universitas Diponegoro.
                      </span>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
