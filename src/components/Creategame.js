import React, {useState, useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from './Navbar';
import fire from '../fire';
import "../asserts/scss/Creategame.scss";
import moment from 'moment';

const Creategame = () => {
    useEffect(() =>{
        db.collection("GamesData").onSnapshot((query) => {
            var data = query.docs.map((doc) =>({
             ...doc.data()
            }))
            setGames(data);
            console.log("creategame effect");
        })
    },[])
    const [games, setGames] = useState([]);
    const [show, setShow] = useState(false);
    const [addGameShow, setAddGameShow] = useState(false);
    const [gameId,setId] = useState('');
    const [gameDetail, setGameDetail]= useState({
        gameName:'',
        start:'',
        end:'',
        type:''
    })
    var auth = fire.auth();
    var current = auth.currentUser;
    var db = fire.firestore();

    if(!current){
        return <Redirect to='/' />
    }

   
    
    const {
        gameName,start,end,type
    } = gameDetail;


    const onChange = e => {
        setGameDetail({...gameDetail, [e.target.name]: e.target.value})
        
    }

    const handleClick = (id,activity) =>{
        db.collection("GamesData").doc(id).update({'active':!activity});
        console.log("done")
    }

    
    const handleEdit = async (id) =>{
        setShow(true);
        setId(id);
        console.log("asdfsafassdfasdfasdf",id);
        await db.collection("GamesData").doc(id).get().then((doc) =>{
            var temp=doc.data()
            setGameDetail({
                gameName:temp.name,
                type:temp.type,
                start:temp.start,
                end:temp.end
            })
        })

    }

    const onSubmit = (id) =>{
        setShow(false);
        db.collection("GamesData").doc(id).update({'name':gameName,'start':start,'end':end,'type':type});
        setId('');
        setGameDetail({
            gameName:'',
            type:'',
            start:'',
            end:''
        })

    }
    
    const handleDelete = async (id) =>{
       db.collection("GamesData").doc(id).delete()
       console.log("Deleted")
    }
 
    const modelCLick = () =>{
        setShow(false);
        setAddGameShow(false);
        setGameDetail({
            gameName:'',
            type:'',
            start:'',
            end:''
        })

    }

    const showAddModel = () =>{
        setAddGameShow(true);
        setGameDetail({
            gameName:'',
            type:'',
            start:'',
            end:''
        })
    }

    const handleAddGame = e =>{
        e.preventDefault();
        db.collection("GamesData").add({
            active:true,
            name:gameName,
            type:type,
            start:start,
            end:end
        }).then((ref) =>{
            db.collection("GamesData").doc(ref.id).update({id:ref.id})
            var formate1 = "DD-MM-YYYY";
            var mytime= moment(new Date()).format(formate1);
            db.collection("GamesData").doc(ref.id).collection("Games").doc(mytime.toString()).set({
                Numbers:'',
                resultdeclared:false,
                opendeclared:false,
                opendeclared2:false,
                closedeclared:false,
                Bids:[],
                winnerList:[]
            })
        })
        setAddGameShow(false);
        setGameDetail({
            gameName:'',
            type:'',
            start:'',
            end:''
        })
    }

    const mygames = games.map((t)=>{
        if(t.active == false){
            return <div className="table-card">
            <div className="game-name">{t.name}</div>
            <div className="game-type">Game Type -  <p className={t.type}>{t.type}</p></div>
            <div className="start-time">Start Time - {t.start}</div>
            <div className="end-time">End Time - {t.end}</div>
            <div className="buttons-game"> 
            <div className='status-table'>
            <div className="btn btn-large inactive" onClick={() =>handleClick(t.id,t.active)}>Inactive</div>
            </div>
            {show &&  <div className="modal-primary-container">
         <div className="modal-primary search-modal">
           <form className="gameform" onSubmit={() =>onSubmit(gameId)}>
            <div className="gamedetail">
                <div className="form-group">
                    <label>Game Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Game Name"
                        name="gameName"
                        value={gameName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Game Type</label>
                    <select 
                        id="class" 
                        class="form-control" 
                        name="type" 
                        placeholder='Select Type'
                        onChange={onChange} 
                        value={type} 
                        required 
                    >
                        <option value="">None</option>
                        <option value="normal">Normal</option>
                        <option value="gali">Gali Desawar</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Start Time</label>
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Game Name"
                        name="start"
                        value={start}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Time</label>
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Game Name"
                        name="end"
                        value={end}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
            <button type="button" class="btn btn-secondary model2-btn2" onClick={modelCLick}>Cancel</button>
            <button type="submit" class="btn btn-primary model2-btn1">Save changes</button>
           
   
        </form>
        </div>
        </div>}
                    
            <div className='action-table'><i class="far fa-edit edit-btn" onClick={() =>handleEdit(t.id)}></i>
                    <i class="fas fa-trash delete-btn" onClick={() =>handleDelete(t.id)}></i></div>
            </div>
            </div>
        }
        else{
            return <div className="table-card">
            <div className="game-name">{t.name}</div>
            <div className="game-type">Game Type - <p className={t.type}>{t.type}</p></div>
            <div className="start-time">Start Time - {t.start}</div>
            <div className="end-time">End Time - {t.end}</div>
            <div className="buttons-game"> 
            <div className='status-table'>
            <div className="btn btn-large active" onClick={() =>handleClick(t.id,t.active)}>Active</div>
            </div>
            {show &&  <div className="modal-primary-container">
         <div className="modal-primary search-modal">
           <form className="gameform" onSubmit={() =>onSubmit(gameId)}>
            <div className="gamedetail">
                <div className="form-group">
                    <label>Game Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Game Name"
                        name="gameName"
                        value={gameName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Game Type</label>
                    <select 
                        id="class" 
                        class="form-control" 
                        name="type" 
                        placeholder='Select Type'
                        onChange={onChange} 
                        value={type} 
                        required 
                    >
                        <option value="">None</option>
                        <option value="normal">Normal</option>
                        <option value="gali">Gali Desawar</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Start Time</label>
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Game Name"
                        name="start"
                        value={start}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Time</label>
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Game Name"
                        name="end"
                        value={end}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
            <button type="button" class="btn btn-secondary model2-btn2" onClick={modelCLick}>Cancel</button>
            <button type="submit" class="btn btn-primary model2-btn1">Save changes</button>
           
   
        </form>
        </div>
        </div>}
                    
            <div className='action-table'><i class="far fa-edit edit-btn" onClick={() =>handleEdit(t.id)}></i>
                    <i class="fas fa-trash delete-btn" onClick={() =>handleDelete(t.id)}></i></div>
            </div>
           

</div>
        }

    })

    return (
        <div className="hero">
            <Navbar />
            <div className='for-margin'>
            <div className="create-page container">
           
<button type="button" className="btn btn-primary new-game" data-toggle="modal" data-target="#exampleModal" onClick={showAddModel}>
Add new Game
</button>

{addGameShow &&  <div className="modal-primary-container">
         <div className="modal-primary search-modal">
           <form className="gameform" onSubmit={handleAddGame}>
            <div className="gamedetail">
                <div className="form-group">
                    <label>Game Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Game Name"
                        name="gameName"
                        value={gameName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Game Type</label>
                    <select 
                        id="class" 
                        class="form-control" 
                        name="type" 
                        placeholder='Select Type'
                        onChange={onChange} 
                        value={type} 
                        required 
                    >
                        <option value="">None</option>
                        <option value="normal">Normal</option>
                        <option value="gali">Gali Desawar</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Start Time</label>
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Game Name"
                        name="start"
                        value={start}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Time</label>
                    <input
                        type="time"
                        className="form-control"
                        placeholder="Game Name"
                        name="end"
                        value={end}
                        onChange={onChange}
                        required
                    />
                </div>
            </div>
            <button type="button" class="btn btn-secondary model2-btn2" onClick={modelCLick}>Cancel</button>
            <button type="submit" class="btn btn-primary model2-btn1">Add Game</button>
           
   
        </form>
        </div>
        </div>}
                <div className="game-list">
                <table class="table">
                </table>
                <div className='all-games-cards'>
                {mygames}
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Creategame;
