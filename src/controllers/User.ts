import { PrismaClient } from '@prisma/client'
import { User as UserModel } from "./../models/User";

const prisma = new PrismaClient()

export class User {

  static async get(id: number): Promise<UserModel> {
    return (await prisma.user.findUnique({ where: { id: id } }) as UserModel);
  }

  static async getByCredentials(credentials: { login: string, password: string }): Promise<UserModel> {
    return (await prisma.user.findFirst({
      where: {
        name: credentials.login,
        password: credentials.password,
      }
    }) as UserModel);
  }

  static async getList(): Promise<UserModel[]> {
    return (await prisma.user.findMany({}) as UserModel[]);
  }


}

//todo:create password hash function