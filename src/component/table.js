import React from 'react'
import './style/table.css';
import { firestore } from '../firebase';
import { doc, setDoc,getDoc,collection, getDocs,addDoc,deleteDoc } from "firebase/firestore"; 
import { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';
export default function Table(props) {
    const [ dummy,setDummy] = useState([]);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(false);
    const [username, setUsername] = useState("");
    const [date, setDate] = useState("");

    const toggle = () => setModal(!modal);
    useEffect(  ()=>{
        const usercollection = collection(firestore, "user");
        const getDummyuserdata = async () => {  
            try{
                const data =await getDocs(usercollection);
                const filterdata = data.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDummy(filterdata);
                console.log(filterdata)
            }catch(e){
                console.log(e)
            }
        }
        getDummyuserdata();
    },[]);
    
    
    const deleteuser = async (id) => {
           await deleteDoc(doc(firestore, "user", id));
            const usercollection = collection(firestore, "user");
            const getDummyuserdata = async () => {  
                try{
                    const data =await getDocs(usercollection);
                    const filterdata = data.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setDummy(filterdata);
                }catch(e){
                    console.log(e)
                }
            }
            getDummyuserdata();   
    }
    const changeStatus = async (id) => {
        const docRef = doc(firestore, "user", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await setDoc(docRef, {
                ...docSnap.data(),
                status: !docSnap.data().status
            });
            const usercollection = collection(firestore, "user");
            const getDummyuserdata = async () => {  
                try{
                    const data =await getDocs(usercollection);
                    const filterdata = data.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setDummy(filterdata);
                }catch(e){
                    console.log(e)
                }
            }
            getDummyuserdata();
        } else {
            console.log("No such document!");
        }
        
    }
    const adduser = async () => {
        const usercollection = collection(firestore, "user");
        await addDoc(usercollection, {
            username: username,
            date: date,
            status: true
        });
        const getDummyuserdata = async () => {  
            try{
                const data =await getDocs(usercollection);
                const filterdata = data.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDummy(filterdata);
            }catch(e){
                console.log(e)
            }
        }
        getDummyuserdata();
        setUsername("");
        setDate("");
        setStatus(false);
        toggle();


    }
   const sorting = () => {
    const sorted = props.dummy.sort((a, b) => {
        if (a.username < b.username) {
            return -1;
        }
        if (a.username > b.username) {
            return 1;
        }
        return 0;
    });
    setDummy(sorted);
}
  return (
    <div 
    style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        flexDirection: 'column'
    }} >
    

<div class='main-table-containter'>
  <div class='title-table-container'>
    <Button class='add-button' onClick={toggle}>Add User</Button>
    <div class='subtitle'>User Data</div>
    <button class='select-button' onClick={()=>{sorting()}}> 
        sort by name
     </button>
  </div>
  <div>
    <table> 
      <tbody 
        style={{
            textAlign: 'center'
        }}
      >
        <th>Username</th>
        <th>Date</th>
        <th>Status</th>
        <th>Change Status</th>
        <th>Delete</th>
      { dummy.map((data) => {
        return(
            <tr>
          <td
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
          ><div class='icono-texto'
          > <div>{data.username}</div></div></td>
           <td >{data.date}</td> 
          <td><div class={data.status ? "completado" :"pendiente"}>{data.status ? "Active" : "InActive"}</div></td>
            <td> <Button  onClick={()=>changeStatus(data.id)}>Change Status</Button></td>
           <td><Button onClick={()=>{deleteuser(data.id)}} color="danger" class='delete-button'>Delete</Button></td>
        </tr>
        )
        })}
      </tbody>
    </table>
  </div>
  <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add User</ModalHeader>
        <ModalBody>
        <Form>
  <FormGroup row>
    <Input
        type="text"
        name="text"
        id="exampleText"
        placeholder="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
    />
    
  </FormGroup>
  <FormGroup row>
   
      <Input
    type="date"
    name="date"
    id="exampleDate"
    placeholder="date placeholder"
    value={date}
    onChange={(e) => {
      setDate(e.target.value);
    }}
  />
   
    
  </FormGroup>
 
 {/* <Label check>Status</Label> */}
  <FormGroup switch>
       
        <Input
          type="switch"
          checked={status}
          onClick={() => {
            setStatus(!status);
          }}
        />
        
      </FormGroup>
 
</Form>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={
            ()=>{adduser()}
          }>
            Add User
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
</div>


    </div>
  )
}
