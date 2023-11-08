import { Module } from '@nestjs/common';
import { UtilitiesPaymentService } from './services/utilities-payment.service';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './services/utilities.service';
import { AccountService } from '../account/services/account.service';

@Module({
	imports: [],
	controllers: [UtilitiesController],
	providers: [AccountService, UtilitiesService, UtilitiesPaymentService],
})
export class UtilitiesModule {}
