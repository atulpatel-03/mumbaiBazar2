import React,{useState, useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import fire from "../fire";

import Navbar from './Navbar';
import "../asserts/scss/Rate.scss";

const RateGully = () => {

    useEffect(() =>{

        db.collection("Rates").doc('gali').onSnapshot((query) => {
            var temp = query.data();
            console.log("rates effect",temp); 
            setFormData(temp);
        })
    },[]);

   
    const [formData, setFormData] = useState({
        leftDigit:'',
        jodi:'',
        rightDigit:'',
    });

    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    if(!current){
        return <Redirect to='/' />
    }

    

    const {
        leftDigit,
        jodi,
        rightDigit
    }= formData;

    const onChange = e =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit = e =>{
        e.preventDefault();
        db.collection("Rates").doc('gali').update(formData);
        alert("Succesfull");
    }

    return (
        <div className='hero'>
            <Navbar />
            <h1 className='heading-game-rate'>Gali Desawar Rates</h1>
            <div className='rate-form-div container'>
            
            <div className='form-section-div'>
            <form className="rateform">
                <div className="gamedetails">
                    <div className="form-group">
                    <label>Jodi Value 1</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="Digit"
                        value="10"
                        required
                    />
                    </div>
                </div>
                </form>
                </div>
            <div className='form-section-div2'>
            <form className="rateform" onSubmit={onSubmit}>
                <div className="gamedetails">
                    <div className="form-group">
                    <label>Jodi Value 2</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="jodi"
                        value={jodi}
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

export default RateGully;
