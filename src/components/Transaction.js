import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import moment from 'moment';
import fire from "../fire";
import { Link, Redirect } from "react-router-dom";
import "../asserts/scss/Transaction.scss";

const Transaction = () => {


    useEffect(() =>{
        var temp=[];
        db.collection("UsersData").onSnapshot((query)=>{
            query.docs.forEach((t)=>{
                temp.push(t.data());
            })
            console.log("temp",temp)
            setAllTransaction(temp);
        })
    },[]);

    const [allTransaction, setAllTransaction] = useState([]);
    const [allTransactionTemp, setAllTransactionTemp] = useState([]);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        sortDateFrom:'',
        sortDateTo:'',
        filter:'',
    });

    const { sortDateFrom, sortDateTo, filter } = formData;
    const onChange = e =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    if(!current){
        return <Redirect to='/' />
    }

    var myResult = [];
    var copyResult = [];
    var finalList  = allTransaction.map((s)=>(
        s.Transaction.slice(0).reverse().map((t)=>{
            myResult.push({
                Name:s.Name,
                ...t
            });
            copyResult.push({
                Name:s.Name,
                ...t
            });
            return {
                Name:s.Name,
                ...t
            }
           
        })
    ));

    const handleClick = () =>{
       setShow(true);
       
        var filterResult = myResult.filter((t)=>  t.timestamp.seconds >= Date.parse(sortDateFrom)/1000 && t.timestamp.seconds <= Date.parse(sortDateTo)/1000);
        console.log("list final",filterResult);
        setAllTransactionTemp(filterResult);
    }

    const handleClick2 = () =>{
        setShow(true);
       
        if(filter == "" && sortDateFrom == ""){
            setAllTransactionTemp(myResult);
        }
        else if(sortDateFrom != "" && sortDateTo != ""){
            var filterResult = allTransactionTemp.filter((t)=> t.type == filter);
            console.log("list final",filterResult);
            setAllTransactionTemp(filterResult);
        }
        else{
            var filterResult = myResult.filter((t)=> t.type == filter);
        console.log("list final",filterResult);
        setAllTransactionTemp(filterResult);
        }
    }

    
  console.log("asdfas",finalList,myResult,Date.parse(sortDateFrom),Date.parse(sortDateTo)/1000);
    return (
        <div className='hero'>
            <Navbar />
            <div className='start'>
           
            <h2 className='heading-info'>Transaction</h2>
            <div className='container sorting-div'>
            <label>From Date</label><input className='sorting-tech' type="date" name="sortDateFrom" value={sortDateFrom} onChange={onChange} />
            <label>To Date</label><input className='sorting-tech2' type="date" name="sortDateTo" value={sortDateTo} onChange={onChange} />
            <div  className='btn btn-large submit-button' onClick={handleClick}>Submit</div>
            </div>
            <div className='container'>
            <label className='search-type-label'>Search By Type</label>
            <select className='sorting-tech select-tech' name="filter" value={filter} onChange={onChange}>
                <option value="">Choose Type</option>
                <option value="bonus">Bonus</option>
                <option value="bidPlaced">Bid Placed</option>
                <option value="addamount">Add Amount</option>
                <option value="winning">Winning</option>
              </select>
              <button className='btn btn-large filter-btn' onClick={handleClick2}>Search</button>
            </div>
            <div className='all-transcations container'>
            
            {show ? (allTransactionTemp.map((a)=> {
                return <div className='transaction-info'>
                <div className='game-trans'>User Name : {a.Name}</div>
                <div className='game-trans'>Game : {a.gameName}</div>
                    <div className='bid-amount'>Amount : {a.amount}</div>
                    <div className='bid-type'>Type : <div className={a.type}>{a.type}</div></div>
                    <div className='bid'>Bid : {a.number} {" "} {a.extraNumber}</div>
                    <div className='bid'>Session : {a.session}</div>
                    <div className='bid'>Game Type : {a.type2}</div>
                    <div className='trans-time'>Time - {moment.unix(a.timestamp.seconds).format('dddd, MMMM Do, YYYY h:mm:ss A')}</div>
                </div>
            })):(myResult.map((a)=> {
                return <div className='transaction-info'>
                <div className='game-trans'>User Name : {a.Name}</div>
                <div className='game-trans'>Game : {a.gameName}</div>
                    <div className='bid-amount'>Amount : {a.amount}</div>
                    <div className='bid-type'>Type : <div className={a.type}>{a.type}</div></div>
                    <div className='bid'>Bid : {a.number} {" "} {a.extraNumber}</div>
                    <div className='bid'>Session : {a.session}</div>
                    <div className='bid'>Game Type : {a.type2}</div>
                    <div className='trans-time'>Time : {moment.unix(a.timestamp.seconds).format('dddd, MMMM Do, YYYY h:mm:ss A')}</div>
                </div>
            }))
            
            }
            </div>
            </div>
        </div>
    )
}

export default Transaction;
