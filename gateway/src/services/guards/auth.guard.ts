import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const secured = this.reflector.get<string[]>('secured', context.getHandler());

		if (!secured) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const authLoginInfo = await firstValueFrom(
			this.authClient.send('verify-token', request.headers.authorization),
		);

		if (!authLoginInfo || !authLoginInfo.data) {
			throw new UnauthorizedException();
		}
		return true;
	}
}
