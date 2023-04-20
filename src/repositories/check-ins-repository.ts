import { CheckIn, Prisma } from '@prisma/client'

// CheckInUncheckedCreateInput -> utilizando pois o prisma entende que o user_id já foi criado

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): number
}
