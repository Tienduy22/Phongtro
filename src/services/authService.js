import db from "../models/index";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { raw } from "mysql2";
require("dotenv").config();

export const registerService = ({ name, phone, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await db.User.findOrCreate({
                where: { phone },
                defaults: {
                    id: v4(),
                    name,
                    phone,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                },
            });
            const token =
                response[1] &&
                jwt.sign(
                    { id: response[0].id, phone: response[0].phone },
                    process.env.JWT_SECRET,
                    { expiresIn: "2d" }
                );

            resolve({
                msg: token ? "Register success" : "Phone number already in use",
                token: token || null,
            })
        } catch (error) {
            reject(error);
        }
    }
);

export const loginService = ({ phone, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const reponse = await db.User.findOne({ where: { phone }, raw: true });
            const isPasswordValid = reponse && bcrypt.compareSync(password, reponse.password);
            const token = isPasswordValid && jwt.sign(
                { id: reponse.id, phone: reponse.phone },
                process.env.JWT_SECRET,
                { expiresIn: "2d" }
            );

            resolve({
                msg: token ? "Login success" : reponse ? "Password is wrong" : "Phone number not found",
                token: token || null,
            })
        } catch (error) {
            reject(error);
        }
    }
)