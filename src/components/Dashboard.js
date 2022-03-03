import React, {useState, useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import fire from "../fire";

import Navbar from './Navbar';
import "../asserts/scss/Dashboard.scss";

const Dashboard = () => {
    useEffect(async () =>{
        db.collection("UsersData").onSnapshot((query) => {
            var temp=query.size;
            setUsers(temp);
            var temp2 = 0;
            query.docs.forEach(doc => {
                if(doc.data()['active']==false){
                    temp2++;
                }
            })
            setUnapproved(temp2);   
        });
        
        
        db.collection("GamesData").onSnapshot((query) => {
            var gamesize = query.size;
            setGames(gamesize);
        });

        var bidAmount = 0;
        var winAmount=0;
        await db.collection("GamesData").get().then((query) =>{
            query.docs.forEach(async doc => {
                await db.collection("GamesData").doc(doc.id).collection("Games").get().then((t)=>{
                    t.docs.forEach(doc2 =>{
                        var temp= doc2.data().Bids;
                        console.log("tempdasdf",temp);
                        for(let i=0;i<temp.length;i++){
                            bidAmount = bidAmount + parseInt(temp[i].amount);
                            console.log("Bi",bidAmount,parseInt(temp[i].amount))
                        }
                        

                        var temp2= doc2.data().winnerList;
                        console.log("game",doc.id)
                        console.log("tempd2",temp2);
                        const forLoop = async _ =>{
                            for(let i=0;i<temp2.length;i++){
                                var multiple =0;
                                console.log("type cjkafsd",temp2[i].type)
                                if(temp2[i].type === 'Jodi Digit'){
                                    await db.collection("Rates").doc('gali').get().then((query)=>{
                                        var tempp='';
                                        switch(temp2[i].type){
                                            case "Jodi Digit":
                                                tempp="jodi";
                                                break;
                                        }
                                        var temp3 = query.data()[tempp];
                                        multiple = parseInt(temp3)/10;
                                    })
                                }
                                else{
                                    await db.collection("Rates").doc('rates').get().then((query)=>{
                                        var temptest='';
                                        console.log("type check",temp2[i].type)
                                        switch(temp2[i].type){
                                            case "Single Digit":
                                                temptest="singleDigit";
                                                break;
                                            case "Jodi":
                                                temptest="jodi";
                                                break;
                                            case "Single Panna":
                                                temptest="singlePanna";
                                                break;
                                            case "Double Panna":
                                                temptest="doublePanna";
                                                break;
                                            case "Triple Panna":
                                                temptest="triplePanna";
                                                break;
                                            case "Half Sangam":
                                                temptest="halfSangam";
                                                break;
                                            case "Full Sangam":
                                                temptest="fullSangam";
                                                break;
                                        }
                                        var temp23 = query.data()[temptest];
                                        console.log("multiple",temp23);
                                        multiple = parseInt(temp23)/10;
                                        console.log("final multiple",multiple);
                                    })
                                }
                    
                                var tempAmount = parseInt(temp2[i].amount)*parseInt(multiple);
                                winAmount = winAmount + parseInt(tempAmount);
                                console.log("Bif",winAmount,parseInt(temp2[i].amount))
                            }
                            setWin(winAmount);
                            setBid(bidAmount);
                        }
                        forLoop();

                    })
                    
                })
            })
        })
        console.log("dashboard effect")
    },[]);

    const [users, setUsers] = useState('');
    const [unapproved, setUnapproved] = useState('');
    const [games, setGames] = useState('');
    const [bid, setBid] = useState('');
    const [win, setWin] = useState('');

    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    if(!current){
        return <Redirect to='/' />
    }
    
   
    return (
        <div className="hero">
            <Navbar />
            <div className="dashboard">
                <h1>Welcome Back Admin Dashboard</h1>
                <div className="users-info">
                    <div className="child">
                        <h5>Total Users</h5>
                        <h3>{users}</h3>
                    </div>
                    <div className="child">
                        <h5>Approved Users</h5>
                        <h3>{users-unapproved}</h3>
                    </div>
                    <div className="child">
                        <h5>Unapproved Users</h5>
                        <h3>{unapproved}</h3>
                    </div>
                    <div className="child">
                        <h5>Total Games</h5>
                        <h3>{games}</h3>
                    </div>
                    <div className="child">
                        <h5>Total Bid Amount</h5>
                        <h3>{bid}</h3>
                    </div>
                    <div className="child">
                        <h5>Total Win Amount</h5>
                        <h3>{win}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
