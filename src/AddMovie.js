import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./CSS/Movie.css";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import Multiselect from "multiselect-react-dropdown";
import { fetchData } from "./Redux/addMovieSlice";
import { loadProducer } from "./Redux/addMovieSlice";
import { loadActors } from "./Redux/addMovieSlice";
import { handleSubmit } from "./Redux/addMovieSlice";
import { handleSubmit1 } from "./Redux/addMovieSlice";
import { handleSubmit2 } from "./Redux/addMovieSlice";

export default function AddMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [name, setName] = useState("");
  const [actors, setActors] = useState([]);
  const [producer, setProducer] = useState("");
  const [yearOfRelease, setYearOfRelease] = useState("");
  const [actorName, setActorName] = useState("");
  const [dob, setDob] = useState([]);
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [producerName, setProducerName] = useState("");
  const [producerDob, setProducerDob] = useState([]);
  const [producerBio, setProducerBio] = useState("");
  const [producerGender, setProducerGender] = useState("");

  let handleToMovieList = async () => {
    navigate("/MovieAdmin");
  };

  let handleToBack = async (name, actors, producer, yearOfRelease) => {
    await dispatch(handleSubmit(name, actors, producer, yearOfRelease));
    handleToMovieList();
  };

  useEffect(() => {
    dispatch(fetchData());
    dispatch(loadProducer());
    dispatch(loadActors());
  }, []);

  useEffect(() => {
    dispatch(loadActors());
  }, [state.addMovieSlice.actorData1]);

  useEffect(() => {
    dispatch(loadProducer());
  }, [state.addMovieSlice.producerData1]);

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
        <div className="Content4">
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
                placeholder="Enter year Of Release"
                type="yearOfRelease"
              />
            </FormGroup>
            <FormGroup className="col">
              <Label for="producer" className="row">
                Select Producer
              </Label>
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                onChange={(e) => setProducer(e.target.value)}
              >
                <option selected>Open this select menu</option>
                {state.addMovieSlice.producerData1.map((opts, i) => {
                  return <option key={i}>{opts}</option>;
                })}
              </select>
            </FormGroup>

            <FormGroup>
              <Label for="actors" className="row">
                Select Actor
              </Label>
              <div className="text-dark">
                <Multiselect
                  isObject={false}
                  onRemove={(event) => {
                    setActors(event);
                  }}
                  onSelect={(event) => {
                    setActors(event);
                  }}
                  options={state.addMovieSlice.actorData1}
                  showCheckbox
                />
              </div>
            </FormGroup>
          </Form>
        </div>
        <div className="row1">
          <div><button
            type="button"
            class="btn btn-success"
            onClick={() =>
              handleToBack({ name, actors, producer, yearOfRelease })
            }
          >
            Add Movie
          </button></div>
          <div><button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
          >
            Add Actor
          </button></div>
          <div><button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal2"
          >
            Add Producer
          </button></div>

          <div><button
            type="button"
            class="btn btn-warning"
            onClick={() => handleToMovieList()}
          >
            Back
          </button></div>
        </div>
        <div class="modal" id="myModal">
          <div class="modal-dialog" style={{ width: "700px" }}>
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add Actor</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <Form>
                  <FormGroup>
                    <Label for="Actor">Actor Name</Label>
                    <Input
                      onChange={(e) => {
                        setActorName(e.target.value);
                      }}
                      value={actorName}
                      placeholder="Enter actorName"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Gender">Gender</Label>
                    <Input
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      value={gender}
                      placeholder="Enter Gender"
                      type="Gender"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="dob">Date Of Birth</Label>
                    <Input
                      onChange={(e) => {
                        setDob(e.target.value);
                      }}
                      value={dob}
                      placeholder="Enter dob"
                      type="dob"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Bio">Bio</Label>
                    <Input
                      onChange={(e) => {
                        setBio(e.target.value);
                      }}
                      value={bio}
                      placeholder="Enter bio"
                      type="bio"
                    />
                  </FormGroup>
                </Form>
              </div>

              <div class=" modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() =>
                    dispatch(handleSubmit1({ actorName, gender, dob, bio }))
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

        <div class="modal" id="myModal2">
          <div class="modal-dialog" style={{ width: "700px" }}>
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add Producer</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <Form>
                  <FormGroup>
                    <Label for="producer">Producer Name</Label>
                    <Input
                      onChange={(e) => {
                        setProducerName(e.target.value);
                      }}
                      value={producerName}
                      placeholder="Enter Producer Name"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Gender">Gender</Label>
                    <Input
                      onChange={(e) => {
                        setProducerGender(e.target.value);
                      }}
                      value={producerGender}
                      placeholder="Enter Gender"
                      type="Gender"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="dob">Date of Birth</Label>
                    <Input
                      onChange={(e) => {
                        setProducerDob(e.target.value);
                      }}
                      value={producerDob}
                      placeholder="Enter dob"
                      type="dob"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Bio">Bio</Label>
                    <Input
                      onChange={(e) => {
                        setProducerBio(e.target.value);
                      }}
                      value={producerBio}
                      placeholder="Enter producer Bio"
                      type="bio"
                    />
                  </FormGroup>
                </Form>
              </div>

              <div class=" modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={() =>
                    dispatch(
                      handleSubmit2({
                        producerName,
                        producerGender,
                        producerDob,
                        producerBio,
                      })
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
