export type TypeProductCategory = "Футболка" | "Штаны";

export type TypeProduct = {
	id: string;
	img: string;
	title: string;
	category: TypeProductCategory;
	visible: boolean;
};
