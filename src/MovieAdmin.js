import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./CSS/Movie.css";
import { FormGroup, Input, Label } from "reactstrap";
import Table from "react-bootstrap/Table";
import { FaFolderMinus } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./Redux/slice";
import { handleDelete } from "./Redux/slice";
import { showDetail } from "./Redux/showDetail";
import { handleSubmit } from "./Redux/sendMovieUpdate";

export default function MovieAdmin() {
  const navigate = useNavigate();
  let tableRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [name, setName] = useState(state.showDetail.data.Name);
  const [actors, setActors] = useState("");
  const [producer, setProducer] = useState("");
  const [yearOfRelease, setYearOfRelease] = useState("");

  let handleAdd = async () => {
    navigate("/AddMovie");
  };

  useEffect(() => {
    if (state.showDetail.data) {
      setName(state.showDetail.data.Name);
      setYearOfRelease(state.showDetail.data.YearOfRelease);
      setProducer(state.showDetail.data.Producer);
      setActors(state.showDetail.data.Actors);
    }
  }, [state.showDetail.data]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [state.slice.data]);

  return (
    <div>
      <nav className="navbar bg-dark">
        <div className="container-fluid high">
          <a className="navbar-brand" href="/">
            IMDB.COM
          </a>
        </div>
      </nav>
      <div className="taskTable">
        
          <Table striped responsive bordered hover ref={tableRef}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Movie Name</th>
                <th>Year of Release</th>
                <th>Producer</th>
                <th>Actors</th>
                <th>Edit Details</th>
                <th>Delete Details</th>
              </tr>
            </thead>
            <tbody>
              {state.slice.data.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.Name}</td>
                    <td>{e.YearOfRelease}</td>
                    <td>{e.Producer}</td>
                    <td>{e.Actors}</td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => dispatch(showDetail(e._id))}
                        data-toggle="modal"
                        data-target="#myModal"
                      >
                        <MdEditSquare />
                      </button>
                    </td>
                    <td onClick={() => dispatch(handleDelete(e._id))}>
                      <FaFolderMinus />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
    
        <button
          type="button"
          className="btn btn-success pb"
          onClick={() => handleAdd()}
        >
          Add Movie
        </button>

        <div className="modal" id="myModal">
          <div className="modal-dialog" style={{ width: "700px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit details</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <Form>
                  <FormGroup>
                    <Label for="name">Movie Name</Label>
                    <Input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      placeholder="Enter name"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="yearOfRelease">Year of release</Label>
                    <Input
                      onChange={(e) => {
                        setYearOfRelease(e.target.value);
                      }}
                      value={yearOfRelease}
                      placeholder="Enter yearOfRelease"
                      type="yearOfRelease"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="actors">Movie Actors</Label>
                    <Input
                      onChange={(e) => {
                        setActors(e.target.value);
                      }}
                      value={actors}
                      placeholder="Enter actors"
                      type="actors"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="producer">Producer</Label>
                    <Input
                      onChange={(e) => {
                        setProducer(e.target.value);
                      }}
                      value={producer}
                      placeholder="Enter producer"
                      type="producer"
                    />
                  </FormGroup>
                </Form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() =>
                    dispatch(
                      handleSubmit({ name, yearOfRelease, actors, producer })
                    )
                  }
                  data-dismiss="modal"
                >
                  save
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
