import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Layout from "../../component/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/counter/authSlice";
const RekapProgresSkripsi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const [dataPost, setdataPost] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [limit, setLimit] = useState();
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    getDataMahasiswa();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page,limit, status]);

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
    setPage(1);
    const sort = e.target.value;
    if (sort === "all") {
      return setPages();
    }
    setStatus(sort);
  };

  const getDataMahasiswa = async () => {
    try {
      const respon = await axios.get(
        ` http://localhost:5000/api/v1/berkas/skripsi?status=${status}&page=${page}&limit=${limit}`
      );

      setdataPost(respon.data.data);
      setPage(respon.data.page);
      setPages(respon.data.allPages);
      setRows(respon.data.allRows);
      setLimit(respon.data.limit);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  const tableRef = useRef(null);

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
                Rekap Data Skripsi Mahasiswa
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
            <div className="col-12 grid-margin stretch-card">
              <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Data Mahasiswa</h4>
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                      <div className="container-fluid">
                        <div className="select-sortir col-md-2">
                          <Form.Select
                            aria-label="Default select example "
                            onChange={sorting}
                          >
                            <option value="all">Pilih Status</option>
                            <option value="ambil">Ambil</option>
                            <option value="belum">Belum</option>
                            <option value="sedang">Sedang</option>
                          </Form.Select>
                        </div>
                        <ul className="navbar-nav mb-2 mb-lg-0 "></ul>
                      </div>
                    </nav>

                    <div className="table-responsive pt-3">
                      <table className="table table-bordered" ref={tableRef}>
                        <thead>
                          <tr>
                            <th>Nama Mahasiswa</th>
                            <th>Status Skripsi</th>
                            <th>Angkatan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataPost.map((data) => {
                            return (
                              <tr key={data.id_skripsi}>
                                <td>{data.author.nama}</td>
                                <td>{data.status_skripsi}</td>
                                <td>{data.author.angkatan}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <div className="d-flex gap-3 mt-4  align-self-end footer-table">
                      <p className="mt-2">
                        Page : {rows ? page + 1 : 0}{" "}
                        <i class="fa fa-light fa-minus"></i> {pages} of {rows}
                      </p>
                      <nav className="pagination" key={rows}>
                        <ReactPaginate
                          previousLabel={"<<"}
                          nextLabel={">>"}
                          pageCount={Math.min(10, pages)}
                          onPageChange={changePage}
                          containerClassName="pagination  "
                          pageLinkClassName={"page-link"}
                          pageClassName={"page-item"}
                          disabledClassName={"page-item disabled"}
                          disabledLinkClassName={"page-link "}
                          nextLinkClassName={"page-link "}
                          previousLinkClassName={"page-link"}
                          activeClassName="page-item active"
                        ></ReactPaginate>
                      </nav>
                    </div>
                    <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                  >
                    <button type="button" className="btn btn-info btn-icon-text">
                          Export
                          <i className="ti-printer btn-icon-append"></i>                                                                              
                        </button>
                  </DownloadTableExcel>
                      <p className="text-danger ">{msg}</p>
                    </div>
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

export default RekapProgresSkripsi;
