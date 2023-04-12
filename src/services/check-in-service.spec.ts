import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInServiceService } from './check-in-service'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInServiceService

// sut -> syster under test = default tester

// TDD - Test-driven Development : primeiro desenvolvo, depois implemento (para códigos mais complexos)
// red, green, refactor

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInServiceService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 3, 4, 21, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(
      async () =>
        await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
        })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 3, 3, 21, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2022, 3, 4, 21, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
