import expressAsyncHandler from "express-async-handler";
import { prisma } from '../../prisma.js'
import { addPrevValues } from "./add-prev-values.util.js";

export const getExerciseLog = expressAsyncHandler(async(req,res)=>{
    const exerciseId = +req.params.exerciseId
    const exerciseLog = await prisma.exerciseLog.findUnique({
        where: {
            id: exerciseId,
        },
        include: {
            times: {
                orderBy: {
                    id: 'asc'
                }
            },
            exercise: true,
        }
    });
    if(!exerciseLog){
        res.status(404)
        throw new Error('Exercise log is not found')
    }
    const prevExercise = await prisma.exerciseLog.findFirst({
        where: {
            exerciseId: exerciseLog.exerciseId,
            userId: req.user.id,
            isCompleted: true
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            times: true
        }
    })
    let newTimes = addPrevValues(exerciseLog, prevExercise)
    res.json({...exerciseLog, times: newTimes})
});
