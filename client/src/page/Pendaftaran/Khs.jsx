import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout/Layout";
import { getMe } from "../../features/counter/authSlice";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Khs = () => {
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

  const [semester, setSemester] = useState("");
  const [ip_semester, setIp_Semester] = useState("");
  const [ip_Kumulatif, setIp_Kumulatif] = useState("");
  const [sks, setSks] = useState("");
  const [file, setFile] = useState();

  const loadFile = (e)=>{
    console.log(e.target.files)
    setFile(e.target.files[0])
  }

  const saveKrs = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("semester", semester);
    formData.append("ip_semester", ip_semester);
    formData.append("ip_kumulatif", ip_Kumulatif);
    formData.append("jumlah_sks", sks);
    formData.append("file", file);
    try {
      await axios.post(" http://localhost:5000/api/v1/berkas/khs", formData);
      navigate("/entrykhs");
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
                <form className="forms-sample " onSubmit={saveKrs}>
                  <div className="form-group">
                    <label for="exampleSelectGender">Semester</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                    >
                      <option selected>Pilih Semester</option>
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                      <option value="Semester 7">Semester 7</option>
                      <option value="Semester 8">Semester 8</option>
                      <option value="Semester 9">Semester 9</option>
                      <option value="Semester 10">Semester 10</option>
                      <option value="Semester 11">Semester 11</option>
                      <option value="Semester 12">Semester 12</option>
                      <option value="Semester 13">Semester 13</option>
                      <option value="Semester 14">Semester 14</option>
                    </select>
                  </div>
                  <div className="form-group ">
                    <label for="exampleInputName1">Ip Semester</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      value={ip_semester}
                      onChange={(e) => setIp_Semester(e.target.value)}
                    />
                  </div>
                  <div className="form-group ">
                    <label for="exampleInputName1">Ip Kumulatif</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      value={ip_Kumulatif}
                      onChange={(e) => setIp_Kumulatif(e.target.value)}
                    />
                  </div>
                  <div className="form-group ">
                    <label for="exampleInputName1">Sks Terambil</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      value={sks}
                      onChange={(e) => setSks(e.target.value)}
                    />
                  </div>
                  <div className="form-group ">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Default file input example</Form.Label>
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

export default Khs;
