export class SignupResponseDto {
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
  };
}
