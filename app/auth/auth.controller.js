import { faker } from '@faker-js/faker'
import { prisma } from '../prisma.js'
import asyncHandler from 'express-async-handler'
import { hash, verify } from 'argon2'
import { generateToken } from './generate-token.js'
import { UserFields } from '../utils/user.utils.js'
export const authUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body;
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})
	const isValidPassword = await verify(user.password, password);
	if(isValidPassword && user) { 
		const token = generateToken(user.id);
		res.json({user, token});
	} else{
		res.status(401);
		throw new Error('Email or password are not correct')
	}
	res.json(user)
})
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password, first_name, last_name } = req.body
	const isHaveUser = await prisma.user.findUnique({
		where: {
			email
		}
	})
	if (isHaveUser) {
		res.status(400)
		throw new Error('Такой пользователь уже существует!')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: first_name + " " + last_name
		},
		select: UserFields
	})
	const token = generateToken(user.id);
	
	res.json({user ,token})
})
