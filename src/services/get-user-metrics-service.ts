import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsServiceRequest {
  userId: string
}

interface GetUserMetricsServiceResponse {
  checkInsCount: number
}

export class GetUserMetricsServices {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
