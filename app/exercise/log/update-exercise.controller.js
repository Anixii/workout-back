import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

export const updateExerciseLogTime = expressAsyncHandler(async (req, res) => {
	try {
		const { weight, repeat, isCompleted } = req.body
		const logTime = await prisma.exerciseTime.update({
			where: {
				id: +req.params.id
			},
			data: {
				weight,
				repeat,
				isCompleted
			}
		})
		res.json(logTime)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise log time is not found')
	}
})

export const updateCompleteExerciseLog = expressAsyncHandler(async(req,res) =>{
    try {
        const {isCompleted} = req.body
        const logTime = await prisma.exerciseLog.update({
			where: {
				id: +req.params.id
			},
			data: {
				isCompleted
			},
            include: {
                exercise: true,
                workoutLog: true
            }
		})
        res.json(logTime)
    } catch (error) {
        
        res.status(404)
		throw new Error('Exercise log time is not found')
    }
})
