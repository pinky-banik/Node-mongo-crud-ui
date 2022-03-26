import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const UpdateUser = () => {
    const[user,setUser] =useState({});
    const {id} = useParams();

    useEffect(()=>{
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>setUser(data))
    },[])
    return (
        <div>
            <h2>Update User {user.name}</h2>
            <p>{id}</p>

        </div>
    );
};

export default UpdateUser;