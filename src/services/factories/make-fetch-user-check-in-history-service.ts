import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { FetchUserCheckInsHistoryServices } from '../fetch-user-check-ins-history-service'

export function makeFetchUserCheckInHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInsHistoryServices(checkInsRepository)

  return service
}
