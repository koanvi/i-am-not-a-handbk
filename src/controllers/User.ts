import { PrismaClient } from '@prisma/client'
import { User as UserModel } from "./../models/User";

const prisma = new PrismaClient()

export class User {

  static async get(id: number): Promise<UserModel> {
    return (await prisma.user.findUnique({ where: { id: id } }) as UserModel);
  }

  static async getList(): Promise<UserModel[]> {
    return (await prisma.user.findMany({}) as UserModel[]);
  }


}
