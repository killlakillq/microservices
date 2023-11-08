export interface ServicesResponse<T> {
	status: number;
	message: string;
	data: T | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	errors: { [key: string]: any };
}
