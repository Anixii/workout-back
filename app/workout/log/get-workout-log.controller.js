import expressAsyncHandler from "express-async-handler";
import { prisma } from '../../prisma.js'
import { calcMinute } from "../calc-minute.js";

export const getWorkoutLog = expressAsyncHandler(async(req,res)=>{
    const workoutId = +req.params.id
    const workoutLog = await prisma.workoutLog.findUnique({
        where: {
            id: workoutId,
        },
        include: {
            workout: {
                include: {
                    exercises: true
                }
            },
            exerciseLogs: {
                orderBy: {
                    id: 'asc'
                },
                include: {
                    exercise: true
                }
            }
        }
    });
    if(!workoutLog){
        res.status(404)
        throw new Error('workout log is not found')
    }
    const minutes = calcMinute(workoutLog.workout.exercises.length)
    res.json({...workoutLog, minutes})
});
