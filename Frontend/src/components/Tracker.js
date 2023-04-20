import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react'
import '../css/Tracker.css'
import CreateTrackerModal from './CreateTrackerModal';

const Tracker = () => {

    const [showCreateNewModal, setShowCreateNewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [labelMessage, setLabelMessage] = useState("Create Tracker");
    const [tracker, setTracker] = useState({_id:"", name:"", order:''});
    const [searchInput, setSearchInput] = useState('');
    const [allTrackerList, setAllTrackerList] = useState([]);


    const reducer = (trackerList, action) => {
      switch(action.type) {
          case 'SETLIST' : {
              trackerList = action.data;
              setAllTrackerList(action.data);
              setTracker({_id:"", name:"", order:""});
            //   trackerList.sort((a,b)=>{
            //     return a.order-b.order;
            //   });
              return trackerList;
          } 
          case 'FILTER' : {
            const newTrackerList = allTrackerList.filter((tracker, i)=>{
                if(tracker.name.includes(action.searchInput))
                    return tracker;
            })
            return newTrackerList;
        }
      } 
  }

  const handleEditClick = async (selectedTracker) => {
    console.log(selectedTracker);
    //   setTracker({_id:selectedTracker._id , name:selectedTracker.name, order:selectedTracker.order});
    setTracker({...selectedTracker});
    setLabelMessage("Edit Tracker");
    setShowEditModal(true);
  }

  const handleCreateTracker = async ()=>{
    console.log("Tracker Detail :: "+ tracker.name);
    const {data} = await axios.post(`http://localhost:5001/api/trackers` ,  {tracker}, {headers: { Authorization: `Bearer ${ window.sessionStorage.getItem('jwt') }`}});
    console.log('data :: ', data);
    if(data){
        dispatch({type:'SETLIST', data});
        setShowCreateNewModal(false);
    }else{
        console.log('Bad Data');
    }
  }

  const handleEditTracker = async () => {
    console.log("edit API with data :: "+ JSON.stringify(tracker));
    const {data} = await axios.put(`http://localhost:5001/api/trackers/${tracker._id}` ,  {tracker}, {headers: { Authorization: `Bearer ${ window.sessionStorage.getItem('jwt') }`}});
    if(data){
        dispatch({type:'SETLIST', data});
        setShowEditModal(false);
    }
    else{
        console.log('Bad Data');
    }
  }

  const handleDeleteClick = async (tracker) => {
    const {data} = await axios.delete(`http://localhost:5001/api/trackers/${tracker._id}`, {headers:{Authorization:`Bearer ${window.sessionStorage.getItem('jwt')}`}});
    
    if(data){
        dispatch({type:'SETLIST', data});
    }
    else{
        console.log('Bad Data');
    }
}

  const [trackerList, dispatch] = useReducer(reducer, []);
  
    const openCreateTrackerModal = ()=>{
        setLabelMessage("Create Tracker");
        setShowCreateNewModal(true);
    }

    const closeCreateTrackerModal = ()=>{
        setTracker({_id:"", name:"", order:""});
        setShowCreateNewModal(false);
    }

    const closeEditTrackerModal = ()=>{
        setTracker({_id:"", name:"", order:""});
        setShowEditModal(false);
    }

  const getTrackers = async ()=>{
    const {data} = await axios.get(`http://localhost:5001/api/trackers`, {headers:{
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }});
      console.log("data get :: "+ JSON.stringify(data));
    dispatch({type:'SETLIST', data});
    }

  useEffect(()=>{
    getTrackers();
  },[]);
  
  useEffect(()=>{
    console.log('tracker :: '+ JSON.stringify(tracker));
  }, [tracker]);

  useEffect(()=>{
    console.log("searchInput :: "+searchInput);
    dispatch({type:"FILTER", searchInput});
  }, [searchInput]);

  return (
    <div className='tracker-maincontainer'>
        <div className='tracker-navbar-container'>
            <div className='tracker-navItem'>
                <label htmlFor='trackerSearch'>Search Tracker : </label>
                <input className='tracker-searchInput' type='text' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} id='trackerSearch' placeholder="Search..."/>
            </div>
            <div className='tracker-navItem'><button className='tracker-TrackerButton' onClick={(event)=>{openCreateTrackerModal()}}>New Tracker</button></div>
        </div>
        <div className='trackerTableContiner'>
        <table className='trackerTable'>
            <thead className='trackerTableHeader'>
            <tr>
                <th style={{width:'40%'}}>
                    Name
                </th>
                <th style={{width:'40%'}}>
                    Order
                </th>
                <th style={{width:'20%'}}>
                    Actions
                </th>
            </tr>
            </thead>
            <tbody className='trackerTableBody'>
            {
                trackerList.map((tracker, i)=>{
                    return [
                    <tr key={i} >
                        <td style={{width:'40%'}}>
                            {tracker.name}
                        </td>
                        <td style={{width:'40%'}}>
                            {tracker.order}
                        </td>
                        <td style={{width:'20%'}}>
                            <button className='tracker-TrackerButton' onClick={(e)=>handleEditClick(tracker)}>Edit</button>
                            <button className='tracker-TrackerButton' onClick={(e)=>handleDeleteClick(tracker)}>Delete</button>
                        </td>
                    </tr>
                    ];
                })
            }
            </tbody>
        </table>
        </div>
        {showCreateNewModal||showEditModal ? <CreateTrackerModal closeMethod={showCreateNewModal?closeCreateTrackerModal:closeEditTrackerModal} createTracker={showCreateNewModal?handleCreateTracker:handleEditTracker} labelMsg={labelMessage}> 
            <div>
                <label htmlFor='tracker-name'>Name : </label>
                <input type="text" id='tracker-name' value={tracker.name} onChange={(e)=>{setTracker({...tracker, name: e.target.value})}} placeholder='Enter Name..'/>
            </div>
            <div>
                <label htmlFor='tracker-order'>Order : </label>
                <input type="number" id='tracker-order' value={tracker.order} onChange={(e)=>{setTracker({...tracker, order: e.target.value})}} placeholder='Enter Order..'/>
            </div>
        </CreateTrackerModal>: null}

        {/* {showEditModal ? <CreateTrackerModal closeMethod={closeCreateTrackerModal} createTracker={handleCreateTracker} labelMsg={labelMessage}> 
            <div>
                <label htmlFor='tracker-name'>Name : </label>
                <input type="text" id='tracker-name' value={tracker.name} onChange={(e)=>{setTracker({...tracker, name: e.target.value})}} placeholder='Enter Name..'/>
            </div>
            <div>
                <label htmlFor='tracker-order'>Order : </label>
                <input type="number" id='tracker-order' value={tracker.order} onChange={(e)=>{setTracker({...tracker, order: e.target.value})}} placeholder='Enter Order..'/>
            </div>
        </CreateTrackerModal>: null} */}
        
    </div>
  )
}

export default Tracker