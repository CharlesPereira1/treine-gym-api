import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

import { CreateGymServices } from '../create-gym-service'

export function makeCreateGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new CreateGymServices(gymsRepository)

  return service
}
