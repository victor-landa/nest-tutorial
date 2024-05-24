import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Evan Davis',
      email: 'evan.davis@example.com',
      role: 'ENGINEER',
    },
    {
      id: 6,
      name: 'Fiona Hall',
      email: 'fiona.hall@example.com',
      role: 'INTERN',
    },
    {
      id: 7,
      name: 'George Miller',
      email: 'george.miller@example.com',
      role: 'ENGINEER',
    },
    {
      id: 8,
      name: 'Hannah Wilson',
      email: 'hannah.wilson@example.com',
      role: 'ADMIN',
    },
    {
      id: 9,
      name: 'Ian Clark',
      email: 'ian.clark@example.com',
      role: 'INTERN',
    },
    {
      id: 10,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'ENGINEER',
    },
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role)
    } else {
      return this.users
    }
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id)

    return user
  }

  create(user: {
    name: string
    email: string
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    }
    this.users.push(newUser)
    return newUser
  }

  update(
    id: number,
    updatedUser: {
      name: string
      email: string
      role: 'INTERN' | 'ENGINEER' | 'ADMIN'
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser }
      }
      return user
    })

    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)

    this.users = this.users.filter((user) => user.id !== id)

    return removedUser
  }
}
