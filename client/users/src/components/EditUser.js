import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from "react";
import Axios from "axios";

function EditUser(){


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div> 
          <input type="text" placeholder="Name " onChange={(event) =>{setName(event.target.value);}}/>
          <input type="number" placeholder="Age " onChange={(event)=>{setAge(event.target.value);}}/>
          <input type="text" placeholder="Username " onChange={(event)=>{setUsername(event.target.value);}}/>
          <input type="text" placeholder="email " onChange={(event)=>{setEmail(event.target.value);}}/>
          <input type="text" placeholder="DOB" onChange={(event)=>{setdob(event.target.value);}}/>
          <Button  onClick={createUser}>Create User </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;