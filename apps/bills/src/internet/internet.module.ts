import { Module } from '@nestjs/common';
import { InternetPaymentService } from './services/internet-payment.service';
import { AccountService } from '../account/services/account.service';
import { InternetController } from './internet.controller';
import { InternetService } from './services/internet.service';

@Module({
	imports: [],
	controllers: [InternetController],
	providers: [AccountService, InternetService, InternetPaymentService],
})
export class InternetModule {}
