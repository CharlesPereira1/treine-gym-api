import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'

import { appRoutes } from '@/http/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation errors.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like datalog/newRelic/kibanaLogs etc...
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
