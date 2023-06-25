import React, { useState , useRef, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import env from './enviroinment';
import "./CSS/Movie.css";
import {  FormGroup, Input, Label } from "reactstrap";
import Table from "react-bootstrap/Table";
import { FaFolderMinus } from "react-icons/fa6";
import {MdEditSquare} from "react-icons/md"




export default function MovieAdmin() {
  const navigate = useNavigate();
  let [data, setData] = useState([]);
  let tableRef = useRef(null);
  const [name, setName] = useState("");
  const [actors, setActors] = useState("");
  const [producer, setProducer] = useState("");
  const [yearOfRelease, setYearOfRelease] = useState("");

  let handleDelete = async (id) => {
    let res = await axios.delete(`${env.apiurl}/movieAdmin/deleteMovie/${id}`);
    if (res.data.statusCode === 200) {
      loadData();
    } else {
      alert(res.data.message);
    }
  };

  let handleAdd = async () => {
    navigate("/AddMovie");
  };
  

  let insertData = async () => {
   let res = await axios.get(`${env.apiurl}/movieAdmin/getMovieData`);
   if (res.statusCode === 200 || 304) {
          
    
   } else {
     alert(res.data.message);
   }
 };

 let insertActor = async () => {
  let res = await axios.get(`${env.apiurl}/actor/actorData`);
  if (res.statusCode === 200 || 304) {
         
   
  } else {
    alert(res.data.message);
  }
};

let insertProducer = async () => {
  let res = await axios.get(`${env.apiurl}/producer/producerData`);
  if (res.statusCode === 200 || 304) {
         
   
  } else {
    alert(res.data.message);
  }
};


 let loadData = async () => {
 let res = await axios.get(`${env.apiurl}/movieAdmin/getMovieData1`);
 if (res.data.statusCode === 200 || 304) {
   setData(res.data.data);
 } else {
   alert(res.data.message);
 }
};

let idArray=[];

const showDetail = async (id) => {
  idArray.push(id)
  let res = await axios.get(`${env.apiurl}/movieAdmin/getDataForPut/${id}`);
  setName(res.data.Name);
  setYearOfRelease(res.data.YearOfRelease);
  setProducer(res.data.Producer);
  setActors(res.data.Actors);
};

const handleSubmit = async () => {

   await axios.put(
    `${env.apiurl}/movieAdmin/getDataForPutUpdate`,
    {
      name,
      yearOfRelease,
      actors,
      producer
    }
  );
};


insertActor();
insertProducer();

  useEffect(() => {
    insertData();
    loadData();
    
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
        <Table striped responsive="md" bordered hover ref={tableRef}>
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
            {data.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.Name}</td>
                  <td>{e.YearOfRelease}</td>
                  <td>{e.Producer}</td>
                  <td>{e.Actors}</td>
                  
                  <td><button type="button" className="btn btn-dark" onClick={()=>showDetail(e._id)} data-toggle="modal" data-target="#myModal"><MdEditSquare/></button>
</td>
                     <td onClick={()=>handleDelete(e._id)}><FaFolderMinus/></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <button type="button" className="btn btn-success pb" onClick={()=>handleAdd()}>Add Movie</button>

      <div className="modal" id="myModal">
        <div className="modal-dialog" style={{width:"700px"}}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit details</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
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
            <button type="button" class="btn btn-success" onClick={()=>handleSubmit()} data-dismiss="modal">save</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
             
          </div>
        </div>
    </div>
    </div>
    </div>
  );
}
