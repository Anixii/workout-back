import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { calcMinute } from './calc-minute.js'

export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body
	const exerciseArray = await JSON.parse(exerciseIds)
	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseArray.map(id => ({ id: +id }))
			}
		}
	})

	res.json(workout)
})
export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			exercises: true
		}
	})
	res.json(workouts)
})
export const getWorkout = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findUnique({
		where: { id: +req.params.id },
		include: {
			exercises: true
		} 
	})
	if(!workouts){
		res.status(404);
		throw new Error('Workout not found')
	}
	const minutes = calcMinute(workouts.exercises.length)
	res.json({ ...workouts, minutes })
})

export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body
	const exercise = await JSON.parse(exerciseIds || "[]") 
	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					set: exercise.map(id => ({id: +id}) )
				}
			}
		})

		res.json(workout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})
export const deleteWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({ message: `Workout "${workout.name}" is deleted` })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found')
	}
})
