import user from "@/server/user";
import { NextResponse, type NextRequest } from "next/server";

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
    const users = await user.getUsers();
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
 *     responses:
 *       201:
 *         description: A successful response
 *       400:
 *         description: An internal error
 */
export const POST = async (req: NextRequest) => {
  try {
    const createdUser = await user.createUser();
    return NextResponse.json(createdUser);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};
