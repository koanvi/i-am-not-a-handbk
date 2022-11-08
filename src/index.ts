
import { Server } from "./modules/server";
import { Tests as ArticleTest } from "./tests/article";

(async () => {

  console.log(`App was started 🚀🚀🚀 at directory: ${__dirname}`);
  
  if (process.argv.length == 2) {
    new Server();
    return;
  }

  switch (process.argv[2]) {
    case "test":
      await ArticleTest.TestAll();
      break;

    default:
      throw new Error("Incorrect argument");
      break;
  }

})();

