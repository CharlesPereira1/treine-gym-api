import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUserCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUserCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSomeEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSomeEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}
