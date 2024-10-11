import { zodError } from "@/server/error";
import user from "@/server/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
  try {
    const createdUser = await user.createOne(
      body.email,
      body.password,
      body.role
    );

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.log(error instanceof z.ZodError);
    if (error instanceof z.ZodError) {
      console.log(error.message, "Message");
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return new Response(null, {
      status: 500,
      statusText: (error as any).message,
    });
  }
};
