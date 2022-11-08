import { PrismaClient } from '@prisma/client'
import { User as UserModel } from "./../models/User";

const prisma = new PrismaClient()

export class User {

  public static get(): UserModel {
    return new UserModel();
  }

  public getList(id: number): UserModel[] {
    return [new UserModel()];
  }

  public async create(user: UserModel): Promise<UserModel> {
    const newUser = await prisma.user.create({
      data: user,
    });
    return newUser as UserModel;
  }

  // public async update(user: UserModel): Promise<UserModel> {
  //   let newUser = new
  //   // const newUser = await prisma.user.update({
  //   //   data: user,
  //   // });
  //   return newUser as UserModel;
  // }

  public delete(id: number): UserModel {
    return new UserModel();
  }

}
