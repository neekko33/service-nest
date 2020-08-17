export class CreateUserDto {
  username: string;
  password: string;
  avatar: string;
  nickname: string;
  tags: string;
  address: string;
  introduce: string;
}

export class LoginDto {
  username: string;
  password: string;
}

export class PasswordChangeDto {
  password: string;
  newPassword: string;
}

export class UpdateUserDto {
  nickname: string;
  tags: string;
  address: string;
  introduce: string;
}
