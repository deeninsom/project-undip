import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/counter/authSlice";
const logo = new URL("/src/assets/img/undip.png", import.meta.url);
import("../../App.css");

const Login = () => {
  const [noInduk, setNoInduk] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message, } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
      // window.location.reload();
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ noInduk, password }));
  };
  return (
    <>
      <div className="container-scroller" >
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="card-login auth-form-light text-left   py-5 px-4 px-sm-5">
                  <div className="brand ">
                    <img src={logo} alt="logo" className="logo-login align-items-center" />
                  </div>

                  <h4 className="text-center">Universitas Diponegoro</h4>
                  {isError && (
                    <div class="alert alert-danger text-center" role="alert">
                      {message}
                    </div>
                  )}
                  <form className="pt-3" onSubmit={Auth}>
                    <div className="mb-3">
                      <label  className="form-label">
                        Nim / Nip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={noInduk}
                        onChange={(e) => setNoInduk(e.target.value)}
                      />
                    </div>
                    <label className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="inputPassword5"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-describedby="passwordHelpBlock"
                    />

                    <div className="mt-3">
                      <button type="submit" className="btn-login">
                        {isLoading ?  <i class="fa fa-spinner fa-spin"></i> : "login"}
                      </button>
                    </div>
                  </form>
                  <p className="text-warning">
                    * Jika belum memiliki akun silahkan hubungi admin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
