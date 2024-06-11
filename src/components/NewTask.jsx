import { useState } from "react";
import app from "../firebase.js";
import {getAuth} from "firebase/auth";
import {getFirestore, addDoc, doc, collection} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app); 

const addTask = async (userID, projectID, tasks)=> {
  try{
    const taskColRef = collection(db, "users", userID, "projects", projectID, "tasks")
    const taskDocRef = await addDoc(taskColRef, tasks);
    return taskDocRef.id;
  }catch(error){
    console.error(  );
  }
 
}
export default function NewTask({ onAdd, projectID }) {
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }


  async function handleClick() {
    if (enteredTask.trim() === "") {
      return;
    }

    const user = auth.currentUser;
    if (user) {
      const taskData = {title: enteredTask, projectId: projectID}
      const taskId = await addTask(user.uid, projectID, taskData)
      if(taskId){
        onAdd({...taskData, id: taskId});
        setEnteredTask("");
      }
    
    } else{
      console.log("no authenticated user");
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-lg text-gray-900"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        className="text-gray-200 hover:text-gray-300 bg-gray-700 p-1.5 font-bold rounded-lg hover:bg-gray-600"
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
