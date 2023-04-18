import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInsHistoryServiceRequest {
  userId: string
}

interface FetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryServices {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId)

    return { checkIns }
  }
}
