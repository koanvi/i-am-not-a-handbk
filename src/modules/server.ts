import express, { Express, Request, Response } from 'express';

import { Article as ArticleController } from "./../controllers/Article";
import { Article } from "./../models/Article";

export class Server {
  constructor() {

    const app: Express = express();
    const port = process.env.PORT;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    /**
     * Setting headers
     */
    app.use((req, res, next) => {
      res.header('x-powered-by', 'koanvi');
      res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
      res.header('Access-Control-Allow-Methods', 'GET,POST');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      next();
    });

    app.get('/article', async (req: Request, res: Response) => {
      try {
        res.json(await ArticleController.getList());
      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }
    });

    app.get('/article:id', async (req: Request, res: Response) => {
      try {

        if (!req.params["id"]) {
          res.status(400).json(new Error("need id param"));
        }

        res.json(await ArticleController.get(+req.params["id"]));

      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }
    });

    app.post('/article', async (req: Request, res: Response) => {
      try {

        if (!req.body["Article"]) {
          res.status(400).json(new Error("need Article param"));
        }

        res.json(await ArticleController.create(req.body["Article"]));

      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }

    });

    app.put('/article', async (req: Request, res: Response) => {
      try {

        if (!req.body["Article"]) {
          res.status(400).json(new Error("need Article param"));
        }

        res.json(await ArticleController.update(req.body["Article"]));

      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }

    });

    app.get('/', async (req: Request, res: Response) => {
      res.status(418).send({ error: '👽' });
    });

    app.listen(port, () => {
      console.log(`🚀🚀🚀 [server]: Server is running at http://localhost:${port}`);
    });

  }
}

