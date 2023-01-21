export interface IAccount {
	login: string;
	name: string;
}

export interface IAccountWithCard {
	login: string;
	name: string;
	card: {
		number: string;
		cvc: string;
		expirationDate: string;
	};
}

export interface ICard {
	number: string;
	cvc: string;
	expirationDate: string;
}
