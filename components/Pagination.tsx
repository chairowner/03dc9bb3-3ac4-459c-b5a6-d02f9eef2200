import { initData } from "@/helpers/initial-data";
import { TypeProduct } from "@/types/Product";
import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";

export interface IPagination {
	items: TypeProduct[];
	setItems: (items: TypeProduct[]) => void;
	maxItemsOnPage: number;
	maxShowedPages: number;
	currentPage: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	pageItems: TypeProduct[];
	setPageItems: Dispatch<SetStateAction<TypeProduct[]>>;
}

const StyledPagination = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`;

const PageButton = styled.div<{ $active?: boolean; $disabled?: boolean }>`
	cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
	color: ${({ $active, $disabled }) =>
		$active ? "blue" : $disabled ? "gray" : "black"};
	&:hover {
		text-decoration: ${({ $disabled }) => ($disabled ? "none" : "underline")};
	}
`;

export const Pagination: FC<IPagination> = ({
	maxItemsOnPage,
	maxShowedPages,
	items,
	setItems,
	currentPage,
	setCurrentPage,
	pageItems,
	setPageItems,
}) => {
	const pagesLength = Math.ceil(items.length / maxItemsOnPage);

	const updatePage = (page: number) => {
		if (page < 1 || page > pagesLength) return;
		setCurrentPage(page);
		const start: number = (page - 1) * maxItemsOnPage;
		const end: number = page * maxItemsOnPage;
		const newItems = initData.slice(start, end);
		setPageItems(newItems);
	};

	const showPages = () => {
		const half = Math.floor(maxShowedPages / 2);
		const start = Math.max(1, currentPage - half);
		const end = Math.min(pagesLength, currentPage + half);

		let pages = [];
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	if (pagesLength < 2) {
		return "";
	}

	return (
		<StyledPagination>
			<PageButton onClick={() => updatePage(1)} $disabled={currentPage === 1}>
				{"<<"}
			</PageButton>
			<PageButton
				onClick={() => updatePage(currentPage - 1)}
				$disabled={currentPage === 1}
			>
				{"<"}
			</PageButton>
			{Array.from({ length: pagesLength }, (_, i) => i + 1).map((page) => (
				<PageButton
					key={page}
					onClick={() => updatePage(page)}
					$active={page === currentPage}
				>
					{page}
				</PageButton>
			))}
			<PageButton
				onClick={() => updatePage(currentPage + 1)}
				$disabled={currentPage === pagesLength}
			>
				{">"}
			</PageButton>
			<PageButton
				onClick={() => updatePage(pagesLength)}
				$disabled={currentPage === pagesLength}
			>
				{">>"}
			</PageButton>
		</StyledPagination>
	);
};
