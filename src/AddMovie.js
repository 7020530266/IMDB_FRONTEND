import React, { useState ,  useEffect} from "react";
import { useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import env from './enviroinment';
import "./CSS/Movie.css";
import {  FormGroup, Input, Label } from "reactstrap";
import Multiselect from 'multiselect-react-dropdown';





export default function AddMovie() {
    const navigate = useNavigate();
  let [data, setData] = useState([]);
  let [value, setValue] = useState([]);
  let [valuePro, setValuePro] = useState([]);
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
 

  let loadData = async () => {
    let res = await axios.get(`${env.apiurl}/movieAdmin/getMovieData1`);
    if (res.data.statusCode === 200 || 304) {
      setData(res.data.data);
      loadActors()
    } else {
      alert(res.data.message);
    }
   };

   const handleSubmit2 = async () => {
  
    await axios.post(
     `${env.apiurl}/producer/sendProducerData`,
     {
        producerName,
        producerDob,
        producerBio,
        producerGender
     }
   );
 };

 const handleSubmit1 = async () => {
    let ActorName =actorName
    let BIO= bio
    let DOB =dob
    let Gender = gender
    await axios.post(
     `${env.apiurl}/actor/sendActorData`,
     {
        ActorName,
        BIO,
        DOB,
        Gender
     }
   );
 };

   let loadActors = async () => {
    let res = await axios.get(`${env.apiurl}/actor/movieActors`);
    if (res.data.statusCode === 200 || 304) {
      setValue(res.data.data);
    } else {
      alert(res.data.message);
    }
   };

   let loadProducer = async () => {
    let res = await axios.get(`${env.apiurl}/producer/movieProducers`);
    if (res.data.statusCode === 200 || 304) {
      setValuePro(res.data.data);
    } else {
      alert(res.data.message);
    }
   };

const handleSubmit = async () => {
    
  let Name =name;
  let YearOfRelease =yearOfRelease;
  let Actors =actors.join(",");
  let Producer =producer;
   await axios.post(
    `${env.apiurl}/movieAdmin/postDataForMovie`,
    {
        Name,
        YearOfRelease,
        Actors,
      Producer
    }
  );
  handleToMovieList()
};

let handleToMovieList = async () => {
    navigate("/MovieAdmin");
  };

useEffect(() => {
    loadData();
    loadProducer();
    loadActors();
   }, []);
  return (
    <div  >
    <nav className="navbar bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/" 
>
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
           <Label for="producer" className="row">Select Producer</Label>
            <select
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          onChange={(e) => setProducer(e.target.value)}
        >
          <option selected>Open this select menu</option>
          {valuePro.map((opts, i) => { 
              return (
              
              <option key={i} >{opts}</option> ) }
            )}
        </select>
           </FormGroup> 

           <FormGroup>
           <Label for="actors" className="row">Select Actor</Label>
           <div className="text-dark">
            <Multiselect
            isObject={false}
            onRemove={(event)=>{setActors(event)}}
            onSelect={(event)=>{setActors(event)}}
            options={value}
            showCheckbox/>
           </div>


           </FormGroup>
     

         

      </Form>
      </div >
      <div className="row1"><button type="button" class="btn btn-success" onClick={()=>handleSubmit()}>Add Movie</button>
      <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#myModal">Add Actor</button>
      <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#myModal2">Add Producer</button>

      <button type="button" class="btn btn-warning" onClick={()=>handleToMovieList()}>Back</button>
      </div>
      <div class="modal" id="myModal">
        <div class="modal-dialog" style={{width:"700px"}}>
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Actor</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
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
            <button type="button" class="btn btn-success" onClick={()=>handleSubmit1()} data-dismiss="modal">save</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
             
          </div>
        </div>
    </div>

    <div class="modal" id="myModal2">
        <div class="modal-dialog" style={{width:"700px"}}>
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Producer</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
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
            <button type="button" class="btn btn-success" onClick={()=>handleSubmit2()} data-dismiss="modal">save</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
             
          </div>
        </div>
    </div>
    </div>
    </div>
  );
}
