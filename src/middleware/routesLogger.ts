import { Request, Response, NextFunction } from 'express';
import Log from '../helpers/logger';

const routerInfoLogger = (req: Request, res: Response, next: NextFunction) => {
  const logger = Log.getLogger();
  if (process?.env?.NODE_ENV === 'development') {
    logger.debug(`${req.method}: ${req.url}`);
  }
  return next();
};

export default routerInfoLogger;
