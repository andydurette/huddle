import React from "react";

function User(props) {

    function handleClick() {
        props.onDelete(props.id);
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <button onClick={handleClick}>DELETE</button>
        </div>
    );
}

export default User;