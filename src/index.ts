
import { Server } from "./modules/server";
import "dotenv-defaults/config";

(async () => {


  console.log(`I was started 🚀🚀🚀 at directory: ${__dirname}`);
  
  new Server();


})();
