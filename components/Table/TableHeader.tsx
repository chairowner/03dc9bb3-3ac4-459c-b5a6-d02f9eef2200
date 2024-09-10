import { Dispatch, FC, SetStateAction } from "react";
import styled from "styled-components";
import {
	StyledCeil,
	StyledCeilCloseBtn,
	StyledCeilGrab,
	StyledRow,
} from "../Table/TableRow";
import Image from "next/image";
import { TypeProduct, TypeProductKeys } from "@/types/Product";

export const StyledTable = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const StyledTableHead = styled(StyledTable)`
	margin-bottom: 10px;
	border-radius: 12px;
	border: none;
`;

const StyledRowHead = styled(StyledRow)`
	background-color: #f9f9f9;
	color: #6e7b97;
	font-weight: 600;
	font-size: 12px;
	line-height: 14.52px;
	border-radius: 12px;
`;

const StyledCeilHead = styled(StyledCeil)`
	cursor: pointer;
`;

export interface ITableHeader {
	setItems: Dispatch<SetStateAction<TypeProduct[]>>;
	setPageItems: Dispatch<SetStateAction<TypeProduct[]>>;
	sortedBy: (key: TypeProductKeys) => void;
}

export const TableHeader: FC<ITableHeader> = ({
	setItems,
	setPageItems,
	sortedBy,
}) => {
	return (
		<StyledTableHead>
			<StyledRowHead>
				<StyledCeilGrab />
				<StyledCeilHead onClick={() => sortedBy("title")}>
					Товар
					<Image width={8} height={4} src="arrow_down.svg" alt="arrow down" />
				</StyledCeilHead>
				<StyledCeilHead onClick={() => sortedBy("category")}>
					Категория
					<Image width={8} height={4} src="arrow_down.svg" alt="arrow down" />
				</StyledCeilHead>
				<StyledCeilHead onClick={() => sortedBy("visible")}>
					Видимость
					<Image width={8} height={4} src="arrow_down.svg" alt="arrow down" />
				</StyledCeilHead>
				<StyledCeilCloseBtn />
			</StyledRowHead>
		</StyledTableHead>
	);
};
