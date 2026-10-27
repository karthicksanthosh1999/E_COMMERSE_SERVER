export class UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  passwordHash?: string;

  constructor(data: {
    name?: string;
    email?: string;
    phone?: string;
    passwordHash?: string;
  }) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.passwordHash = data.passwordHash;
  }
}