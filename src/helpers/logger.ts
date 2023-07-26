import * as moment from 'moment';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, prettyPrint, colorize } = format;

export default class Log {
  public static getLogger() {
    const timestampFormat: string = moment().format('YYYY-MM-DD HH:mm:ss');
    return createLogger({
      format: combine(
        timestamp({ format: timestampFormat }),
        prettyPrint(),
        printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        colorize()
      ),
      level: 'debug',
      transports: [new transports.Console()],
    });
  }
}
