import { Body, Controller, Post, Patch, UseGuards, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginUserResponseDto, ResetPasswordResponseDto } from './dto/login-user-response.dto';
import { LoginDto, RegisterDto, ChangePasswordDto, ResetPasswordDto } from './dto/login-user.dto';
import { JwtAuth } from './guards/jwt-auth.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IRequestJwt } from './interfaces/request.interface';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  public constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginUserResponseDto })
  public LoginWorker(@Body() params: LoginDto) {
    return this.authenticationService.Login(params);
  }

  @Post('register')
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: String })
  public RegisterWorker(@Body() params: RegisterDto) {
    return this.authenticationService.RegisterWorker(params);
  }

  @Patch('password/change')
  @JwtAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ChangePasswordDto })
  @ApiOkResponse({ type: String })
  public ChangePassword(@Req() req: IRequestJwt, @Body() params: ChangePasswordDto) {
    return this.authenticationService.ChangePassword(req, params);
  }

  @Patch('password/reset')
  @ApiBody({ type: ResetPasswordDto })
  @ApiOkResponse({ type: ResetPasswordResponseDto })
  public ResetPassword(@Body() params: ResetPasswordDto) {
    return this.authenticationService.ResetPassword(params);
  }
}
