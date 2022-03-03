import React,{useState, useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import fire from "../fire";

import Navbar from './Navbar';
import "../asserts/scss/Rate.scss";

const Rate = () => {

    useEffect(() =>{

        db.collection("Rates").doc('rates').onSnapshot((query) => {
            var temp = query.data();
            console.log("rates effect",temp); 
            setFormData(temp);
        })
    },[]);

   
    const [formData, setFormData] = useState({
        singleDigit:'',
        jodi:'',
        singlePanna:'',
        doublePanna:'',
        triplePanna:'',
        halfSangam:'',
        fullSangam:''
    });

    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    if(!current){
        return <Redirect to='/' />
    }

    

    const {
        singleDigit,
        jodi,
        singlePanna,
        doublePanna,
        triplePanna,
        halfSangam,
        fullSangam
    }= formData;

    const onChange = e =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const onSubmit = e =>{
        e.preventDefault();
        db.collection("Rates").doc('rates').update(formData);
        alert("Succesfull");
    }

    return (
        <div className='hero'>
            <Navbar />
            <h1 className='heading-game-rate'>Game Rates</h1>
            <div className='rate-form-div container'>
            
            <div className='form-section-div'>
            <form className="rateform">
                <div className="gamedetails">
                    <div className="form-group">
                    <label>Single Digit Value 1</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="Digit"
                        value="10"
                        required
                    />
                    </div>
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
                    <div className="form-group">
                    <label>Single Panna Value 1</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="Digit"
                        value="10"
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Double Panna Value 1</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="Digit"
                        value="10"
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Triple Panna Value 1</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="Digit"
                        value="10"
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Half Sangam Value 1</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="Digit"
                        value="10"
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Full Sangam Value 1</label>
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
                    <label>Single Digit Value 2</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="singleDigit"
                        value={singleDigit}
                        onChange={onChange}
                        required
                    />
                    </div>
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
                    <div className="form-group">
                    <label>Single Panna Value 2</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="singlePanna"
                        value={singlePanna}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Double Panna Value 2</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="doublePanna"
                        value={doublePanna}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Triple Panna Value 2</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="triplePanna"
                        value={triplePanna}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Half Sangam Value 2</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="halfSangam"
                        value={halfSangam}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Full Sangam Value 2</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="fullSangam"
                        value={fullSangam}
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

export default Rate;
