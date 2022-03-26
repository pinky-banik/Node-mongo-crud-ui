import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data=>setUsers(data))
    },[])

    //Delete an user
    const handleDeleteUser =id=>{
        const proceed = window.confirm('Are you Sure,you want to delete?')
        if(proceed){
            const url=`http://localhost:5000/users/${id}`;
        console.log(id);
        fetch(url,{
            method:"Delete"
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.deletedCount > 0) {
                alert('deleted successfully');
                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers);
            }
        })
        }
    }
    return (
        <div>
            <h2>Users Available : {users.length}</h2>
            <ul>
                {
                    users.map(user=><li className='m-2'
                    key={user._id}>
                        {user.name}::{user.email} 
                        <Link to={`/users/update/${user._id}`}><button className='mx-2'>update</button></Link>
                        <button onClick={()=>handleDeleteUser(user._id)} className='text-danger mx-2 rounded'>x</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;