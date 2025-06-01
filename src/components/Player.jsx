import {useState} from 'react';
export default function Player({name,symbol}){
    const [pName, setPName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

   

    function handleEditing(){
        setIsEditing(editing => !editing);
    }


    let playerName = <span className="player-name">{pName}</span>;
    
    if(isEditing){
        playerName = <input type="text" required value={pName} onChange={handleChange} />
    }
     function handleChange(event){
        setPName(event.target.value)
    }




    return (
  
            <li>
                <span className="player">
                    {playerName}
                    <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>

            </li>


    )


}