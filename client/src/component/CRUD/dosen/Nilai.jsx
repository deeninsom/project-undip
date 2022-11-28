import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Nilai = ({ isUpdate, datas }) => {
  // Start Modal bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [namaMahasiswa, setnamaMahasiswa] = useState();
  const [noInduk, setNoInduk] = useState("");
  const [status, setStatus] = useState("");
  const [nilai, setNilai] = useState("");

  const [msg, setMsg] = useState();

  //Get handling by:id
  const getMahasiswaById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/berkas_pkl/${datas.id_pkl}`
      );
      const data = await response.data.data;
      console.log(data);
      setnamaMahasiswa(data.author.nama);
      setNoInduk(data.author.noInduk);
      setStatus(data.status_pkl);
      setNilai(data.nilai.nilaiPkl);
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
    formData.append("nilaiPkl", nilai);
    try {
      await axios.put(
        ` http://localhost:5000/api/v1/nilai/${datas.id_pkl}`,
        formData
      );
      reloadPage();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    updateMahasiswa(datas.id_pkl);
    setShow(false);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div>
      {" "}
      <i class="fas fa-regular fa-pen" onClick={getMahasiswaById}></i>
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
                  disabled
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
                  disabled
                  onChange={(e) => setNoInduk(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Status"
                  value={status}
                  disabled
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Beri Nilai</Form.Label>
              <Form.Control
                type="text"
                placeholder="Status"
                value={nilai}
                onChange={(e) => setNilai(e.target.value)}
              />
            </Form.Group>
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

export default Nilai;
