import express, { Express, Request, Response } from 'express';

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


      } catch (error) {
        console.error(error);
        res.status(418).json(error);
      }
    });

    app.post('/article', async (req: Request, res: Response) => {
      try {

        res.json({ status: "ok" });
      } catch (error) {
        console.error(error);
        res.status(418).json(error);
      }

    });

    app.get('/', async (req: Request, res: Response) => {
      res.status(404).send({ error: 'Нет такого адреса' });
    });

    app.listen(port, () => {
      console.log(`🚀🚀🚀 [server]: Server is running at http://localhost:${port}`);
    });

  }
}

