import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AddMahasiswa = ({ isLoad }) => {
  const [show, setShow] = useState(false);
 const handleShow = ()=> setShow(true)
  const handleClose = () => setShow(false);
  const handleLoad = (e) => {
    e.preventDefault();
    tambahMahasiswa();
    setShow(false);
    reloadPage();
  };

  const reloadPage = () => {
    window.location.reload();
  };


  //Start Component addMahasiswa
  const [namaMahasiswa, setnamaMahasiswa] = useState();
  const [noInduk, setNoInduk] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [file, setFile] = useState("");
  const [msg, setMsg] = useState();
  const loadFile = (e)=>{
    setFile(e.target.files[0])
  }

  const tambahMahasiswa = async () => {
    const formData = new FormData();
    formData.append("nama", namaMahasiswa);
    formData.append("noInduk", noInduk);
    formData.append("angkatan", angkatan);
    formData.append("password", password);
    formData.append("status", status);
    formData.append("role", role);
    formData.append("file", file);
    try {
      await axios.post(" http://localhost:5000/api/v1/mahasiswa", formData);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  //End Component addMahasiswa

  return (
    <div>
      <div className="add-mahasiswa ">
        <button
          type="button"
          className="btn-add btn-primary "
          onClick={handleShow}
        >
          Tambah 
        </button>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="label ">
              * Tambah Data Mahasiswa
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleLoad}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan Nama"
                    value={namaMahasiswa}
                    onChange={(e) => setnamaMahasiswa(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>No Induk</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan Nim"
                    value={noInduk}
                    onChange={(e) => setNoInduk(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Status</Form.Label>
                    <select
                    class="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>Pilih Status ...</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Role</Form.Label>
                    <select
                    class="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    >
                      <option>Pilih Role ...</option>
                      <option value="mahasiswa">mahasiswa</option>
                      {/* <option value="Tidak Aktif">Tidak Aktif</option> */}
                    </select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Angkatan</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukan Angkatan"
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukan Alamat"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div class="form-group ">
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control type="file"  onChange={loadFile}/>
                    </Form.Group>
                  </div>
              {/* <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group> */}

              {/* <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" placeholder="Masukan Role"   value={role}
                    onChange={(e) => setRole(e.target.value)}/>
              </Form.Group> */}

              {/* <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Role</Form.Label>
                    <select
                    class="form-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option>Pilih Role ...</option>
                      <option value="mahasiswa">Mahasiswa</option>
                      <option value="dosen">Dosen</option>
                      <option value="admin">Admin</option>
                    </select>
                </Form.Group>
              </Row> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div class="text-center text-danger ">{msg}</div>
            <div className="d-flex gap-3">
              <Button variant="primary" type="submit" onClick={handleLoad}>
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddMahasiswa;
