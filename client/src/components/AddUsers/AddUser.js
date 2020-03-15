import React, { useState } from "react";

function AddUser(props) {

    const [user, setUser] = useState({
        name: ""
    });

    function handleChange(event) {
        const { name , value } = event.target;

        setUser(prevUser => {
            return {
                ...prevUser,
                [name] : value
            };
        });
    }

    function submitUser(event) {
        props.onAdd(user);
        setUser({
            name: "",
        });
        event.preventDefault();
    }

    return (
        <div>
            <form>
                <input name="name" onChange={handleChange} value={user.name} placeholder="Name" />
                <button onClick={submitUser}>Add</button>
            </form>
        </div>
    );
}

export default AddUser;
