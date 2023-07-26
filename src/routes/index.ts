import * as express from 'express';


const healthCheck = (req: express.Request, res: express.Response) =>
  res.status(200).send({
    success: true,
    message: 'service is running',
  });

export default class Routes {
  router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  public path() {
    this.router.use('/health-check', healthCheck);
    return this.router;
  }
}
