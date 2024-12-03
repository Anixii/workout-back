import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

export const updateWorkoutLog = expressAsyncHandler(async (req, res) => {
	try {
		const workoutLog = await prisma.workoutLog.update({
			where: {
				id: +req.params.id
			},
			data: {
				isCompleted: true
			}
		})
		res.json(workoutLog)
	} catch (error) {
		res.status(404)
		throw new Error('workout log is not found')
	}
})
