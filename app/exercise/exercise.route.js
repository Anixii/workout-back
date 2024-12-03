import { Router } from 'express';
import { createNewExercise, deleteExercise, getExercises, updateExercise } from './exercise.contoller.js';
import { protect } from '../middleware/auth.middleware.js';
import { createNewExerciseLog, getExercisesLogs } from './log/exercise-log.controller.js';
import { getExerciseLog } from './log/get-exercise-log.controller.js';
import { updateCompleteExerciseLog, updateExerciseLogTime } from './log/update-exercise.controller.js';

const router = Router();

router.route('/').post(protect,createNewExercise).get(protect,getExercises);
router.route('/:id').put(protect,updateExercise).delete(protect, deleteExercise);
router.route('/log/:exerciseId').post(protect, createNewExerciseLog).get(protect, getExerciseLog)
router.route('/log').get(protect, getExercisesLogs)
router.route('/log/complete/:id').patch(protect, updateCompleteExerciseLog)
router.route('/log/time/:id').put(protect, updateExerciseLogTime)
export default router;
