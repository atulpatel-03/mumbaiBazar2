import React,{useState, useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import fire from "../fire";

import Navbar from './Navbar';
import "../asserts/scss/Rate.scss";

const BonusAmount = () => {

    useEffect(() =>{

        db.collection("Settings").doc('data').onSnapshot((query) => {
            var temp = query.data().bonus;
            console.log("rates effect",temp); 
            setFormData({bonus:temp});
            console.log("temp",temp)
        })
    },[]);

   
    const [formData, setFormData] = useState({
       bonus:''
    });

    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    if(!current){
        return <Redirect to='/' />
    }

    

    const {
        bonus
    }= formData;

    const onChange = e =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit = e =>{
        e.preventDefault();
        db.collection("Settings").doc('data').update({bonus:bonus});
        db.collection("Rates").doc('rates').update(formData);
        alert("Succesfull");
    }

    return (
        <div className='hero'>
            <Navbar />
            <h1 className='heading-game-rate'>Bonus Amount</h1>
            <div className='rate-form-div-2 container'>
            <form className="rateform" onSubmit={onSubmit}>
                <div className="gamedetails">
                    <div className="form-group">
                    <label className='bonus-label'>Enter Bonus Amount</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="bonus"
                        value={bonus}
                        onChange={onChange}
                        required
                    />
                    </div>      
                </div>
                <button type="submit" className="btn btn-primary sendbtn" >Update</button>
                </form>
                </div>
        </div>
    )
}

export default BonusAmount;
