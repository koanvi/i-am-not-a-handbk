import { PrismaClient } from '@prisma/client'
import  {Article as ArticleModel}  from "./../models/Article";

const prisma = new PrismaClient()

export class Article {

  public static async get(id: number): Promise<ArticleModel> {
    return (await prisma.article.findUnique({where:{id:id}}) as ArticleModel);
  }

  public static async getList(): Promise<ArticleModel[]> {
    return (await prisma.article.findMany({}) as ArticleModel[]);
  }

  public static async create(article: ArticleModel): Promise<ArticleModel> {
    const newArticle = await prisma.article.create({
      data: article,
    });
    return newArticle as ArticleModel;
  }

  public static async update(article: ArticleModel): Promise<ArticleModel> {
    const updatedUser = await prisma.article.update({
      where: { id: article.id, },
      data: article,
    });
    return (updatedUser as ArticleModel);
  }

  public static async delete(id: number): Promise<ArticleModel> {
    return (await prisma.article.delete({ where: { id: id } }) as ArticleModel);
  }

}