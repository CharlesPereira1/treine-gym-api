import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceReponse {
  user: User
}

export class RegisterServices {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserCaseRequest): Promise<RegisterServiceReponse> {
    const password_hash = await hash(password, 6)

    const userWithSomeEmail = await this.usersRepository.findByEmail(email)

    if (userWithSomeEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
