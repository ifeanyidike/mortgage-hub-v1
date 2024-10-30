import user from "@/server/user";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Role } from "@/types/general";
import { NewUser } from "@/types/db";

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get Users
 *     description: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *         400:
 *            description: An error occurred
 */
export const GET = async (req: NextRequest) => {
  try {
    const users = await user.getAll();
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create user
 *     description: Creates a new User
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      email:
 *                          type: string
 *                      role:
 *                          type: string
 *                      auth0_sid:
 *                          type: string
 *                      profile_photo:
 *                          type: string
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *         description: An internal error
 */
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log("body", body);
  try {
    const role = body.role || "user";
    const dob = body.dob;
    const name = body.name;
    const createdUser = await user.createOne(
      body.email,
      body.password,
      role,
      dob,
      name
    );
    console.log("createdUser", createdUser);
    return NextResponse.json(createdUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("error", error.message);
      return NextResponse.json({ status: 400, error: error.errors });
    }
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};
