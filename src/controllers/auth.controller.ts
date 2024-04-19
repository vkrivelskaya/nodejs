import { Request, Response } from 'express';
import * as Joi from 'joi';
import { getUser, registerUser } from '../services/users.service';
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const register = async (req: Request, res: Response) => {
    try {
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ data: null, error: { message: error.details[0].message } });
        }

        const { email, password, role } = req.body;

        const oldUser = await getUser(email);

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const user = await registerUser(email, password, role);

        if (user) {
            const {password, ...userDetails} = user;
            console.log(password);
            return res.status(201).json({data: userDetails, error: null});
        } else {
            return res.status(500).json({
                data: null,
                error: {
                    message: 'Internal Server error'
                }
            });
        }
    } catch (error) {
        console.error('Error register user:', error);
        return res.status(500).json({
            data: null,
            error: {
                message: 'Internal Server error'
            }
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ data: null, error: { message: error.details[0].message } });
        }

        const { email, password } = req.body;

        const user = await getUser(email);
        console.log(user);

        if (!user) {
            return res.status(404).json({
                data: null,
                error: {
                  message: "No user with such email or password"
                }
            });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user.id, email, role: user.role },
                process.env.TOKEN_KEY!,
                {
                    expiresIn: "2h",
                }
            );

            return res.status(200).json({
               data: token,
               error: null
            });
        }
        res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.error('Error register user:', error);
        return res.status(500).json({
            data: null,
            error: {
                message: 'Internal Server error'
            }
        });
    }
};