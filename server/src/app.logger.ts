import { Logger, LoggerService } from '@nestjs/common';
import * as moment from 'moment';
import { format } from 'util';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

export class WinstonLogger extends Logger implements LoggerService {
  private dateFormat: string;
  private logger: winston.Logger;

  public constructor(private config: any) {
    super();
    this.dateFormat = this.config.dateFormat;

    // Set paths
    this.config.logs.filename = path.join(this.config.logs.directory, this.config.logs.filename);
    if (!fs.existsSync(this.config.logs.directory)) {
      fs.mkdirSync(this.config.logs.directory);
    }

    this.logger = winston.createLogger({
      format: winston.format.combine(winston.format.splat(), this.LogFormat()),
      transports: [new winston.transports.File(this.config.logs)],
    });
  }
  private LogFormat(): any {
    return winston.format.printf((info): string => {
      const levelUppercase: string = (info.level.toUpperCase() + ' '.repeat(7)).slice(0, 7);

      let msg: any = info.message;
      let context: string = null;
      if (typeof info.message !== 'string') {
        [msg, context] = info.message as [any, string];
      }
      let msgFormatted: string;
      if (Array.isArray(msg)) {
        msgFormatted = msg.map((arg: any): string => format(arg)).join(' # ');
      } else {
        msgFormatted = format(msg);
      }
      const now: string = moment(new Date()).format(this.dateFormat);
      return `${levelUppercase} ${now}${context ? ` [${context}]` : ''}: ${msgFormatted}`;
    });
  }

  // Overwrites
  public log(msg: any, context?: string): void {
    this.logger.info([msg, context]);
    super.log(msg, context);
  }

  public error(msg: any, trace?: string, context?: string): void {
    this.logger.error([msg, context]);
    super.error(msg, trace, context);
  }

  public warn(msg: any, context?: string): void {
    this.logger.warn([msg, context]);
    super.warn(msg, context);
  }

  public debug(msg: any, context?: string): void {
    this.logger.debug([msg, context]);
    super.debug(msg, context);
  }

  public verbose(msg: any, context?: string): void {
    this.logger.verbose([msg, context]);
    super.verbose(msg, context);
  }
}
