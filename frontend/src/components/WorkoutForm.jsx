import axios from "axios"
import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () =>{
    const { dispatch }=useWorkoutsContext()
    const [title,setTitle]=useState('')
    const [load,setLoad]=useState('')
    const [reps,setReps]=useState('')
    const [error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const workout = {title:title, load:load, reps:reps}

        try{
            const response = await axios.post("http://localhost:3000/api/workouts",workout)
            const json=await response.data
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('New Workout added',json)
            dispatch({type:"CREATE_WORKOUT",payload:json})
        } catch(err){
            const efields=await err.response.data.emptyFields;
            const eStatement=await err.response.data.error;
            console.log(efields)
            setError(eStatement)
            setEmptyFields(efields)
        }
        
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type='text'
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title")? 'error' : ''}
            />
            <label>Load (in kg):</label>
            <input
                type='number'
                onChange={(e)=>setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes("load")? 'error' : ''}
            />
            <label>Reps:</label>
            <input
                type='text'
                onChange={(e)=>setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes("reps")? 'error' : ''}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm