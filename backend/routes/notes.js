const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser');
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// getting all notes per user
router.get("/fetchAllNotes",fetchUser,async (req,res)=>{
   try {
    const notes=await Notes.find({user:req.user.id});
    res.json(notes); 
   } catch (error) {
    console.log("Error caught in catch block", error);
    res.status(500).send("INternal server error"); 
   }
});




// for adding notes-Route
router.post("/addNotes",fetchUser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must have atleast 5 characters").isLength({
      min: 5,
    }),
],async (req,res)=>{

    try {
        const {title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        } 
        const note=new Notes({
            title,description,tag,user:req.user.id
        });
        const savedNote=await note.save();
        res.send(savedNote);

        
    } catch (error) {
        console.log("Error caught in catch block", error);
        res.status(500).send("INternal server error");  
    }
   
 });

//  for updating an existing note
router.put("/updateNote/:id",fetchUser,async (req,res)=>{
    try {
        const {title,description,tag}=req.body;
        // create a newnote object which to be updated against that passed id
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        // find note to be updated and update the same
        const note=await Notes.findById(req.params.id);
        if(!note){
             return res.status(404).send("No note exits with this id")
        }

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        const updatednote=await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.json(updatednote);



        
    } catch (error) {
        console.log("Error caught in catch block", error);
        res.status(500).send("INternal server error");
    }
});

//  for deleting note by id
router.delete("/deleteNote/:id",fetchUser,async (req,res)=>{
    try {
        

        // find note to be updated and update the same
        let note=await Notes.findById(req.params.id);
        if(!note){
             return res.status(404).send("No note exits with this id")
        }

        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note=await Notes.findByIdAndDelete(req.params.id);
        res.json({
            "Status":"Deletion Successful",
            note:note
        });



        
    } catch (error) {
        console.log("Error caught in catch block", error);
        res.status(500).send("INternal server error");
    }
});
module.exports=router;