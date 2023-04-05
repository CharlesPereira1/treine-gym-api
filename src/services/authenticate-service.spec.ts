/* eslint-disable prettier/prettier */
import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate-service'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

// sut -> syster under test = default tester

describe('Authenticate Service', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    expect(
      async () =>
        await sut.execute({
          email: 'johndoe@example.com',
          password: '123456',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await sut.execute({
          email: 'johndoe@example.com',
          password: '123123',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
