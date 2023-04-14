import { expect, describe, it, beforeEach } from 'vitest'

import { CreateGymServices } from './create-gym-service'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymServices

describe('Create gym Services', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymServices(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript gym',
      description: null,
      phone: null,
      latitude: -18.9226482,
      longitude: -48.2352305,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
