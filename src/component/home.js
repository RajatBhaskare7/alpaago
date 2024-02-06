import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { firestore } from '../firebase';
import { doc, setDoc,getDoc,collection, getDocs,addDoc,deleteDoc } from "firebase/firestore"; 
import Navbar from './navbar';
import Table from './table';
import { Input,Row,Col } from 'reactstrap';

export default function Home(props) {

    const [weather, setWeather] = useState(null);
    const [dummy,setDummy] = useState([]);
    const [selectedValue, setSelectedValue] = useState('Mumbai');

    const usercollection = collection(firestore, "user");

    const apiKey ="862fb3b2377be4d030aa6ff55806ab61";

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

    
    useEffect(  ()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedValue}&appid=862fb3b2377be4d030aa6ff55806ab61`).then((res)=>{
            // console.log(res)
            setWeather(res.data);
            console.log(res.data);
         getDummyuserdata();
        });
        
  
    },[selectedValue]);
    
   
  return (
    <div>


       


        <Navbar />
        <div 
     
            style={{
               width: `20%`,
                margin: `auto`,
                marginTop: `3%`
            }}
        >
           <h1>Weather Data</h1>
        <Row>
            <Col>
            <Input
    className="mt-5"
    type="select"
    value={selectedValue}
    onChange={(e) =>{
        setSelectedValue(e.target.value);
        
    }}
  >
    <option
        value={"Mumbai"}
    >
        Mumbai
    </option>
    <option
        value={"Delhi"}
    >
        Delhi
    </option>
    <option
        value={"Bangalore"}
    >
        Bangalore
    </option>
  </Input>
            </Col>
            <Col>
                <p 
                className='mt-5'
                >

            Temperature: {weather && weather.main.temp}
                    </p>
            </Col>
        </Row>
        </div>
        <Table dummy={dummy} 
 
        func={getDummyuserdata()} />
    </div>
  )
}
