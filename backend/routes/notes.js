const express = require('express');
const fetchuser = require('../middlewares/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');

const router = express.Router();

//ROUTE:1  fetch all notes GET req for /fetchallnotes

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        return res.status(500).json({ error: "Some internal server error" });
    }


});

//ROUTE:2 adding a note using POST req for /addnotes   LOGIN required
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").exists(),
    body('description', 'Enter a valid description').isLength({ min: 3 })
], async (req, res) => {



    try {

        const errors = validationResult(req);

        if (!errors.isEmpty) {
            return res.status(401).send({ error: errors.array });
        }

        const { title, description, tag } = req.body;

        // we can also use await Note.create() 
        const note = new Note({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag,
        });

        //.save() returns a promise
        const savedNote = await note.save();

        res.status(200).send(savedNote);

    } catch (error) {
        res.status(500).json({ error: "Some internal server error" });
    }

});




//ROUTE:3 updating a note using PUT req /updatenote/id

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    
    try {
        const {title,description,tag} = req.body;
        
        const newNote = {};

        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }

        //id pass kr rhe ham log params mae , to find by the note by it.
        let note = await Note.findById(req.params.id);

        //agar note present nhi hai
        if(!note){
            return res.status(404).send("Note not Found");
        }
        
        // //note ke saath mae user ki id hai and user ki jo id hai hai , it shoud be same
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        //agar sab shi hai to lets update it.
        note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new:true});
        res.json(note);

    } catch (error) {
       res.status(500).json({ error: "Some internal server error" });
    }
});

//ROUTE:4 delete a note using POST req /updatenote/id
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    
    try {
        let note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).send("Note not found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Access Denied");
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json({"success":"Note has been deleted"});
        
    } catch (error) {
        res.status(500).json({ error: "Some internal server error" });
     }
});

module.exports = router;
