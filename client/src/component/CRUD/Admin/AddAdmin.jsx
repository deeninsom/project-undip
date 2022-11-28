import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AddAdmin = ({ isUpdate, datas }) => {
  // Start Modal bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [namaMahasiswa, setnamaMahasiswa] = useState();
  const [noInduk, setNoInduk] = useState("");

  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [kode_departement, setKode_departement] = useState("");
  const [msg, setMsg] = useState();



  //update handling by:id
  const getAdmin = async () => {
    const formData = new FormData();
    formData.append("nama", namaMahasiswa);
    formData.append("noInduk", noInduk);
    formData.append("kode_departement", kode_departement);
    formData.append("password", password);
    formData.append("role", role);

    try {
      await axios.post(
        ` http://localhost:5000/api/v1/admin`,formData
      );
      reloadPage()
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const handleShow = (e) => {
    e.preventDefault();
    getAdmin()
    setShow(false);

  };

    const reloadPage = ()=>{
      window.location.reload()
    }

  return (
    <div>
      {" "}
      <div className="add-mahasiswa ">
        <button
          type="button"
          className="btn-add btn-primary "
          onClick={setShow}
        >
          Tambah 
        </button>
        </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="label ">* Update Data Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleShow}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan Nama"
                    value={namaMahasiswa}
                    onChange={(e) => setnamaMahasiswa(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} >
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
                <Form.Group as={Col}>
                  <Form.Label>Role</Form.Label>
                    <select
                    class="form-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    >
                      <option>Pilih Role ...</option>
                      <option value="admin">Admin</option>
                      {/* <option value="Tidak Aktif">Tidak Aktif</option> */}
                    </select>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} >
                  <Form.Label>Kode Departement</Form.Label>
                    <select
                    class="form-select"
                    value={kode_departement}
                    onChange={(e) => setKode_departement(e.target.value)}
                    >
                      <option>Departement ...</option>
                      <option value="S1-Informatika-">S1-Informatika</option>
                    </select>
                </Form.Group>
              </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <div class="text-center text-danger ">{msg}</div>
          <div className="d-flex gap-3">
            <Button variant="primary" type="submit" onClick={handleShow}>
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
          </div>
  );
};

export default AddAdmin;
