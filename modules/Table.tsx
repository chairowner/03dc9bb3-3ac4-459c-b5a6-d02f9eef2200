import { FC, useState } from "react";
import { initData } from "@/helpers/initial-data";
import { TypeProduct } from "@/types/Product";
import { Flex } from "@/UI/Flex";
import { TableHeader } from "../components/Table/TableHeader";
import { TableBody } from "@/components/Table/TableBody";

export const Table: FC = () => {
	const [products, setProducts] = useState<TypeProduct[]>(initData);

	return (
		<Flex direction="column">
			<TableHeader items={products} setItems={setProducts} />
			<TableBody items={products} setItems={setProducts} />
		</Flex>
	);
};
