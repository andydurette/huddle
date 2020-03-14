import React, {useState} from 'react';
import Footer from "./Footer";
import AddUser from "./AddUsers/AddUser";
import User from "./AddUsers/User";

function MainAddUser() {

    const [users, setUsers] = useState([]);

    function createUser(newUser) {
        setUsers(prevUsers => {
            return [...prevUsers, newUser];
        });
    }

    function deleteUsers(id) {
        setUsers(prevUsers => {
            return prevUsers.filter((userItem, index) => {
                return index !== id;
            });
        });
    }

    return (
        <section id="wrapper" className="user">
            <div id="wrapper-contents">
                <AddUser onAdd={createUser}/>
                {users.map((userItem, index) => {
                    return (
                        <User
                            key={index}
                            id={index}
                            name={userItem.name}
                            onDelete={deleteUsers}
                        />
                    );
                })}
            </div>
            {/* <Footer/> */}
        </section>
    )
}

export default MainAddUser;