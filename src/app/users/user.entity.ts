import { Role, UserStatus } from "../../generated/prisma/enums";


export class UserEntity {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  passwordHash: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;

  constructor(data: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    passwordHash: string;
    role: Role;
    status: UserStatus;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.passwordHash = data.passwordHash;
    this.role = data.role;
    this.status = data.status;
    this.createdAt = data.createdAt;
  }
}