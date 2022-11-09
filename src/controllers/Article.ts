import { PrismaClient } from '@prisma/client'
import  {Article as ArticleModel}  from "./../models/Article";

const prisma = new PrismaClient()

export class Article {

  static async get(id: number): Promise<ArticleModel> {
    return (await prisma.article.findUnique({where:{id:id}}) as ArticleModel);
  }

  static async getList(): Promise<ArticleModel[]> {
    return (await prisma.article.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },

      ],
    }) as ArticleModel[]);
  }

  static async create(article: ArticleModel): Promise<ArticleModel|null> {
    try {
      const newArticle = await prisma.article.create({
        data: article,
      });
      return newArticle as ArticleModel;      
    } catch (error) {
      console.log(error);
    } finally {
      return (null);
    }

  }

  static async update(article: ArticleModel): Promise<ArticleModel> {
    const updatedUser = await prisma.article.update({
      where: { id: article.id, },
      data: article,
    });
    return (updatedUser as ArticleModel);
  }

  static async delete(id: number): Promise<ArticleModel> {
    return (await prisma.article.delete({ where: { id: id } }) as ArticleModel);
  }

}
