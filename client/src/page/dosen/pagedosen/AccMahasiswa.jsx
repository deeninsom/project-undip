import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AccMahasiswa = ({ isUpdate, datas }) => {
  // Start Modal bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [namaMahasiswa, setnamaMahasiswa] = useState();
  const [noInduk, setNoInduk] = useState("");
  const [status, setStatus] = useState("");
  const [verif, setVerif] = useState("");
  const [msg, setMsg] = useState();

  //Get handling by:id
  const getMahasiswaById = async () => {
    try {
      const response = await axios.get(
        ` http://localhost:5000/mahasiswa/${datas.id_mhs}`
      );
        const data = await response.data.data;
      setnamaMahasiswa(data.nama);
      setNoInduk(data.noInduk);
      setStatus(data.status);

      setShow(true);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };


  //update handling by:id
  const updateMahasiswa = async () => {
    const formData = new FormData();
    formData.append("verif", verif);
    try {
      await axios.put(
        ` http://localhost:5000/verifikasi/${datas.id_mhs}`,formData
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
    updateMahasiswa(datas.id_mhs);
    setShow(false);

  };

    const reloadPage = ()=>{
      window.location.reload()
    }

  return (
    <div>
      {" "}
      <i className="fas fa-regular fa-pen" onClick={getMahasiswaById}></i>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="label ">* Update Data Mahasiswa</Modal.Title>
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
                    disabled
                    onChange={(e) => setnamaMahasiswa(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>No Induk</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan Nim"
                    value={noInduk}
                    disabled
                    onChange={(e) => setNoInduk(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>No Induk</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukan Nim"
                    value={status}
                    disabled
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </Form.Group>
                   <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Verifikasi</Form.Label>
                    <select
                    className="form-select"
                    value={verif}
                    onChange={(e) => setVerif(e.target.value)}
                    >
                      <option>Action...</option>
                      <option value="true">Terima</option>
                      <option value="false">Tidak</option>
                    </select>
                </Form.Group>
              </Row>
              
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center text-danger ">{msg}</div>
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
      {/* <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>* Update Data Mahasiswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Nama"
                value={namaMahasiswa}
                onChange={(e) => setnamaMahasiswa(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nim</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Nim"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Jurusan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Jurusan"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Angkatan</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukan Angkatan"
                value={angkatan}
                onChange={(e) => setAngkatan(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center text-danger ">{msg}</div>
          <div className="d-flex gap-3">
            <Button variant="primary" type="submit" onClick={handleUpdate}>
              Submit
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default AccMahasiswa;
