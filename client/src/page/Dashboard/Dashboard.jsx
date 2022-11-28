import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import { getMe } from "../../features/counter/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe(localStorage));
  }, [ dispatch]);



  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
       {user && user.data.role === "dosen"&& (
        <div>
          <div className="d-sm-flex align-items-center justify-content-between border-bottom">
            <ul className="nav nav-tabs" role="tablist"></ul>
          </div>
          <div className="row">
            <div class="col-sm-3 mt-4">
              <a className="card-dashboard" href="/dashboard">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Home</h4>
                    <div class="media">
                      <i class="ti-world icon-md text-info d-flex align-self-start me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/walisiswa">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Akademik</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-school icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/walisiswa">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Mahasiswa Perwalian</h4>
                    <div class="media">
                      <i class="ti-world icon-md text-info d-flex align-self-end me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/setting">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Profile</h4>
                    <div class="media">
                      <i class="ti-world icon-md text-info d-flex align-self-end me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
      {user && user.data.role === "admin"&& (
        <div>
          <div className="d-sm-flex align-items-center justify-content-between border-bottom">
            <ul className="nav nav-tabs" role="tablist"></ul>
          </div>
          <div className="row">
            <div class="col-sm-3 mt-4">
              <a className="card-dashboard" href="/dashboard">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Home</h4>
                    <div class="media">
                    <i class="fas fa-solid fa-house icon-md text-info d-flex align-self-start me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/datamahasiswa">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Rekap Mahasiswa</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/datapkl">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Rekap Progress Pkl</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/dataskripsi">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Rekap Progres Skripsi</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/mahasiswa">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Data Mahasiswa</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/dosen">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Data Dosen</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/admin">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Data Admin</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/setting">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Profile</h4>
                    <div class="media">
                    <i class="fas fa-solid fa-user icon-md text-info d-flex align-self-end me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
        {user && user.data.role === "mahasiswa"&& (
        <div>
          <div className="d-sm-flex align-items-center justify-content-between border-bottom">
            <ul className="nav nav-tabs" role="tablist"></ul>
          </div>
          <div className="row">
            <div class="col-sm-3 mt-4">
              <a className="card-dashboard" href="/dashboard">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Home</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-house icon-md text-info d-flex align-self-start me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/entrykhs">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Khs</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/entrypkl">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Pkl</h4>
                    <div class="media">
                    <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/entryskripsi">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Skripsi</h4>
                    <div class="media">
                    <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/entryirs">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Irs</h4>
                    <div class="media">
                    <i class="fas fa-solid fa-table icon-md text-info d-flex align-self-center me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div class="col-sm-3  mt-4">
              <a className="card-dashboard" href="/setting">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Profile</h4>
                    <div class="media">
                      <i class="fas fa-solid fa-user icon-md text-info d-flex align-self-end me-3"></i>
                      <div class="media-body"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
