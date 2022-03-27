import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { findAllByAltText } from '@testing-library/react';

const UpdateUser = () => {
    const[user,setUser] =useState({});
    const {id} = useParams();

    useEffect(()=>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setUser(data))
    },[])
    const handleUpdateUser=e=>{
        const url=`http://localhost:5000/users/${id}`;
        fetch(url,{
            method:'PUT',
            headers:{
               'content-type':'application/json'
            },
            body : JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                alert('updated successfully');
                setUser({});
            }
        })
        e.preventDefault();
    }
    const handleNameChange=e=>{
        const updatedName = e.target.value;
        const updatedUser={name:updatedName,email:user.email};
        setUser(updatedUser);
    }
    const handleEmailChange=e=>{
        const updateEmail = e.target.value;
        const updatedUser={...user};
        updatedUser.email =updateEmail;
        setUser(updatedUser);
    }
    return (
        <div>
            <h2>Update User {user.name}</h2>
            <p>{id}</p>
            <form onSubmit={handleUpdateUser}>
               <input onChange={handleNameChange} type="text" value={user.name || ''}/>
               <input onChange={handleEmailChange} type="email" value={user.email || ''}/>
               <input type="submit" value="update" />
            </form>
        </div>
    );
};

export default UpdateUser;