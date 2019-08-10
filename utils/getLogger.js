const { createLogger, format, transports } = require('winston');


module.exports = function (serviceName) {
  const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
      format.errors({ stack: true }),
      format.simple(),
      // format.json({space: 1}),
      // format.colorize({ all: true }),

    ),
    defaultMeta: { service: serviceName },
    transports: [new transports.Console()]

  });
  return logger;
}






