export type TypeProductCategory =
	| "Футболка"
	| "Футболка 1"
	| "Футболка 3"
	| "Футболка 6"
	| "Штаны";

export type TypeProduct = {
	id: string;
	img: string;
	title: string;
	category: TypeProductCategory;
	visible: boolean;
};

export type TypeProductKeys = keyof TypeProduct;
