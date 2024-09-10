import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Flex } from "@/UI/Flex";
import { ITableHeader, TableHeader } from "../components/Table/TableHeader";
import { ITableBody, TableBody } from "@/components/Table/TableBody";
import { TypeProduct, TypeProductKeys } from "@/types/Product";
import { IPagination, Pagination } from "@/components/Pagination";

export interface ITable {
	items: TypeProduct[];
	setItems: Dispatch<SetStateAction<TypeProduct[]>>;
}

const maxItemsOnPage: number = 12;

export const Table: FC<ITable> = ({ items, setItems }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageItems, setPageItems] = useState<TypeProduct[]>([]);

	const sortedBy = (key: TypeProductKeys): void => {
		if (!["title", "category", "visible"].includes(key)) {
			return;
		}
		setItems((items) => {
			const sortedProducts = [...items].sort(
				(a: TypeProduct, b: TypeProduct) => {
					if (key === "visible") {
						if (a[key] > b[key]) {
							return 1;
						} else if (a[key] < b[key]) {
							return -1;
						}
						return 0;
					} else {
						const options: Intl.CollatorOptions = {
							numeric: true,
							sensitivity: "base",
						};
						return a[key].localeCompare(b[key], "ru", options);
					}
				}
			);
			return sortedProducts;
		});
	};

	const paginationProps: IPagination = {
		maxItemsOnPage,
		maxShowedPages: 5,
		currentPage,
		setCurrentPage,
		items,
		setItems,
		pageItems,
		setPageItems,
	};
	const tableHeaderProps: ITableHeader = {
		setItems,
		setPageItems,
		sortedBy,
	};
	const tableBodyProps: ITableBody = {
		maxItemsOnPage,
		currentPage,
		items,
		setItems,
		pageItems,
		setPageItems,
	};

	useEffect(() => {
		const start = (currentPage - 1) * maxItemsOnPage;
		const end = currentPage * maxItemsOnPage;
		setPageItems(items.slice(start, end));
	}, [currentPage, items]);

	return (
		<Flex
			direction="column"
			width="100%"
			height="100%"
			justify="space-between"
			align="center"
		>
			<Flex direction="column" width="100%" flex="1">
				<TableHeader {...tableHeaderProps} />
				<TableBody {...tableBodyProps} />
			</Flex>
			<Pagination {...paginationProps} />
		</Flex>
	);
};
