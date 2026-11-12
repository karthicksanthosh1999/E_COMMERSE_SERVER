import { Role } from "../../../generated/prisma/client";

export class UpdateUserDto {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  passwordHash?: string;
  role?: Role;
  
  constructor(data: {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    passwordHash?: string;
    role?: Role;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.passwordHash = data.passwordHash;
    this.role = data.role;
  }
}