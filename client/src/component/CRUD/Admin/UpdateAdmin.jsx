import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const UpdateAdmin = ({ isUpdate, datas }) => {
  // Start Modal bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [namaMahasiswa, setnamaMahasiswa] = useState();
  const [noInduk, setNoInduk] = useState("");

  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [kode_departement, setKode_departement] = useState("");
  const [msg, setMsg] = useState();

  //Get handling by:id
  const getMahasiswaById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin/${datas.id_adm}`
      );
        const data = await response.data.data;
      setnamaMahasiswa(data.nama);
      setNoInduk(data.noInduk);
      setRole(data.role)
      setPassword(data.password)
      setKode_departement(data.kode_departement);
      setShow(true);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  //update handling by:id
  const updateAdmin = async () => {
    const formData = new FormData();
    formData.append("nama", namaMahasiswa);
    formData.append("noInduk", noInduk);
    formData.append("kode_departement", kode_departement);
    formData.append("password", password);
    formData.append("role", role);

    try {
      await axios.put(
        ` http://localhost:5000/api/v1/admin/${datas.id_adm}`,formData
      );
      reloadPage()
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    updateAdmin(datas.id_adm);
    setShow(false);

  };

    const reloadPage = ()=>{
      window.location.reload()
    }

  return (
    <div>
      {" "}
      <i class="fas fa-regular fa-pen" onClick={getMahasiswaById}></i>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="label ">* Update Data Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdate}>
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
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Kode Departement</Form.Label>
                    <select
                    class="form-select"
                    value={kode_departement}
                    onChange={(e) => setKode_departement(e.target.value)}
                    >
                      <option>Departement ...</option>
                      <option value="S1-Informatika-">S1-Informatika</option>
                      {/* <option value="Tidak Aktif">Tidak Aktif</option> */}
                    </select>
                </Form.Group>
              </Row>
        
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
            <Button variant="primary" type="submit" onClick={handleUpdate}>
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

export default UpdateAdmin;
