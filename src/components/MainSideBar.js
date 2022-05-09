import React,{useState,useEffect} from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import PeopleIcon from '@material-ui/icons/People';
import { Avatar,IconButton} from '@material-ui/core';
import Users from '../components/Users';
import Sidebar from './Sidebar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const MainSideBar = () => {

    const navigate = useNavigate(); 

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src={'lp'} alt={`${true} photo`}/>
                <div className="sidebar__headerRight">
                    <IconButton onClick={()=>navigate('/')}>
                        <PeopleIcon/>
                    </IconButton>
                    <IconButton onClick={()=>navigate('/rooms')}>
                        <ForumIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <Users/>
            <Sidebar/>
        </div>
  )
}

export default MainSideBar
