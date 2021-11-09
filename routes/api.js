const router = require('express').Router();
const path = require('path');
const Workout = require("../models/workout")

router.get("/api/workouts", (req, res)=> {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:{
                    $sum: '$exercises.duration'
                }
            }
        }
    ])
    .then(data =>{
        res.json(data)
    })
    .catch(er => {
        res.status(500).json({message:"Workout not found"})
    })

})//end get

router.put("/api/workouts/:id", (req,res)=>{
    console.log(req.body)
    console.log(req.params.id)
    Workout.findByIdAndUpdate(req.params.id, {
        $push: {
            exercises:req.body,
        }
    })
    .then(data => {
        res.json(data)
    })
    .catch(er => {
        res.status(500).json({message:"workout not added"})
    })
})//end put

router.post("/api/workouts", (req, res)=> {
    console.log(req.body, 'this is create excersive')
    Workout.create({})
    .then(data=>{
        res.json(data)
    })
    .catch(er=>{
        res.status(500).json({message:"workout not added"})
    })

})// end post 

router.get("/api/workouts/range", (req,res) =>{
    Workout.aggregate([{
        $addFields:{
            totalDuration: {
                $sum:'$exercises.duration'
            }
        }
    }])
    .sort({_id:-1})
    .limit(7)
    .then(data=>{
        res.json(data)
    })
    .catch(er=>{
        res.status(500).json({message:"Range not found"})
    })
})


module.exports = router;