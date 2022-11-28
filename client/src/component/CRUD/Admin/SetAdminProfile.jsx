import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import axios from "axios";

const SetAdminProfile = ({datas, dataAdmin}) => {

     //Start Component addMahasiswa
  const [msg, setMsg] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [namaAdmin, setNamaAdmin] = useState("")
  const [nipAdmin, setNipAdmin] = useState("")

  const getUser = async () => {
    try {
      const response = await axios.get(` http://localhost:5000/api/v1/admin/${datas.id_adm}`);
      const data = await response.data.data
      setNamaAdmin(data.nama)
      setNipAdmin(data.nip)
      setShow(true)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };


  const updateAdmin = async () => {
    try {
       await axios.put(`http://localhost:5000/api/v1/admin/${datas.id_adm}`, {
        nama: namaAdmin,
        nip: nipAdmin,
      });
      dataAdmin()
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
  return (
    <>
    <button className="btn-add" onClick={getUser}>Update</button>
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="label ">* Update Data Anda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Nama"
                value={namaAdmin}
                onChange={(e) => setNamaAdmin(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Nip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukan Nim"
                value={nipAdmin}
                onChange={(e) => setNipAdmin(e.target.value)}
              />
            </Form.Group>
          </Row>
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
  </>
  )
}

export default SetAdminProfile