const asyncHandler = require("express-async-handler");
const trackers = require("../models/trackers");
const users = require("../models/users");

const getTrackers = asyncHandler(async(req, res)=>{
    const user = req.user;
    const userObj = await users.findById(user.userid).populate('trackerMapping');;
    // const populatedList = await userObj
    const trackerList = userObj.trackerMapping;
    res.status(201).send(trackerList);
});

const createTracker = asyncHandler(async(req, res)=>{
    const tracker = req.body.tracker;
    const user = req.user;
    console.log("Create Tracker User :: "+ JSON.stringify(user));
    if(tracker){
        delete tracker._id;
        const newTracker = await trackers.create(tracker);
        const userObj = await users.findById(user.userid);
        userObj.trackerMapping.push(newTracker);
        await users.updateOne({_id:userObj._id}, userObj);
    }
    await getTrackers(req, res);
});

const updateTracker = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    const selectedTracker = req.body.tracker;
    console.log('Tracker ID :: '+ id);
    console.log('selectedTracker :: '+ JSON.stringify(selectedTracker));
    await trackers.findByIdAndUpdate({_id: id}, selectedTracker);
    await getTrackers(req, res);
});

const deleteTracker = asyncHandler(async(req, res)=>{
    
    const trackerID = req.params.id;
    console.log("tracker Id :: "+ trackerID);
    try{
        await trackers.deleteOne({_id : trackerID});
    }catch(e){
        console.log(e);
    }
    await getTrackers(req, res);
});

module.exports = {getTrackers, createTracker, updateTracker, deleteTracker};