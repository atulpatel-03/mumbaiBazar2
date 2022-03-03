import React,{useState, useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import fire from "../fire";

import Navbar from './Navbar';
import "../asserts/scss/Rate.scss";



const Setting = () => {

    useEffect(() =>{

        db.collection("Settings").doc('data').onSnapshot((query) => {
            var temp = query.data();
            console.log("rates effect",temp); 
            setFormData(temp);
        })
    },[]);

   
    const [formData, setFormData] = useState({
        whatsApp:'',
        email:''
    });

    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    if(!current){
        return <Redirect to='/' />
    }

    

    const {
        whatsApp,
        email
    }= formData;

    const onChange = e =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit = e =>{
        e.preventDefault();
        db.collection("Settings").doc('data').update(formData);
        alert("Succesfull");
    }

    return (
        <div className='hero'>
            <Navbar />
            <h1 className='heading-game-rate'>Settings</h1>
            <div className='rate-form-setting-div container'>
            <div className='form-section-setting-div2'>
            <form className="rateform" onSubmit={onSubmit}>
                <div className="gamedetails">
                    <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                        type="tel"
                        className="form-control"
                        placeholder="Enter Phone Number"
                        name="whatsApp"
                        value={whatsApp}
                        onChange={onChange}
                        required
                    />
                    </div> 
                    <div className="form-group">
                    <label>Email Id</label>
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="Enter Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                    </div>               
                </div>
                <button type="submit" className="btn btn-primary sendbtn" >Update</button>
                </form>
                </div>
                </div>
        </div>
    )
}

export default Setting;
