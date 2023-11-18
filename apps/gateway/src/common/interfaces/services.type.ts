import { Internet } from './Internet.interface';
import { Account } from './account.interface';
import { Mobile } from './mobile.interface';
import { Token } from './token.interface';
import { Utilities } from './utilities.interface';

export type Services = Utilities | Mobile | Internet | Token | Account;
