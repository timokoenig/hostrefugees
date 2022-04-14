import pino from 'pino'

const prodConfig = {
  level: 'info',
}

const devConfig = {
  level: 'debug',
  prettyPrint: {
    levelFirst: true,
  },
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
}

const logger = pino(process.env.NODE_ENV == 'production' ? prodConfig : devConfig)

export default logger
