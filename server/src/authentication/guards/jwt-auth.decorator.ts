import { ApiHeader } from '@nestjs/swagger';
export const JwtAuth = () =>
  ApiHeader({
    name: 'Authorization',
    description: 'JWT bearer token',
    required: true,
  });
