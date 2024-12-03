import { Router } from 'express'
import {
	createNewWorkout,
	deleteWorkout,
	getWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { createNewWorkoutLog } from './log/workout-log.controller.js'
import { updateWorkoutLog } from './log/update-workout-log.controller.js'
import { getWorkoutLog } from './log/get-workout-log.controller.js'

const router = Router()

router.route('/').post(protect, createNewWorkout).get(protect, getWorkouts)
router
	.route('/:id')
    .get(protect, getWorkout)
	.put(protect, updateWorkout)
	.delete(protect, deleteWorkout)
router.route('/log/:id').post(protect, createNewWorkoutLog).get(protect, getWorkoutLog)
router.route('/log/complete/:id').patch(protect, updateWorkoutLog)
export default router
