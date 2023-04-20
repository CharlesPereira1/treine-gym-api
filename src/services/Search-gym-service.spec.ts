import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { SearchGymServices } from './Search-gym-service'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymServices

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymServices(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript gym',
      description: null,
      phone: null,
      latitude: -18.9226482,
      longitude: -48.2352305,
    })

    await gymsRepository.create({
      title: 'TypeScript gym',
      description: null,
      phone: null,
      latitude: -18.9226482,
      longitude: -48.2352305,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript gym-${i}`,
        description: null,
        phone: null,
        latitude: -18.9226482,
        longitude: -48.2352305,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript gym-21' }),
      expect.objectContaining({ title: 'JavaScript gym-22' }),
    ])
  })
})
