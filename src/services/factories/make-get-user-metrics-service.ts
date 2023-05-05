import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

import { GetUserMetricsServices } from '../get-user-metrics-service'

export function makeGetUserMetricseService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const service = new GetUserMetricsServices(checkInsRepository)

  return service
}
