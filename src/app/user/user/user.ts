import { $enum } from 'ts-enum-util'

import { Role } from '../../auth/auth.enum'

export interface IName {
  first: string
  middle: string
  last: string
}

export interface IUser {
  _id: string
  email: string
  password: string
  dateOfBirth: Date | null | string
  age: number
  name: IName
  phone: string
  city: string
  gender: string
  photo: string
  accountLocked: boolean
  accountActive: boolean
  role?: Role | string
  readonly fullName?: string
}

export class User implements IUser {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id = '',
    public email = '',
    public password ='',
    public dateOfBirth: Date | null = null,
    public age =  0,
    public name = { first: '', middle: '', last: '' } as IName,
    public phone = '',
    public city= '',
    public gender= '',
    public photo = '',
    public accountLocked = false,
    public accountActive = true,
    public role = Role.User,

  ) {}

  static Build(user: IUser) {
    /*if (!user) {
      return new User()
    }*/

    return new User(
      user._id,
      user.email,
      user.password,
    typeof user.dateOfBirth === 'string' ? new Date(user.dateOfBirth): user.dateOfBirth,
      user.age,
      user.name,
      user.phone,
      user.city,
      user.gender,
      user.photo,
      user.accountLocked,
      user.accountActive,
      $enum(Role).asValueOrDefault(user.role, Role.User),
    )
  }

  public get fullName(): string {
    if (!this.name) {
      return ''
    }
    if (this.name.middle) {
      return `${this.name.first} ${this.name.middle} ${this.name.last}`
    }
    return `${this.name.first} ${this.name.last}`
  }

  toJSON(): object {
    const serialized = Object.assign(this)
    delete serialized._id
    delete serialized.fullName
    return serialized
  }
}
