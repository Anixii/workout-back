import express from 'express'
import authRoutes from './app/auth/auth.route.js'
import userRoutes from './app/user/user.route.js'
import exercisesRoutes from './app/exercise/exercise.route.js'
import workoutRoutes from './app/workout/workout.route.js'
import dotenv from 'dotenv';
import morgan from 'morgan';
import { prisma } from './app/prisma.js';
import { errorHandler, notFound } from './app/middleware/error.middleware.js';
import path from 'path'
import cors from 'cors'
const app = express()

dotenv.config()

async function main() {
	if(process.env.NODE_ENV === 'development'){
	    app.use(morgan('dev'))
	}
    const PORT = process.env.PORT || 5000
	app.use(cors())
    app.use(express.json())
	const __dirname = path.resolve()
	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))
	
	app.use('/api/auth', authRoutes)
	app.use('/api/users', userRoutes)
	app.use('/api/exercises', exercisesRoutes)
	app.use('/api/workouts', workoutRoutes)

	app.use(notFound)
	app.use(errorHandler)
	
	app.listen(PORT, () => {
        console.log('Server is running' + PORT)
    })
}

main()
.then(async() => {
	await prisma.$disconnect()
}).catch(async e => {
	console.error(e);
	await prisma.$disconnect()
	process.exit(1)
})
