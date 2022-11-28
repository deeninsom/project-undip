import React, { useEffect, useState,  } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/counter/authSlice";
import Layout from "../../../component/Layout/Layout";
import AccMahasiswa from "./AccMahasiswa";

const MahasiswaPerwalian = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }

  }, [isError, user, navigate]);

  //Usehook
  const [dataPost, setdataPost] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState();
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    getDataMahasiswa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);
  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg(
        "* Jika data yang anda cari tidak ditemukan, carilah dengan kata kunci yang spesifik"
      );
    } else {
      setMsg("");
    }
  };

  const sorting = (e) => {
    e.preventDefault();
    // setPage(0);
    const sort = e.target.value;
    console.log(sort);

    // if(sort === "true") return dataPost()
    setStatus(sort);
  };

  const getDataMahasiswa = async () => {
    try {
      const respon = await axios.get(
        ` http://localhost:5000/mahasiswa?status=${status}&page=${page}&limit=${limit}`
      );
      // console.log(respon)

      setdataPost(respon.data.data);
      setPage(respon.data.page);
      setPages(respon.data.allPages);
      setRows(respon.data.allRows);
      setLimit(respon.data.limit);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };


  return (
    <Layout>
      <div>
        <div className="d-sm-flex align-items-center justify-content-between border-bottom">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active ps-0"
                id="home-tab"
                data-bs-toggle="tab"
                href="#overview"
                role="tab"
                aria-controls="overview"
                aria-selected="true"
              >
                Data Mahasiswa
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content tab-content-basic">
          <div
            className="tab-pane fade show active"
            id="overview"
            role="tabpanel"
            aria-labelledby="overview"
          >
            <div className="row">
              <div className="col-sm-12">
                <div className="statistics-details d-flex align-items-center justify-content-between">
                  <div>
                    <p className="statistics-title">Total Mahasiswa</p>
                    <h3 className="rate-percentage ">{rows} Data</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Rekap Data Mahasiswa</h4>
                  <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                    <div className="container-fluid">
                      <div className="select-sortir col-md-2">
                        <Form.Select
                          aria-label="Default select example "
                          onChange={sorting}
                        >
                          <option >All</option>
                          <option value="true">Diterima</option>
                          <option value="false">Belum</option>
                        </Form.Select>
                      </div>
                      <ul className="navbar-nav mb-2 mb-lg-0 "></ul>
                    </div>
                  </nav>
                  <div className="table-responsive pt-3">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Nama Mahasiswa</th>
                          <th>Status</th>
                          <th>Angkatan</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataPost.map((data, index) => {
                          console.log(data.verifikasi);
                          return (
                            <tr key={data.id_mhs}>
                              <td>{index + 1}</td>
                              <td>{data.nama}</td>
                              <td>{data.status}</td>
                              <td>{data.angkatan}</td>
                              <td>
                                  <div className="d-flex gap-3">
                                  <AccMahasiswa
                                    isUpdate={getDataMahasiswa}
                                    datas={data}
                                  />
                                  {/* <DelMahasiswa
                                    isDeleted={getDataMahasiswa}
                                    data={data}
                                  /> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    <div className="d-flex gap-3 mt-4  align-self-end footer-table">
                      <p className="mt-2">
                        Page : {rows ? page + 1 : 0}{" "}
                        <i className="fa fa-light fa-minus"></i> {pages} of {rows}
                      </p>
                      <nav className="pagination" key={rows}>
                        <ReactPaginate
                          previousLabel={"<<"}
                          nextLabel={">>"}
                          pageCount={Math.min(10, pages)}
                          onPageChange={changePage}
                          containerclassName="pagination  "
                          pageLinkclassName={"page-link"}
                          pageclassName={"page-item"}
                          disabledclassName={"page-item disabled"}
                          disabledLinkclassName={"page-link "}
                          nextLinkclassName={"page-link "}
                          previousLinkclassName={"page-link"}
                          activeclassName="page-item active"
                        ></ReactPaginate>
                      </nav>
                    </div>
                    <p className="text-danger ">{msg}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MahasiswaPerwalian;
