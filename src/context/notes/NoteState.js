import { useEffect, useState } from 'react';
import NoteContext from './noteContext';

const NoteState=(props)=>{
  
  const host="http://localhost:5000";
  const initialState=[ ];
  const [notes, setNotes] = useState(initialState);
 
    // get all notes
    const getAllNotes=async ()=>{
      const response=await fetch(`${host}/api/notes/fetchAllNotes`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
      })

      const responseJson=await response.json();
      console.log("all notes",responseJson);
      setNotes(responseJson);
    }


      // Add a note
      const addNote=async (note)=>{
        let payload={
          "title":note.title,
          "description":note.description,
          "tag":note.tag
        }
        
        // api call
        const response=await fetch(`${host}/api/notes/addNotes`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify(payload)
        })

        const jsonResponse=await response.json();
        console.log("Note added data ",jsonResponse);
        setNotes(notes.concat(jsonResponse))
      }
      // delete a note
      const deleteNote=async (id)=>{
        const response=await fetch(`${host}/api/notes/deleteNote/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        });
        const responseJson=await response.json();
        console.log("NOTES AFTER DELETION",responseJson);
        const newNotes=notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }
      // edit a note
      const editNote= async (id,title,tag,description)=>{
        const response=await fetch(`${host}/api/notes/updateNote/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        })

        const responseJson=await response.json();
        console.log("note updated result",responseJson);
        const newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            console.log("element matched",element);
            newNotes[index].title=title;
            newNotes[index].decription=description;
            newNotes[index].tag=tag;
            break;

          }
        }
        setNotes(newNotes);
        
      }
    return(
        <NoteContext.Provider value={{notes,setNotes,addNote,editNote,deleteNote,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
