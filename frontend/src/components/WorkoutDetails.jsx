import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout})=>{
    const { dispatch }=useWorkoutsContext();

    const handleClick=async()=>{
        try{
            const response=await axios.delete('http://localhost:3000/api/workouts/'+workout._id)
            const json=await response.data;
            dispatch({type:"DELETE_WORKOUT",payload:json})
        } catch(err){
            console.error(err)
        }

    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails;