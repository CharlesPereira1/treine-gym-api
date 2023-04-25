import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { FetchNearbyGymservices } from './fetch-nearby-gyms-service'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymservices

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymservices(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: null,
      phone: null,
      latitude: -18.9226482,
      longitude: -48.2352305,
    })

    await gymsRepository.create({
      title: 'Far gym',
      description: null,
      phone: null,
      latitude: -18.6623277,
      longitude: -48.1843124,
    })

    const { gyms } = await sut.execute({
      userLatitude: -18.9226482,
      userLongitude: -48.2352305,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near gym' })])
  })
})
