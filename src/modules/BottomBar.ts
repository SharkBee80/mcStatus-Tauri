// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// type XOR<T, U> = (T | U) extends object
// 	? (Without<T, U> & U) | (Without<U, T> & T)
// 	: T | U;
type X<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
	? (X<T, U> & U | X<U, T> & T)
	: T | U;

type Tabbar = {
	id?: number,
	icon: string,
	text?: string,
	//
	route: string,
	routeable?: boolean,
}

type Docker = {
	id?: number,
	icon: string,
	text?: string,
	//
	docker: boolean,
}

type Item = XOR<Tabbar, Docker>;

export type { Item, Tabbar };