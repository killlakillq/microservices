import { Module } from '@nestjs/common';
import { UtilitiesPaymentService } from './src/services/utilities-payment.service';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './src/services/utilities.service';
import { AccountService } from '../account/src/services/account.service';

@Module({
	imports: [],
	controllers: [UtilitiesController],
	providers: [AccountService, UtilitiesService, UtilitiesPaymentService],
})
export class UtilitiesModule {}
