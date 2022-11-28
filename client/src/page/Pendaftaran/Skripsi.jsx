import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout/Layout";
import { getMe } from "../../features/counter/authSlice";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Skripsi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const [status, setStatus]= useState("");
  const [tgl, setTanggal] = useState("");
  const [dospem, setDospem] = useState("");
  const [file, setFile] = useState();

  const loadFile = (e)=>{
    console.log(e.target.files)
    setFile(e.target.files[0])
  }

  const saveIrs = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status_skripsi", status);
    formData.append("tgl_sidang", tgl);
    formData.append("dospem", dospem);
    formData.append("file", file);
    try {
      await axios.post(" http://localhost:5000/api/v1/berkas/skripsi", formData);
      navigate("/entryskripsi");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
      <div className="row">
        <div className="row flex-grow">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title ">Enty Khs</h4>
                <form className="forms-sample " onSubmit={saveIrs}>
                  <div className="form-group">
                    <label for="exampleSelectGender">Semester</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option selected>--Pilih Status--</option>
                      <option value="Belum Ambil">Belum Ambil</option>
                      <option value="Ambil">Ambil</option>
                    </select>
                  </div>
                  <div className="form-group ">
                    <label for="exampleInputName1">Tanggal Sidang / Lulus</label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleInputName1"
                      value={tgl}
                      onChange={(e) => setTanggal(e.target.value)}
                    />
                  </div>
                  <div className="form-group ">
                    <label for="exampleInputName1">Dosen Pembimbing</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      value={dospem}
                      onChange={(e) => setDospem(e.target.value)}
                    />
                  </div>
               
                  <div className="form-group ">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Berita Acara Sidang Skripsi</Form.Label>
                      <Form.Control type="file"  onChange={loadFile}/>
                    </Form.Group>
                  </div>
                  <button type="submit" className="btn-search btn-primary me-2">
                    Simpan
                  </button>
                  <button className="btn-search btn-warning">Batal</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
 

    </Layout>
  );
};

export default Skripsi;
