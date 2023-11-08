import { Module } from '@nestjs/common';
import { MobilePaymentService } from './services/mobile-payment.service';
import { MobileService } from './services/mobile.service';
import { MobileController } from './mobile.controller';
import { AccountService } from '../account/services/account.service';

@Module({
	imports: [],
	controllers: [AccountService, MobileController],
	providers: [MobileService, MobilePaymentService],
})
export class MobileModule {}
