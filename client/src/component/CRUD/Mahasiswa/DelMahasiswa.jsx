import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const DelMahasiswa = ({ isDeleted, data }) => {
  //handle modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleDeleted = () => {
    deletedMahasiswa(data.id_mhs);
    setShow(false);
    // reloadPage()
  };
  const handleShow = () => setShow(true);


  //controller deleted
  const deletedMahasiswa = async (id) => {
    try {
      await axios.delete(` http://localhost:5000/api/v1/mahasiswa/deleted/${data.id_mhs}`);
      isDeleted();
    } catch (error) {
      console.log({ msg: console.error });
    }
  };
  return (
    <div>
      <i className="fa fa-duotone fa-trash" onClick={handleShow}></i>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>* Hapus Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>Anda yakin menghapus data ini ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tidak
          </Button>
          <Button variant="primary" onClick={handleDeleted}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DelMahasiswa;
