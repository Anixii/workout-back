import expressAsyncHandler from "express-async-handler";
import { prisma } from '../../prisma.js'
export const createNewExerciseLog = expressAsyncHandler(async(req,res)=>{
    const exerciseId = +req.params.exerciseId
    const exercise = await prisma.exercise.findUnique({
        where:{
            id: exerciseId
        }
    })
    let timesDefault = [];
    if(!exercise){
        res.status(404);
        throw new Error('Exercise not found')
    }
    for (let i = 0; i < exercise.times; i++) {
        timesDefault.push({
            weight: 0,
            repeat: 0
        })     
    }
    const exerciseLog = await prisma.exerciseLog.create({
        data: {
            user: {
                connect: {
                    id: req.user.id
                }
            },
            exercise: {
                connect: {
                    id: exerciseId
                }
            },
            times: {
                createMany: {
                    data: timesDefault
                }
            }
        },
        include: {
            times: true,
        }
    })
    res.json(exerciseLog)
})

export const getExercisesLogs = expressAsyncHandler(async(_,res)=>{
    const exerciseLogs = await prisma.exerciseLog.findMany({
        orderBy: {
			createdAt: 'desc',
		}
    });

    res.json(exerciseLogs)
});