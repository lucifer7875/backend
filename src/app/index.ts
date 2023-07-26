import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as multer from 'multer';
import * as bodyParser from 'body-parser';
import path = require('path');
import DB from '../db/config';
import Routes from '../routes';
import ResponseBuilder from '../helpers/responseBuilder';
import routesLogger from '../middleware/routesLogger';
import CONSTANTS from '../constants';
import bodyParserError from '../middleware/bodyParserError';
import Log from '../helpers/logger';

dotenv.config();
const upload = multer({
  dest: '/tmp/assets',
});

export default class App {
  private app: express.Application;

  private logger = Log.getLogger();

  constructor() {
    this.app = express(); // init the application
    this.configuration();
    this.routes();
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
  public createConnection() {}

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment
   * variables it takes the default port 3001
   */
  public configuration() {
    this.createConnection();
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(cors(), express.json());
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */

  public async routes() {
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json({ limit: '50mb' }), bodyParserError);
    this.app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    const routes = new Routes();
    this.app.use(upload.any());
    this.app.use(routesLogger);
    this.app.use('/public', express.static(path.join('public')));
    this.app.use('/api', routes.path());
    this.app.use('/*', (req: express.Request, res: express.Response) =>
      ResponseBuilder.responseBuilder(
        res,
        404,
        CONSTANTS.MESSAGES.ERR_URL_NOT_FOUND
      )
    );
  }

  /**
   * Used to start the server
   */
  public async start() {
    const host = process.env.HOST_SERVER;
    const port = process.env.PORT || 3001;

    const __dirname1 = path.resolve();
    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static(path.join(__dirname1, '/frontend/build')));
      this.app.get('*', (req, res) => {
        res.sendFile('');
      });
    }

    this.app.listen(this.app.get('port'), () => {
      this.logger.info(`Server is running at http://${host}:${port}.`);
    });
    DB.connection();
  }
}

const server = new App(); // Create server instance
server.start(); // Execute the server
