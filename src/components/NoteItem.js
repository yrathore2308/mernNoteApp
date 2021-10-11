import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { title, tag, description, _id } = props.note;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{title}</h5>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                props.updateNote(props.note);
                props.showAlert("Note Updated Successfully", "success");
              }}
            ></i>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(_id);
                props.showAlert("Note Deleted Successfully", "success");
              }}
            ></i>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
