import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body
	const exercise = await prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	})
	res.json(exercise)
})
export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			workouts: true
		}
	})
	res.json(exercises)
})

export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body
	try {
		const exercise = await prisma.exercise.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				times,
				iconPath
			}
		})

		res.json(exercise)
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})
export const deleteExercise = asyncHandler(async (req, res) => {
	try {
		const exercise = await prisma.exercise.delete({
			where: {
				id: +req.params.id
			}
		})

		res.json({message: `Exercise "${exercise.name}" is deleted`})
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found')
	}
})
