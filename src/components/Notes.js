import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const history=useHistory();
  const { notes, setNotes, getAllNotes,editNote } = context;
  useEffect(() => {
    console.log("localStorage.getItem('token')",localStorage.getItem('token'));
    if(localStorage.getItem('token')){
      getAllNotes();
      props.showAlert("All Notes fetched Successfully","success");
    }
    else{
      props.showAlert("Try login to view your notes","primary");
      history.push("/login");
    }

  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
      id:"",
    etitle:"",
    edescription:"",
    etag:""
  })
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    

  };
  
  const handleSubmit=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully","success");
    setnote({
     
    etitle:"",
    edescription:"",
    etag:""
  })


  }
  const handleChange=(e)=>{
    setnote({
      ...note,
      [e.target.name]:e.target.value
    });

  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Note Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={note.etitle}
            minLength={5}
            required
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            name="edescription"
            onChange={handleChange}
            value={note.edescription}
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            name="etag"
            onChange={handleChange}
            value={note.etag}
          />
        </div>
                                    
        
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleSubmit} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length===0 && <h4>No notes To display</h4>  }
        {notes.map((note) => {
          return (
            <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
