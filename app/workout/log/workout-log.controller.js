import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

export const createNewWorkoutLog = expressAsyncHandler(async (req, res) => {
	const workout = await prisma.workout.findUnique({
		where: {
			id: +req.params.id
		},
		include: {
			exercises: true
		}
	})
	if (!workout) {
		res.status(404)
		throw new Error('Workout in not found!')
	}
	const workoutLog = await prisma.workoutLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			workout: {
				connect: {
					id: +req.params.id
				}
			},
			exerciseLogs: {
				create: workout.exercises.map(exercise => ({
					user: {
						connect: {
							id: req.user.id
						}
					},
					exercise: {
						connect: {
							id: exercise.id
						}
					},
					times: {
						create: Array.from({ length: exercise.times }, () => ({
							weight: 0,
							repeat: 0
						}))
					}
				}))
			}
		}
	})
    res.json(workoutLog)
})
