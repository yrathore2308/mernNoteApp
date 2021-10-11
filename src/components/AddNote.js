import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote}=context;
    const [note, setnote] = useState({
      title:"",
      description:"",
      tag:""
    })
    const handleSubmit=(e)=>{
      e.preventDefault();
      addNote(note);
      setnote({
        title:"",
        description:"",
        tag:""
      });
      props.showAlert("Note Addedd Successfully","success");



    }
    const handleChange=(e)=>{
      setnote({
        ...note,
        [e.target.name]:e.target.value
      });

    }
    useEffect(() => {

    }, [note])
    return (
        <div>
             <h2>Add your Note here...</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Note Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={handleChange}
            minLength={5}
            required
            value={note.title}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            minLength={5}
            required
            value={note.description}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={handleChange}
            value={note.tag}
          />
        </div>
                                    
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Add Note
        </button>
      </form> 
        </div>
    )
}

export default AddNote;
