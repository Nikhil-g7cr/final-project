import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ApiService } from './api.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(private readonly apikeyValidate: ApiService) {}

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    const isValid = this.apikeyValidate.iskeyPresent(apiKey);

    if (!isValid) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}