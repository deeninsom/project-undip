import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import axios from "axios";
const EditProfileMhs = ({dataAdmin, datas}) => {
 
  //Start Component addMahasiswa
  const [msg, setMsg] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [namaAdmin, setNamaAdmin] = useState("")
  const [nipAdmin, setNipAdmin] = useState("")

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/admin/${datas.id_adm}`);
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
       await axios.put(` http://localhost:5000/api/v1/admin/${datas.id_adm}`, {
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
  );
};

export default EditProfileMhs;


// <>
// <button className="btn-add" onClick={getUser}>Update</button>
// <Modal show={show} onHide={handleClose} size="lg">
//   <Modal.Header closeButton>
//     <Modal.Title className="label ">* Update Data Mahasiswa</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form onSubmit={editProfile}>
//       <Row className="mb-3">
//         <Form.Group as={Col} controlId="formGridEmail">
//           <Form.Label>Nama</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Masukan Nama"
//             value={namaAdmin}
//             onChange={(e) => setNamaAdmin(e.target.value)}
//           />
//         </Form.Group>

//         <Form.Group as={Col} controlId="formGridPassword">
//           <Form.Label>Nip</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Masukan Nim"
//             value={nipAdmin}
//             onChange={(e) => setNipAdmin(e.target.value)}
//           />
//         </Form.Group>
//       </Row>
//       <Row className="mb-3">
//         <Form.Group as={Col} controlId="formGridPassword">
//           <Form.Label>Jurusan</Form.Label>
//           <select
//             class="form-select"
//             value={jurusan}
//             onChange={(e) => setJurusan(e.target.value)}
//           >
//             <option>Pilih Jurusan ...</option>
//             <option value="Sistem informasi">Sistem informasi</option>
//           </select>
//         </Form.Group>
//         <Form.Group as={Col} controlId="formGridPassword">
//           <Form.Label>Angkatan</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Masukan Angkatan"
//             value={angkatan}
//             onChange={(e) => setAngkatan(e.target.value)}
//           />
//         </Form.Group>
//       </Row>
//       <Form.Group className="mb-3" controlId="formGridAddress1">
//         <Form.Label>Alamat</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Masukan Alamat"
//           value={alamat}
//           onChange={(e) => setAlamat(e.target.value)}
//         />
//       </Form.Group>
//       {/* <Form.Group className="mb-3" controlId="formGridAddress1">
// <Form.Label>Password</Form.Label>
// <Form.Control
// type="password"
// placeholder="Masukan password"
// value={password}
// onChange={(e) => setPassword(e.target.value)}
// />
// </Form.Group> */}

//       {/* <Form.Group className="mb-3" controlId="formGridAddress2">
// <Form.Label>Role</Form.Label>
// <Form.Control type="text" placeholder="Masukan Role"   value={role}
//   onChange={(e) => setRole(e.target.value)}/>
// </Form.Group> */}

//       {/* <Row className="mb-3">
// <Form.Group as={Col} controlId="formGridState">
// <Form.Label>Role</Form.Label>
//   <select
//   class="form-select"
//     value={role}
//     onChange={(e) => setRole(e.target.value)}
//   >
//     <option>Pilih Role ...</option>
//     <option value="mahasiswa">Mahasiswa</option>
//     <option value="dosen">Dosen</option>
//     <option value="admin">Admin</option>
//   </select>
// </Form.Group>
// </Row> */}
//     </Form>
//   </Modal.Body>
//   <Modal.Footer>
//     <div class="text-center text-danger ">{msg}</div>
//     <div className="d-flex gap-3">
//       <Button variant="primary" type="submit" onClick={editProfile}>
//         Submit
//       </Button>
//       <Button variant="secondary" onClick={handleClose}>
//         Close
//       </Button>
//     </div>
//   </Modal.Footer>
// </Modal>
// </>