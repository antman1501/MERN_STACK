import axios from "axios";
import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home=()=>{

    const {workouts, dispatch} = useWorkoutsContext()

    // const [workouts, setWorkouts] = useState(null)

    useEffect(()=>{
        const fetchWorkouts=async()=>{
            try{
                const response=await axios.get("http://localhost:3000/api/workouts")
                console.log(response)
                const json=await response.data
                console.log(json)
                // setWorkouts(json)
                dispatch({type:"SET_WORKOUTS",payload:json})
            } catch(err){
                console.log(err)
            }
        }
        fetchWorkouts()
    },[dispatch])

    return (
        <div className="Home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>{
                    return<>
                            <WorkoutDetails key={workout._id} workout={workout}/>
                        </>})}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home;