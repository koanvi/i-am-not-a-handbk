
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { User as UserController } from "./../controllers/User";
import { User } from "./../models/User";

// we use [access / refresh] infrastructure here

export async function getRefreshToken(credentials: { login: string, password: string }) {

  credentials.password = crypto.createHash('md5').update(credentials.password).digest("hex");

  let user: User = await UserController.getByCredentials(credentials);

  return jwt.sign({ user: user.id, isAdmin: user.isAdmin, type: "refresh" }, (process.env.JWT_SECRET as string), { expiresIn: process.env.JWT_REFRESH_EXPIRES });

  // ATTENTION!!! paranoid detected!!!

  // not da best idea to hold user info opened - we should use secure protocols (e.g. https)
  // todo: use cipher for opened data
  // 20221109 kokoko.

}

export function getAccessToken(token: string) {
  let user: { id: Number, isAdmin: boolean } = <{ id: Number, isAdmin: boolean }>jwt.verify(token, process.env.JWT_SECRET as string);
  return jwt.sign({ user: user.id, isAdmin: user.isAdmin, type: "access" }, (process.env.JWT_SECRET as string), { expiresIn: process.env.JWT_REFRESH_EXPIRES });
}

export function checkAccessToken(token: string) {
  let tokenInfo = <{ id: Number, isAdmin: boolean, type: string }>jwt.verify(token, process.env.JWT_SECRET as string);
  if (tokenInfo.type != "access") { return (null); }
  return (<{ id: Number, isAdmin: boolean }>tokenInfo);
}

