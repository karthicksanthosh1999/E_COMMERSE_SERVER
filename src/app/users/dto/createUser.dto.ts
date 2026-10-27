import { Role, UserStatus } from "../../../generated/prisma/enums";

export class CreateUserDto {
  name: string;
  email: string;
  phone: string | null;
  passwordHash: string;
  role: Role;
  status: UserStatus;

  constructor(data: {
    name: string;
    email: string;
    phone: string | null;
    passwordHash: string;
    role: Role;
    status: UserStatus;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.passwordHash = data.passwordHash;
    this.role = data.role;
    this.status = data.status
  }
}