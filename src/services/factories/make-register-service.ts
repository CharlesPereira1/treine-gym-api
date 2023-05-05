import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { RegisterServices } from '../register-service'

export function makeRegisterService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerService = new RegisterServices(prismaUsersRepository)

  return registerService
}
