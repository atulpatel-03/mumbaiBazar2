import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import { Link, Redirect } from "react-router-dom";
import fire from '../fire';
import "../asserts/scss/Users.scss";
import firebase from 'firebase';
import userIcon from "../asserts/images/user_icon.png";
import moment from 'moment';

const Users = () => {
    useEffect(() =>{
        db.collection("UsersData").onSnapshot( (doc) => {
            const data1 = doc.docs.map((doc) =>(
                {
                id: doc.id,
                fullInfo:false,
                ...doc.data()
            }))
            console.log("data",data1);
            setAllUsers(data1);
            setAllUsersTemp(data1);
        })
        db.collection("UsersData").where('active', '==', false).onSnapshot((query) => {
            const data2 = query.docs.map((doc) =>({
                id: doc.id,
                fullInfo:false,
                ...doc.data()
            }))
            setUsers(data2);
        })
        console.log("users effect")
        db.collection("Settings").doc('data').onSnapshot((query) => {
            var temp = query.data().bonus;
            console.log("rates effect",temp); 
            setBonusRate(temp);
            console.log("temp",temp)
        })
    },[])

    const [users,setUsers] = useState([]);
    const [bonusRate, setBonusRate] = useState("");
    const [allUsers,setAllUsers] = useState([]);
    const [allUsersTemp,setAllUsersTemp] = useState([]);
    const [check,setCheck]= useState(false);
    const [referClick, setReferClcik] = useState(false);
    const [userInfo, setUserInfo] = useState({
        addFund:'',
        withDrawFund:'',
        userName:'',
        phoneNo:'',
        notifyMsg:'',
        notifyTitle:''
    });

    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();
    var funs = fire.functions();

    if(!current){
        return <Redirect to='/' />
    }

    
    const { addFund, withDrawFund, userName, phoneNo, notifyMsg, notifyTitle} = userInfo;

    const onChange = e =>{
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit1 = async(id) =>{
        if(addFund === ""){
            alert("Please Add Fund");
            return;
        }
        var balance =0;
        await db.collection("UsersData").doc(id).get().then((doc) =>{
            balance = doc.data().Balance;
        })
        console.log("before",balance)
        balance = balance + parseInt(addFund);
        console.log("After",balance);
        var timestamptemp= firebase.firestore.Timestamp.now();
            var obj = [{
                "amount":addFund,
                "game":'',
                "gameName":'',
                "type":"addamount",
                "timestamp":timestamptemp
            }];
        var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
        await db.collection("UsersData").doc(id).update({'Balance':balance,'Transaction':trans});
        setUserInfo({
            ...userInfo,
            addFund:'',
        });

        if(referClick){
            console.log("chalraha")
            var referedByTemp = "";
            await db.collection("UsersData").doc(id).get().then((val) =>{
                referedByTemp= val.data().referedby;
                console.log("referedby",referedByTemp,val.data().referedby);
            });
            var referedId = "";
            await db.collection("UsersData").where("mycode","==",referedByTemp).get().then((val) =>{
                referedId = val.docs[0].id;
            });

            var tempReferBalance =0;
            await db.collection("UsersData").doc(referedId).get().then((doc) =>{
                tempReferBalance = doc.data().Balance;
            })
            console.log("before",tempReferBalance);
            var addFundPercet = parseInt(addFund);
            tempReferBalance = tempReferBalance + addFundPercet*0.20;
            console.log("After",tempReferBalance);
            var timestamptemp= firebase.firestore.Timestamp.now();
                var obj = [{
                    "amount":addFundPercet*0.20,
                    "game":'',
                    "gameName":'',
                    "type":"bonus",
                    "timestamp":timestamptemp
                }];
            var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
            await db.collection("UsersData").doc(referedId).update({'Balance':tempReferBalance,'Transaction':trans});
            setReferClcik(false);
        }


    }

    const checkboxClick = () =>{
        console.log("check",referClick)
        setReferClcik(!referClick);
    }

    const handleSubmit2 = async (id) =>{
        if(withDrawFund === ""){
            alert("Please Enter Withdraw Fund");
            return;
        }
        var balance =0;
        await db.collection("UsersData").doc(id).get().then((doc) =>{
            balance = doc.data().Balance;
        })
        console.log("before",balance)
        balance = balance - parseInt(withDrawFund);
        console.log("After",balance);
        var timestamptemp= firebase.firestore.Timestamp.now();
            var obj = [{
                "amount":withDrawFund,
                "game":'',
                "gameName":'',
                "type":"withdrawal",
                "timestamp":timestamptemp
            }];
        var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
        await db.collection("UsersData").doc(id).update({'Balance':balance,'Transaction':trans});
        setUserInfo({
            ...userInfo,
            withDrawFund:'',
        });
    }

    const handleSubmit3 = () =>{
        if(userName === ""){
            setAllUsers(allUsersTemp);
        }
        else{
            let searchArr = allUsers.filter((t) => (t.Name.toLowerCase().includes(userName.toLowerCase())))
        setAllUsers(searchArr);
        }
        // setUserInfo({
        //     ...userInfo,
        //     userName:''
        // })
    }

    const handleNotify = async (id) =>{
        console.log("idfs",id,notifyMsg,notifyTitle);
        var userToken = "";
        await db.collection("UsersData").doc(id).get().then((val) =>{
            userToken = val.data().deviceToken;
        })

       var addNotificat =  funs.httpsCallable("sendNotification");
       addNotificat({
        token:userToken,
        payload:{
            "notification":{
                "title":notifyTitle,
                "body":notifyMsg
            }
        },
       })

       var timestamptemp= firebase.firestore.Timestamp.now();
            var obj = [{
                "body":notifyMsg,
                "title":notifyTitle,
                "timestamp":timestamptemp
            }];
        var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
        await db.collection("UsersData").doc(id).update({'alerts':trans});

       setUserInfo({
           ...userInfo,
           notifyMsg:'',
           notifyTitle:''
       })
    }
    const handleSubmit4 = () =>{
        if(phoneNo === ""){
            setAllUsers(allUsersTemp);
        }
        else{
            let searchArr = allUsers.filter((t) => (t.phone.toLowerCase().includes(phoneNo.toLowerCase())))
        setAllUsers(searchArr);
        }
        // setUserInfo({
        //     ...userInfo,
        //     userName:'',
        //     phoneNo:''
        // })
    }

    const handleClick =async (id) =>{
        console.log("id",id)
        var timestamptemp= firebase.firestore.Timestamp.now();
            var obj = [{
                "amount":parseInt(bonusRate),
                "game":'',
                "gameName":'',
                "type":"bonus",
                "timestamp":timestamptemp
            }];
        if(parseInt(bonusRate) >0){
            var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
        await db.collection("UsersData").doc(id).update({'active':true,'Balance':parseInt(bonusRate),'Transaction':trans})
        console.log("done");
        }
    }

    // const handleClick2 =async (id) =>{
    //     console.log("id",id)
    //     var timestamptemp= firebase.firestore.Timestamp.now();
    //         var obj = [{
    //             "amount":parseInt(bonusRate),
    //             "game":'',
    //             "gameName":'',
    //             "type":"bonus",
    //             "timestamp":timestamptemp
    //         }];
    //    if(parseInt(bonusRate) > 0){
    //     var trans = firebase.firestore.FieldValue.arrayUnion.apply(null,obj);
    //     await db.collection("UsersData").doc(id).update({'active':false,'Balance':parseInt(bonusRate),'Transaction':trans})
    //     console.log("done");
    //    }
    // }

    const handleUnapproved = async () =>{
        setCheck(!check);
    }

    const handleView = (id) =>{
        console.log("inside view",id)
        let anotherTemp = allUsers.map((t) =>{
            if(t.id === id){
                return{
                    ...t,
                    fullInfo:!t.fullInfo
                }
            }
            return t;
        });
        console.log("another temp",anotherTemp)
        setAllUsers(anotherTemp);

    }

    const handleRemoveFilter = () =>{
         setUserInfo({
            ...userInfo,
            userName:'',
            phoneNo:''
        });
        setAllUsers(allUsersTemp);
    }
    const unapprovedUsers = users.map((t) =>( 
        <div className="approve-card">
                    <div className="name">Name - {t.Name}</div>
                    <div className="phone">Phone No. - <a href={"https://wa.me/+91"+t.phone}>{" "}<i class="fab fa-whatsapp-square whatsapp-icon"></i>{" "}{t.phone}</a> </div>
                    <div className="buttons">  
              
                <button type="button" className="btn btn-large approve-btn" onClick={() =>handleClick(t.id)}>Approve</button>
                </div>
                
        </div>
    ))

    const allUser = allUsers.map((t) =>{
        if(!t.active){
            return <div className="approve-card">
            <div className="name">Name - {t.Name}</div>
            <div className="phone">Phone No. - <a href={"https://wa.me/+91"+t.phone}>{" "}<i class="fab fa-whatsapp-square whatsapp-icon"></i>{" "}{t.phone}</a> </div>
            <div className="buttons">  
      
        <button type="button" className="btn btn-large approve-btn" onClick={() =>handleClick(t.id)}>Approve</button>
        </div>
        
        </div>
        }
        else if(t.fullInfo){
            return <div className="approve-card">
            <div className="name">Name - {t.Name}</div>
            <div className="phone">Phone No. - <a href={"https://wa.me/+91"+t.phone}>{" "}<i class="fab fa-whatsapp-square whatsapp-icon"></i>{" "}{t.phone}</a> </div>
            <div className="buttons">  
      
        <button type="button" className="btn btn-large btn-secondary hide-btn" onClick={()=>handleView(t.id)}>Hide</button>
        </div>
        <hr></hr>
        <div className='full-info-details'>
            <h2 className='heading-info'>{t.Name}</h2>
            <div className='other-info-full'>
            <div className='other-info'>
            <div className='image-div'><img className='user-img' src={userIcon} /></div>
            <div className='image-detail'>
                <div className='email'>Email - <a href={"mailto:" + t.Email}>{t.Email}</a></div>
                <div className='balance'>Balance - {t.Balance}</div>
                </div>
            </div>
            <div className='balance-button-div'>
                <button type="button" class="btn btn-large add-fund" data-toggle="modal" data-target="#exampleModal">
                Add Fund
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Fund</h5>
        <button type="button" className="close close-btn" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form className="gameform">
            <div className="gamedetail">
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="addFund"
                        value={addFund}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
        </form>
        <input type="checkbox" name="referClick" value={referClick} onClick={checkboxClick} />{" "}Send refer amount<br/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={() =>handleSubmit1(t.id)} data-dismiss="modal">Add Fund</button>
      </div>
    </div>
  </div>
</div>
 <button type="button" class="btn btn-large withdraw-fund" data-toggle="modal" data-target="#exampleModal2">
                Withdraw Fund
</button>

<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Withdraw Fund</h5>
        <button type="button" className="close close-btn" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form className="gameform">
            <div className="gamedetail">
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                        name="withDrawFund"
                        value={withDrawFund}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={() =>handleSubmit2(t.id)} data-dismiss="modal">Withdraw Fund</button>
      </div>
    </div>
  </div>
</div>
 <button type="button" class="btn btn-large withdraw-fund" data-toggle="modal" data-target="#exampleModal3">
 Send Notification
</button>
<div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Notification</h5>
        <button type="button" className="close close-btn" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form className="gameform2">
            <div className="gamedetail">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                        name="notifyTitle"
                        value={notifyTitle}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Message"
                        name="notifyMsg"
                        value={notifyMsg}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={() =>handleNotify(t.id)} data-dismiss="modal">Send Notification</button>
      </div>
    </div>
  </div>
</div>
            </div>
            </div>
            <h2 className='heading-info'>Transaction</h2>
            <div className='all-transcations container'>
            {t.Transaction.slice(0).reverse().map((a)=> {
                return <div className='transaction-info'>
                <div className='game-trans'>Game : {a.gameName}</div>
                    <div className='bid-amount'>Amount : {a.amount}</div>
                    <div className='bid-type'>Type : <div className={a.type}>{a.type}</div></div>
                    
                    <div className='trans-time'>Time - {moment.unix(a.timestamp.seconds).format('dddd, MMMM Do, YYYY h:mm:ss A')}</div>
                </div>
            })}
            </div>
        </div>
        </div>
        }
        else{
            return <div className="approve-card">
            <div className="name">Name - {t.Name}</div>
            <div className="phone">Phone No. -<a href={"https://wa.me/+91"+t.phone}>{" "}<i class="fab fa-whatsapp-square whatsapp-icon"></i>{" "}{t.phone}</a> </div>
            <div className="buttons">  
            {/* <button type="button" className="btn btn-large approve-btn unapprove-btn-color" onClick={()=>handleClick2(t.id)}>Unapprove</button> */}
        <button type="button" className="btn btn-large view-btn" onClick={()=>handleView(t.id)}>View</button>
        </div>
        </div>

        }
    })

    return (
        <div className="hero">
            <Navbar />
            <div className='unapproved-users'>
                <div className='btn btn-large btn-primary unapprove-btn' onClick={handleUnapproved}>{!check?"Show Unapproved Users":"Show All Users"}</div>
               
                <div className='search'>
                    <input type="text" id="form1" className="form-control search-bar" placeholder="Name" name="userName" value={userName} onChange={onChange}/>
                    <button type="button" className="btn btn-primary search-btn" onClick={handleSubmit3}>
                    <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className='search-2'>
                    <input type="text" id="form1" className="form-control search-bar" placeholder="Phone Number" name="phoneNo" value={phoneNo} onChange={onChange}/>
                    <button type="button" className="btn btn-primary search-btn" onClick={handleSubmit4}>
                    <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className='btn btn-large btn-primary remove-btn' onClick={handleRemoveFilter}>Remove Filters</div>
            </div>
            <h1 className="heading-user">{!check?"All Users":"Unapproved Users"} </h1>
            <div className="approve container">
            {check?unapprovedUsers:allUser}
            </div>
        </div>
    )
}

export default Users;
