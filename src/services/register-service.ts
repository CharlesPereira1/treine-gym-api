import { hash } from 'bcryptjs'

import { UsersRepository } from '@/repositories/users-repository'

interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterServices {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUserCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSomeEmail = await this.usersRepository.findByEmail(email)

    if (userWithSomeEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}