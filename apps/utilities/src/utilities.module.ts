import { Module } from '@nestjs/common';
import { UtilitiesPaymentService } from './services/utilities-payment.service';
import { UtilitiesController } from './utilities.controller';
import { UtilitiesService } from './services/utilities.service';

@Module({
	imports: [],
	controllers: [UtilitiesController],
	providers: [UtilitiesService, UtilitiesPaymentService],
})
export class UtilitiesModule {}
