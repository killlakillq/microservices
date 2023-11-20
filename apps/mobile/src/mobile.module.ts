import { Module } from '@nestjs/common';
import { MobilePaymentService } from './services/mobile-payment.service';
import { MobileService } from './services/mobile.service';
import { MobileController } from './mobile.controller';

@Module({
	imports: [],
	controllers: [MobileController],
	providers: [MobileService, MobilePaymentService],
})
export class MobileModule {}
