import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import { Link, Redirect } from "react-router-dom"; 
import fire from '../fire';
import "../asserts/scss/Request.scss";
import firebase from 'firebase';
import moment from 'moment';

const Request = () => {

    useEffect(()=>{
        console.log("Request Effect");
        db.collection("Requests").onSnapshot((doc)=>{
            const data1 = doc.docs.map((doc) =>(
                {
                requestId: doc.id,
                ...doc.data()
            }))
            console.log("request",data1);
            setRequest(data1)
        })
        
    },[])
    const [request, setRequest] = useState([]);
    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    if(!current){
        return <Redirect to='/' />
    }

    const handleClick1 =async (id,userId,type,amount) =>{
        console.log("all data",id,userId,type,amount);
        if(type === "transfer"){
            console.log("id",id)
            await db.collection("Requests").doc(id).delete();
            console.log("Deleted done");
        }
        else{
            var tempBalance =0;
            await db.collection("UsersData").doc(userId).get().then((doc) =>{
            tempBalance = doc.data().Balance;
            })
            tempBalance = tempBalance - parseInt(amount);
            var timestamptemp= firebase.firestore.Timestamp.now();
            var obj = [{
                "amount":amount,
                "game":'',
                "type":"withdrawal",
                "timestamp":timestamptemp
            }];
        var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
        await db.collection("UsersData").doc(userId).update({'Balance':tempBalance,'Transaction':trans});
        await db.collection("Requests").doc(id).delete();

        }
    }

    const handleClick2 = (id) =>{
        console.log("id",id)
         db.collection("Requests").doc(id).delete();
         console.log("Deleted done");
    }

    const myrequestList = request.map((t)=>{
        return <div className='request-box'>
            <div className='request-detail'>
                <div className="amount">Amount : {t.request}</div>
                <div className='from'>User : {t.name}</div>
                <div className='from'>Time : {moment(t.requestId).format('dddd, MMMM Do, YYYY h:mm:ss A')}</div>
                <div className='type'>Type : <div className={t.type}>{t.type}</div></div>
                {t.type === "transfer" ? <div className='to'>Transfer to : {t.transferto}</div>:<div className='no-to'>UPI ID : {t.upiNo}</div>}
            </div>
            <div className='request'>
               <div className='btn btn-small accept' onClick={()=>handleClick1(t.requestId,t.id,t.type,t.request)}>Accept</div> 
               <div className='btn btn-small decline' onClick={()=>handleClick2(t.requestId)}>Decline</div> 
            </div>
        </div>
    })

    return (
        <div className='hero'>
            <Navbar />
            <div className='request-list container'>
            <h1 className='heading'>All Requests</h1>
            <div className='all-list'>
                {myrequestList}
            </div>
            </div>
        </div>
    )
}

export default Request;
