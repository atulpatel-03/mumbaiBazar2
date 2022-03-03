import React, {useState} from 'react';
import "../asserts/scss/Model.scss";

const Addgame = () => {
    const [gameDetail, setGameDetail]= useState({
        gameName:'',
        start:'',
        end:''
    });

    const {
        gameName,start,end
    } = gameDetail;

    const onChange = e => {
        setGameDetail({...gameDetail, [e.target.name]: e.target.value})
        
    }

    return (
        <div className="modal-primary-container">
         <div className="modal-primary search-modal">
           <form className="gameform">
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
            <button type="button" class="btn btn-primary">Save changes</button>
   
        </form>
        </div>
        </div>
    )
}

export default Addgame;
