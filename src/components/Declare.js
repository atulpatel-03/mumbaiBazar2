import React,{useEffect, useState} from 'react';
import Navbar from './Navbar';
import { Link, Redirect } from "react-router-dom";
import fire from '../fire';
import moment from 'moment';
import "../asserts/scss/Declare.scss";
import firebase from 'firebase';

const Declare = () => {
    useEffect(() =>{
        db.collection("GamesData").onSnapshot((query) => {
            var data = query.docs.map((doc) =>(
                doc.data()
            ))
            setGames(data);
            console.log("Declare effect",data);
        })
    },[])
    const [games, setGames]= useState([])
     const [formData, setFormData]= useState({
        date:'',
        gameId:'',
        gameType:'',
        session:''
    });
    const [go,setGo] = useState(false);
    const [winner, setWinner] = useState({
        winnerNumber:''
    });
    const [single, setSingle] = useState([]);
    const [singleClose, setSingleClose] = useState([]);
    const [jodi, setJodi] = useState([]);
    const [singlePana, setSinglePana] = useState([]);
    const [singlePanaClose, setSinglePanaClose] = useState([]);
    const [doublePana, setDoublePana] = useState([]);
    const [doublePanaClose, setDoublePanaClose] = useState([]);
    const [triplePana, setTriplePana] = useState([]);
    const [triplePanaClose, setTriplePanaClose] = useState([]);
    const [halfSangam, setHalfSangam] = useState([]);
    const [halfSangamClose, setHalfSangamClose] = useState([]);
    const [fullSangam, setFullSangam] = useState([]);
    const [showList, setShowList] = useState(false);
    const [jodiGali, setJodiGali] = useState([]);
    const [showDeclared, setShowDeclared] = useState(false);

    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    if(!current){
        return <Redirect to='/' />
    }

  

    const {
        date,gameId,session,gameType
    } = formData;
    const {
        winnerNumber
    } = winner;

    const onChange = e =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const onChange2 = e =>{
        setWinner({
            ...winner,
            [e.target.name]:e.target.value
        })
    }
    
    const onSubmit = async e =>{
        e.preventDefault();
        await db.collection('GamesData').doc(gameId).collection('Games').doc(moment(new Date(date)).format("DD-MM-YYYY")).get().then(async(docui)=>{
            if(!docui.exists){
                await db.collection('GamesData').doc(gameId).collection('Games').doc(moment(new Date(date)).format("DD-MM-YYYY")).set({
                    Numbers:'',
                    resultdeclared:false,
                    opendeclared:false,
                    opendeclared2:false,
                    closedeclared:false,
                    Bids:[],
                    winnerList:[]
                });
            }
        });
        await db.collection("GamesData").doc(gameId).collection('Games').doc(moment(new Date(date)).format("DD-MM-YYYY")).get().then((query) =>{
            var previousValue = query.data().Numbers;
            setWinner({
                winnerNumber:previousValue,
            })
        })
        setGo(true);

    }

    const handleShow =async () =>{
        console.log("show",date)
        setShowList(true);

        setShowDeclared(false);
        console.log("game id",gameId);
        await db.collection('GamesData').doc(gameId).collection('Games').doc(moment(new Date(date)).format("DD-MM-YYYY")).get().then((query)=>{
            console.log("game details",query.data())
            if(!query.exists){
                return;
            }
            var temp1 = [];
            var temp2 = [];
            var temp3 = [];
            var temp4 = [];
            var temp5 = [];
            var temp6 = [];
            var temp7 = [];
            var temp8 = [];
            var temp9 = [];
            var temp10 = [];
            var temp11 = [];
            var temp12 = [];
            var gali1 = [];
           query.data().Bids.forEach((doc)=>{
                if(doc.type === "Single Digit" && doc.session === "Open"){
                    temp1.push(doc);
                }
                else if(doc.type === "Single Digit" && doc.session === "Close"){
                    temp8.push(doc);
                }
                else if(doc.type === "Jodi"){
                    temp2.push(doc);
                }
                else if(doc.type === "Single Panna" && doc.session === "Open"){
                    temp3.push(doc);
                }
                else if(doc.type === "Single Panna" && doc.session === "Close"){
                    temp9.push(doc);
                }
                else if(doc.type === "Double Panna" && doc.session === "Open"){
                    temp4.push(doc);
                }
                else if(doc.type === "Double Panna" && doc.session === "Close"){
                    temp10.push(doc);
                }
                else if(doc.type === "Triple Panna" && doc.session === "Open"){
                    temp5.push(doc);
                }
                else if(doc.type === "Triple Panna" && doc.session === "Close"){
                    temp11.push(doc);
                }
                else if (doc.type === "Half Sangam" && doc.session === "Open"){
                    temp6.push(doc);
                }
                else if (doc.type === "Half Sangam" && doc.session === "Close"){
                    temp12.push(doc);
                }
                else if(doc.type === "Full Sangam"){
                    temp7.push(doc);
                }
                else if(doc.type === "Jodi Digit"){
                    gali1.push(doc);
                }
            })
        
            var final1 =temp1.filter((t) => t.number == winnerNumber[4]);
            console.log("askdfjaksdjf",final1)
            setSingle(final1);
            console.log("single",single)
            var final2 =temp2.filter((t) => t.number == winnerNumber.slice(4,6));
            setJodi(final2);
            var final3 =temp3.filter((t)=> t.number == winnerNumber.slice(0,3));
            setSinglePana(final3);
            var final4 =temp4.filter((t)=> t.number == winnerNumber.slice(0,3));
            setDoublePana(final4)
            var final5 =temp5.filter((t)=> t.number == winnerNumber.slice(0,3));
            console.log("triple",final5);
            setTriplePana(final5);
            var final6 =temp6.filter((t)=> t.number == winnerNumber[5] && t.extraNumber == winnerNumber.slice(0,3));
            setHalfSangam(final6);
            var final7 =temp7.filter((t) => t.number == winnerNumber.slice(0,3) && t.extraNumber == winnerNumber.slice(7,10));
            setFullSangam(final7);
            var final8 =temp8.filter((t) => t.number == winnerNumber[5]);
            setSingleClose(final8);
            var final9 = temp9.filter((t)=> t.number == winnerNumber.slice(7,10));
            setSinglePanaClose(final9);
            var final10 = temp10.filter((t)=> t.number == winnerNumber.slice(7,10));
            setDoublePanaClose(final10);
            var final11 = temp11.filter((t)=> t.number == winnerNumber.slice(7,10));
            setTriplePanaClose(final11);
            var final12 = temp12.filter((t)=> t.number == winnerNumber[4] && t.extraNumber == winnerNumber.slice(7,10));
            setHalfSangamClose(final12);
            var finalGali1 = gali1.filter((t)=> t.number == winnerNumber);
            setJodiGali(finalGali1);

        })

    }

    const handleDeclare = async () =>{
        console.log("declare result");
        var openwasDeclared = false;
        var closewasDeclared = false;
        var resultAlready = false;
        await db.collection('GamesData').doc(gameId).collection('Games').doc(moment(new Date(date)).format("DD-MM-YYYY")).get().then((query)=>{
            resultAlready = query.data().resultdeclared;
            if(query.data().closedeclared){
                openwasDeclared=true;
                closewasDeclared=true;
            }
            else if(query.data().opendeclared){
                openwasDeclared=true;
            }
        })

        if(winnerNumber === ""){
            alert("Please Enter Winning Number");
            return;
        }
        if(gameType === 'gali'){
           if(resultAlready){
            setShowDeclared(true);
            return;
           }
           else{
            alert("Result Declared Succefull!!");
           }
        }
        else{
            if(session === 'open'){
                if(openwasDeclared){
                    setShowDeclared(true);
                    return;
                }
                else{
                    alert("Open Result Declared Succefull!!");
                }
                
            }
            else{
                if(closewasDeclared){
                    setShowDeclared(true);
                    return;
                }
                else{
                    alert("Close Result Declared Succefull!!");
                }
                
            }
        }
        var finalWinnerList = [];
        var closedeclaredTemp = false;
        if(session === "open"){
            finalWinnerList.push.apply(finalWinnerList,single);
            finalWinnerList.push.apply(finalWinnerList,singlePana);
            finalWinnerList.push.apply(finalWinnerList,doublePana);
            finalWinnerList.push.apply(finalWinnerList,triplePana);
        }
        else{
            finalWinnerList.push.apply(finalWinnerList,singleClose);
            finalWinnerList.push.apply(finalWinnerList,jodi);
            finalWinnerList.push.apply(finalWinnerList,singlePanaClose);
            finalWinnerList.push.apply(finalWinnerList,doublePanaClose);
            finalWinnerList.push.apply(finalWinnerList,triplePanaClose);
            finalWinnerList.push.apply(finalWinnerList,halfSangam);
            finalWinnerList.push.apply(finalWinnerList,halfSangamClose);
            finalWinnerList.push.apply(finalWinnerList,fullSangam);
            closedeclaredTemp = true;
        }
        finalWinnerList.push.apply(finalWinnerList,jodiGali);
        console.log("finalArray",finalWinnerList);
        await db.collection("GamesData").doc(gameId).collection('Games').doc(moment(new Date(date)).format("DD-MM-YYYY")).update({'Numbers':winnerNumber,'resultdeclared':true,'opendeclared':true,'closedeclared':closedeclaredTemp,'winnerList':firebase.firestore.FieldValue.arrayUnion.apply(null,finalWinnerList)});
        
        for(let i=0;i<finalWinnerList.length;i++){
            var id=finalWinnerList[i].person;
            var amount=finalWinnerList[i].amount;
            var gameType2 = finalWinnerList[i].type;
            var balance = 0;
            console.log("initial amount",amount);
            await db.collection("UsersData").doc(id).get().then((query)=>{
                balance = query.data().Balance;
                console.log("BAlanace",balance);
            })
            var multiple =0;
            if(gameType === 'gali'){
                await db.collection("Rates").doc('gali').get().then((query)=>{
                    var tempp='';
                    switch(gameType2){
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
                    var temp='';
                    switch(gameType2){
                        case "Single Digit":
                            temp="singleDigit";
                            break;
                        case "Jodi":
                            temp="jodi";
                            break;
                        case "Single Panna":
                            temp="singlePanna";
                            break;
                        case "Double Panna":
                            temp="doublePanna";
                            break;
                        case "Triple Panna":
                            temp="triplePanna";
                            break;
                        case "Half Sangam":
                            temp="halfSangam";
                            break;
                        case "Full Sangam":
                            temp="fullSangam";
                            break;
                    }
                    var temp2 = query.data()[temp];
                    console.log("multiple",temp2);
                    multiple = parseInt(temp2)/10;
                    console.log("final multiple",multiple);
                })
            }

            var tempAmount = parseInt(amount)*parseInt(multiple);
            console.log("tempAmount",tempAmount)
            amount = tempAmount;
            console.log("Amount",amount,balance);
            balance = balance+parseInt(amount);
            var timestamptemp= firebase.firestore.Timestamp.now();
            var gamingName='';
            await db.collection("GamesData").doc(gameId).get().then((t) =>{
                    gamingName=t.data().name;
            })
            var obj = [{
                "amount":parseInt(amount),
                "game":gameId,
                "gameName":gamingName,
                "type":"winning",
                "timestamp":timestamptemp
            }];
            var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
            await db.collection("UsersData").doc(id).update({'Balance':balance,'Transaction':trans});
            setShowDeclared(false);
        }
       
        
    }

    const handleDeclareCancel = () =>{
        setShowDeclared(false);
    }

    const handleDeclareAgain = async () =>{
        if(session === 'open'){
             alert("Open Result Declared Again Succefull!!");
            
        }
        else{
            alert("Result Declared Again Succefull!!");
            
        }
        var finalWinnerList = [];
        var closedeclaredTemp2 = false;
        if(session === "open"){
            finalWinnerList.push.apply(finalWinnerList,single);
            finalWinnerList.push.apply(finalWinnerList,singlePana);
            finalWinnerList.push.apply(finalWinnerList,doublePana);
            finalWinnerList.push.apply(finalWinnerList,triplePana);
        }
        else{
            finalWinnerList.push.apply(finalWinnerList,singleClose);
            finalWinnerList.push.apply(finalWinnerList,jodi);
            finalWinnerList.push.apply(finalWinnerList,singlePanaClose);
            finalWinnerList.push.apply(finalWinnerList,doublePanaClose);
            finalWinnerList.push.apply(finalWinnerList,triplePanaClose);
            finalWinnerList.push.apply(finalWinnerList,halfSangam);
            finalWinnerList.push.apply(finalWinnerList,halfSangamClose);
            finalWinnerList.push.apply(finalWinnerList,fullSangam);
            closedeclaredTemp2 = true;
        }
        finalWinnerList.push.apply(finalWinnerList,jodiGali);
        console.log("finalArray",finalWinnerList);
        await db.collection("GamesData").doc(gameId).collection('Games').doc(moment(new Date(date)).format("DD-MM-YYYY")).update({'Numbers':winnerNumber,'resultdeclared':true,'opendeclared':true,'closedeclared':closedeclaredTemp2,'winnerList':firebase.firestore.FieldValue.arrayUnion.apply(null,finalWinnerList)});
        
        for(let i=0;i<finalWinnerList.length;i++){
            var id=finalWinnerList[i].person;
            var amount=finalWinnerList[i].amount;
            var gameType2 = finalWinnerList[i].type;
            var balance = 0;
            console.log("initial amount",amount);
            await db.collection("UsersData").doc(id).get().then((query)=>{
                balance = query.data().Balance;
                console.log("BAlanace",balance);
            })
            var multiple =0;
            if(gameType === 'gali'){
                await db.collection("Rates").doc('gali').get().then((query)=>{
                    var tempp='';
                    switch(gameType2){
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
                    var temp='';
                    switch(gameType2){
                        case "Single Digit":
                            temp="singleDigit";
                            break;
                        case "Jodi":
                            temp="jodi";
                            break;
                        case "Single Panna":
                            temp="singlePanna";
                            break;
                        case "Double Panna":
                            temp="doublePanna";
                            break;
                        case "Triple Panna":
                            temp="triplePanna";
                            break;
                        case "Half Sangam":
                            temp="halfSangam";
                            break;
                        case "Full Sangam":
                            temp="fullSangam";
                            break;
                    }
                    var temp2 = query.data()[temp];
                    console.log("multiple",temp2);
                    multiple = parseInt(temp2)/10;
                    console.log("final multiple",multiple);
                })
            }

            var tempAmount = parseInt(amount)*parseInt(multiple);
            console.log("tempAmount",tempAmount)
            amount = tempAmount;
            console.log("Amount",amount,balance);
            balance = balance+parseInt(amount);
            var timestamptemp= firebase.firestore.Timestamp.now();
            var gamingName='';
            await db.collection("GamesData").doc(gameId).get().then((t) =>{
                    gamingName=t.data().name;
            })
            var obj = [{
                "amount":parseInt(amount),
                "game":gameId,
                "gameName":gamingName,
                "type":"winning",
                "timestamp":timestamptemp
            }];
            var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
            await db.collection("UsersData").doc(id).update({'Balance':balance,'Transaction':trans});
    }
}

    const options = games.map((t) =>{
        return <option value={t.id}>{t.name}</option>
    })

    var singleListAmount=0;
    const singleList = single.map((t) =>{
        singleListAmount = singleListAmount + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var singleListAmountClose =0;
    const singleCloseList = singleClose.map((t) =>{
        singleListAmountClose = singleListAmountClose + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var jodiAmount =0;
    const jodiList = jodi.map((t) =>{
        jodiAmount = jodiAmount + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    
    var singlePanaAmount =0;
    const singlePanaList = singlePana.map((t) =>{
        singlePanaAmount = singlePanaAmount + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var singlePanaAmountClose =0;
    const singlePanaCloseList = singlePanaClose.map((t) =>{
        singlePanaAmountClose = singlePanaAmountClose + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var doublePanaAmount =0;
    const doublePanaList = doublePana.map((t) =>{
        doublePanaAmount = doublePanaAmount + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var doublePanaAmountClose =0;
    const doublePanaCloseList = doublePanaClose.map((t) =>{
        doublePanaAmountClose = doublePanaAmountClose + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var triplePanaAmount =0;
    const triplePanaList = triplePana.map((t) =>{
        triplePanaAmount = triplePanaAmount + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var triplePanaAmountClose =0;
    const triplePanaCloseList = triplePanaClose.map((t) =>{
        triplePanaAmountClose = triplePanaAmountClose + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var halfSangamAmount =0;
    const halfSangamList = halfSangam.map((t) =>{
        halfSangamAmount = halfSangamAmount + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var halfSangamAmountClose =0;
    const halfSangamCloseList = halfSangamClose.map((t) =>{
        halfSangamAmountClose = halfSangamAmountClose + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var fullSangamAmount =0;
    const fullSangamList = fullSangam.map((t) =>{
        fullSangamAmount = fullSangamAmount + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    var jodiGaliAmount =0;
    const jodiGaliList = jodiGali.map((t) =>{
        jodiGaliAmount = jodiGaliAmount + parseInt(t.amount);
        return (<div className='bids-list'>
        <p className='user-name'>User Name : {t.name}</p>
        <p className='bid-amount'>Amount : {t.amount}</p>
        </div>)
    });

    return (
        <div className="hero">
           <Navbar />
           <div className='declare-result container'>
           <form className="detailsform" onSubmit={onSubmit}>
                <div className="gamedetails">
                    <div className="form-group">
                    <label>Select Date</label>
                    <input 
                        type="date"
                        className="form-control"
                        placeholder="Select Date"
                        name="date"
                        value={date}
                        onChange={onChange}
                        required
                    />
                    </div>
                    
                    <div className="form-group">
                    <label>Select Game</label>
                    <select 
                        id="class" 
                        class="form-control" 
                        name="gameId"
                        placeholder='Select Game'
                        onChange={onChange} 
                        value={gameId} 
                        required 
                    >
                        <option value="">Select One Game</option>
                        {options}
                        
                    </select>
                    </div>
                    <div className="form-group">
                    <label>Select Game Type</label>
                    <select 
                        id="class" 
                        class="form-control" 
                        name="gameType"
                        placeholder='Select Game'
                        onChange={onChange} 
                        value={gameType} 
                        required 
                    >
                        <option value="">Select Game Type</option>
                        <option value="normal">Normal</option>
                        <option value="gali">Gali Desawar</option>
                        
                    </select>
                    </div>
                    <div className="form-group">
                    <label>Session</label>
                    <select 
                        id="class" 
                        class="form-control" 
                        name="session" 
                        placeholder='Select Session'
                        onChange={onChange} 
                        value={session} 
                        required 
                    >
                        <option value="">Select Session</option>
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                    </select>
                    </div>
                    
                </div>
                <button type="submit" className="btn btn-primary sendbtn" >Go</button>
                </form>
               {go &&  <form className="detailsform">
                <div className="gamedetails">
                    <div className="form-group">
                    <label>Enter Result</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Result"
                        name="winnerNumber"
                        value={winnerNumber}
                        onChange={onChange2}
                        onkeydown="return (event.keyCode!=13);"
                        required
                    />
                    </div>
                    
                   <div type="button" className='btn btn-large btn-secondary show-winner' onClick={handleShow}>Show winner List</div>
                   <div type="button" className='btn btn-large btn-secondary declare-winner' onClick={handleDeclare}>Declare Winner</div>
                </div>
                </form>}
                {showDeclared && <form className="detailsform">
                <div className="gamedetails">
                    <div className="form-group">
                    <div>Result Already Declared. If you want to update the result, Please Press 'Declare Again' !!</div>
                    </div>
                    
                   <div type="button" className='btn btn-large btn-secondary show-winner' onClick={handleDeclareCancel}>Cancel</div>
                   <div type="button" className='btn btn-large btn-secondary declare-winner' onClick={handleDeclareAgain}>Declare Again</div>
                </div>
                </form>}
                
                {showList && ((gameType === "normal") ? <div className='show-full-list'>
                    <div className='all-game-list'>
                    <h3 className='heading-game'>Single Digit ( Open Session )</h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{singleList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{singleListAmount}</p></p>
                    </div>
                        {singleList.length > 0 ? <div>{singleList}</div>:<div className='else-part'>No Bids</div>}
                    </div>
                    <div className='all-game-list'>
                    <h3 className='heading-game'>Single Digit ( CLose Session )</h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{singleCloseList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{singleListAmountClose}</p></p>
                    </div>
                        {singleCloseList.length > 0 ? <div>{singleCloseList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Jodi </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{jodiList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{jodiAmount}</p></p>
                    </div>
                        {jodiList.length > 0 ? <div>{jodiList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Single Panna ( Open Session) </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{singlePanaList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{singlePanaAmount}</p></p>
                    </div>
                        {singlePanaList.length > 0 ? <div>{singlePanaList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Single Panna ( CLose Session) </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{singlePanaCloseList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{singlePanaAmountClose}</p></p>
                    </div>
                        {singlePanaCloseList.length > 0 ? <div>{singlePanaCloseList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Double Panna ( Open Session) </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{doublePanaList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{doublePanaAmount}</p></p>
                    </div>
                        {doublePanaList.length > 0 ? <div>{doublePanaList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Double Panna ( Close Session) </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{doublePanaCloseList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{doublePanaAmountClose}</p></p>
                    </div>
                        {doublePanaCloseList.length > 0 ? <div>{doublePanaCloseList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Triple Panna ( Open Session) </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{triplePanaList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{triplePanaAmount}</p></p>
                    </div>
                        {triplePanaList.length > 0 ? <div>{triplePanaList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Triple Panna ( Close Session) </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{triplePanaCloseList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{triplePanaAmountClose}</p></p>
                    </div>
                        {triplePanaCloseList.length > 0 ? <div>{triplePanaCloseList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Half Sangam ( Open Session) </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{halfSangamList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{halfSangamAmount}</p></p>
                    </div>
                        {halfSangamList.length > 0 ? <div>{halfSangamList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Half Sangam ( Close Session) </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{halfSangamCloseList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{halfSangamAmountClose}</p></p>
                    </div>
                        {halfSangamCloseList.length > 0 ? <div>{halfSangamCloseList}</div>:<div className='else-part'>No Bids</div>}
                    </div>

                    <div className='all-game-list'>
                    <h3 className='heading-game'>Full Sangam </h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{fullSangamList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{fullSangamAmount}</p></p>
                    </div>
                        {fullSangamList.length > 0 ? <div>{fullSangamList}</div>:<div className='else-part'>No Bids</div>}
                    </div>


                </div>:
                <div className='show-full-list'>
                <div className='all-game-list'>
                    <h3 className='heading-game'>Jodi Digit</h3>
                    <div className='show-details'>
                        <p className='total-users'>Total User: <p className='span-div'>{jodiGaliList.length}</p></p>
                        <p className='total-amount'>Total Amount Bids:  <p className='span-div'>{jodiGaliAmount}</p></p>
                    </div>
                        {jodiGaliList.length > 0 ? <div>{jodiGaliList}</div>:<div className='else-part'>No Bids</div>}
                    </div>
                    </div>)}
           </div>
        </div>
    )
}

export default Declare;
