import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const DeletedAdmin = ({ isDeleted, data }) => {
  //handle modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleDeleted = () => {
    deletedAdmin(data.id_adm);
    setShow(false);
  };
  const handleShow = () => setShow(true);


  //controller deleted
  const deletedAdmin = async (id) => {
    try {
      await axios.delete(` http://localhost:5000/api/v1/admin/${data.id_adm}`);
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

export default DeletedAdmin;
