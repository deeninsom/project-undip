import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { getMe } from "../../../../features/counter/authSlice";
import axios from "axios";
import Layout from "../../../../component/Layout/Layout";
const SetMahasiswa = () => {
  //Start Component addMahasiswa
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);

  const [noTlp, setNoTelp] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [email, setEmail] = useState("");
  const [kota, setKota] = useState("");
  const [alamat, setAlamat] = useState("");

  const reloadPage = () => {
    window.location.reload();
  };
  const saveBiodata = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("no_telp", noTlp);
    formData.append("provinsi", provinsi);
    formData.append("email", email);
    formData.append("kota", kota);
    try {
      await axios.post(" http://localhost:5000/api/v1/biodata", formData);
      reloadPage();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Layout>
       {
        user && user.data.role === "admin" && (
          <div className="row">
          <div class="col-sm-9 ">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Setting</h4>
                <div className="row"></div>
                <div class="col-md-5">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">No.Induk</label>
                    <div class="col-sm-8 ">
                      <input
                        type="text"
                        class="form-control text-muted"
                        disabled
                        value={user && user.data.noInduk}
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Nama</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control text-muted"
                        disabled
                        value={user && user.data.nama}
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Departemen</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control text-muted"
                        value={user && user.data.kode_departement}
                        disabled
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }
      {
        user && user.data.role === "dosen" && (
          <div className="row">
          <div class="col-sm-9 ">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Setting</h4>
                <div className="row"></div>
                <div class="col-md-5">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">No.Induk</label>
                    <div class="col-sm-8 ">
                      <input
                        type="text"
                        class="form-control text-muted"
                        disabled
                        value={user && user.data.noInduk}
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Nama</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control text-muted"
                        disabled
                        value={user && user.data.nama}
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label">Departemen</label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        class="form-control text-muted"
                        value={user && user.data.kode_departement}
                        disabled
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }

      {user && user.data.role === "mahasiswa" && (
        <div className="row">
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <div className="gambar-profile">
                  <img src={user && user.data.url} alt="" srcset="" />
                </div>
                <button
                  className="btn-profile-status fw-bold text-uppercase"
                  disabled
                >
                  {" "}
                  {user && user.data.status}
                </button>
              </div>
            </div>
          </div>
          <div class="col-sm-9 ">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">Setting</h4>
                <div className="row"></div>
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Nim</label>
                    <div class="col-sm-9 ">
                      <input
                        type="text"
                        class="form-control text-muted"
                        disabled
                        value={user && user.data.noInduk}
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Nama</label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control text-muted"
                        disabled
                        value={user && user.data.nama}
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-3 col-form-label">Angkatan</label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        class="form-control text-muted"
                        value={user && user.data.angkatan}
                        disabled
                        aria-label="Disabled input example"
                      />
                    </div>
                  </div>
                </div>
                <form class="form-sample" onSubmit={saveBiodata}>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">
                          No. Telepon
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control "
                            placeholder="Masukan No. Telepon"
                            aria-label="Disabled input example"
                            value={noTlp}
                            onChange={(e) => setNoTelp(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Provinsi</label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            aria-label="Disabled input example"
                            placeholder="Masukan Provinsi"
                            value={provinsi}
                            onChange={(e) => setProvinsi(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                          <input
                            class="form-control"
                            type="email"
                            placeholder="Masukan Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">
                          Kab / Kota
                        </label>
                        <div class="col-sm-9">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Masukan Kab / Kota"
                            value={kota}
                            onChange={(e) => setKota(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label class="col-sm-3 col-form-label">Alamat</label>
                        <div class="col-sm-9">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Masukan Alamat"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div class="form-group ">
                    <Form.Group controlId="formFile" className="col-md-6">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file"  onChange={loadFile}/>
                    </Form.Group>
                  </div> */}
                  </div>
                  <button type="submit" class="btn-search btn-primary me-2">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SetMahasiswa;

// <div className="col-md-6 grid-margin stretch-card">
// <div className="card">
//   <div className="card-body">
//     <h4 className="card-title">Edit data anda</h4>
//     <p className="card-description">{msg}</p>
//     <form className="forms-sample" >
//       <div className="form-group">
//         <label for="exampleInputUsername1">Nama</label>
//         <input
//           type="text"
//           className="form-control"
//           id="exampleInputUsername1"
//           placeholder="Nama"
//           value={namaMahasiswa}
//           onChange={(e) => setnamaMahasiswa(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label for="exampleInputEmail1">Nim</label>
//         <input
//           type="text"
//           className="form-control"
//           id="exampleInputEmail1"
//           placeholder="Nim"
//           value={nim}
//           onChange={(e) => setNim(e.target.value)}
//         />
//       </div>

//        <div className="form-group">
//         <Form.Label>Jurusan</Form.Label>
//         <select
//           class="form-select"
//           value={jurusan}
//           onChange={(e) => setJurusan(e.target.value)}
//         >
//           <option>Pilih Jurusan ...</option>
//           <option value="sistem informasi">Sistem informasi</option>
//         </select>
//       </div>
//       <div className="form-group">
//         <label for="exampleInputPassword1">Angkatan</label>
//         <input
//           type="number"
//           className="form-control"
//           id="exampleInputPassword1"
//           placeholder="Angkatan"
//           value={angkatan}
//           onChange={(e) => setAngkatan(e.target.value)}
//         />
//       </div>
//       <div className="form-group">
//         <label for="exampleInputPassword1">Alamat</label>
//         <input
//           type="text"
//           className="form-control"
//           id="exampleInputPassword1"
//           placeholder="Alamat"
//           value={alamat}
//           onChange={(e) => setAlamat(e.target.value)}
//         />
//       </div>
//       <button type="submit" className="btn btn-primary me-2">
//         Submit
//       </button>
//       <button className="btn btn-light">Cancel</button>
//     </form>
//   </div>
// </div>
// </div>
