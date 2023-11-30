import {useState, useEffect} from "react";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import Dropdown from 'react-bootstrap/Dropdown';

function CreateUser(){
    const [listOfUsers, setListOfUsers] = useState([]);
    useEffect(()=> {
      Axios.get("http://localhost:3000/getUsers").then((response)=>{
      setListOfUsers(response.data);
      });
      }, []);
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)
    const [username, setUsername] = useState("")
    const [email, setEmail]= useState("")
    const [dob, setdob] =useState("")
    
  
              const createUser = () => {
                Axios.post("http://localhost:3000/createUser", {
                name: name,
                age: age,
                username: username,
                email:email,
                dob:dob,
                }).then((response)=>{
                  setListOfUsers([...listOfUsers, {
                    name,
                    age,
                    username,
                    email,
                    dob,
                    },
                    ]);
                });
  
              
                };
        const deleteUser = async (name) => {
          try {
            const response = await Axios.delete(`http://localhost:3000/deleteUser/${name}`);
            const deletedUser = response.data;
            setListOfUsers(listOfUsers.filter(user => user.name !== name));
          } catch (error) {
            console.error(`Error deleting user ${name}:`, error.message);
          }
        };
        const updateUser = async (name) => {
          try {
            const existingUser = listOfUsers.find(user => user.name === name);
            const updatedUser = {
              name: name,
              age: age,
              username: username,
              email:email,
              dob: dob,
            };
            const response = await Axios.put(`http://localhost:3000/updateUser/${name}`, updatedUser);
            const updatedUserData = response.data;
            setListOfUsers(listOfUsers.map(user => (user.name === name ? updatedUserData : user)));
          } catch (error) {
            console.error(`Error updating user ${name}:`, error.message);
          }
        };
        return (
            <>
              <div> 
          <input type="text" placeholder="Name " onChange={(event) =>{setName(event.target.value);}}/>
          <input type="number" placeholder="Age " onChange={(event)=>{setAge(event.target.value);}}/>
          <input type="text" placeholder="Username " onChange={(event)=>{setUsername(event.target.value);}}/>
          <input type="text" placeholder="email " onChange={(event)=>{setEmail(event.target.value);}}/>
          <input type="text" placeholder="DOB" onChange={(event)=>{setdob(event.target.value);}}/>
          <Button onClick={createUser}>Create User </Button>
          

<div className="userDisplay">
{listOfUsers.map((user) => {
return (
  
<Card style={{ width: '18rem', margin:"15px" }}>
      <Card.Body>
        <Card.Title>Name:{user.name}</Card.Title>
        <Card.Text>
          Username: {user.username}<br/>
          email: {user.email}<br/>
          DOB: {user.dob}<br/>
        </Card.Text>
       
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            More Options
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => deleteUser(user.name)}> <Button variant="secondary" >Delete user</Button></Dropdown.Item>
            <Dropdown.Item><Button variant="secondary" onClick={() => updateUser(user.name)}>Update user</Button></Dropdown.Item>
    
          </Dropdown.Menu>
        </Dropdown>
        
      </Card.Body>
    </Card>
);
})}   
</div>
</div>
</>);}

export default CreateUser;
