import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInServiceService } from './check-in-service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInServiceService

// sut -> syster under test = default tester

// TDD - Test-driven Development : primeiro desenvolvo, depois implemento (para códigos mais complexos)
// red, green, refactor

describe('Check-in Service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInServiceService(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Node Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-18.9221205),
      longitude: new Decimal(-48.2493067),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -18.9221205,
      userLongitude: -48.2493067,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 3, 4, 21, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -18.9221205,
      userLongitude: -48.2493067,
    })

    expect(
      async () =>
        await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: -18.9221205,
          userLongitude: -48.2493067,
        })
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 3, 3, 21, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -18.9221205,
      userLongitude: -48.2493067,
    })

    vi.setSystemTime(new Date(2022, 3, 4, 21, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -18.9221205,
      userLongitude: -48.2493067,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
