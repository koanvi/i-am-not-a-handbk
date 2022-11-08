
import { Article } from "./../controllers/Article";
import { Article as ArticleModel } from "./../models/Article";
import { v4 as uuidv4 } from 'uuid';

export class Tests {

  static async TestAll() {
    let id = await Tests.TestArticleCreate();
    await Tests.TestArticleDelete(id);
  }

  static async TestArticleCreate(): Promise<number> {
    let article = new ArticleModel();
    article.title = "this is for tests purpose";
    article.text = uuidv4();
    console.log(`TestArticleCreate started`);
    console.log(`article text uuid createing:${article.text}`);
    let articleNew = await Article.create(article);
    if (articleNew.text != article.text) {
      console.log(`❎ TestArticleCreate`);
      console.log(JSON.stringify(articleNew));
      throw new Error("TestArticleCreate");
    }
    console.log(`✅ TestArticleCreate id:${articleNew.id}`);
    return (articleNew.id as number);
  }

  static async TestArticleGet() {
    throw new Error("not implementd");
  }

  static async TestArticleGetList() {
    throw new Error("not implementd");
  }

  static async TestArticleUpdate() {
    throw new Error("not implementd");
  }

  static async TestArticleDelete(id: number) {
    console.log(`TestArticleDelete started`);
    let articleDeleted = await Article.delete(id);
    if (articleDeleted.id != id) {
      console.log(`❎ TestArticleDelete`);
      throw new Error("TestArticleDelete");
    }
    console.log(`✅ TestArticleDelete id:${articleDeleted.id}`);
  }
}
