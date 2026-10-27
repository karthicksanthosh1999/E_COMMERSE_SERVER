import { Role } from "../../../generated/prisma/client";

export class UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  passwordHash?: string;
  role?: Role;
  
  constructor(data: {
    name?: string;
    email?: string;
    phone?: string;
    passwordHash?: string;
    role?: Role;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.passwordHash = data.passwordHash;
    this.role = data.role;
  }
}