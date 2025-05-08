// src/service/loginservice.ts

import { NextResponse } from "next/server";
import { findUserByEmail } from "../Repository/userrepo";
import { comparePassword, generateToken } from "../../lib/auth";




export async function loginService(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
}
