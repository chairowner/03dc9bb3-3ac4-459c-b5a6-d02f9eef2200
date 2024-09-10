import { DraggableProvided, DraggableStateSnapshot } from "@hello-pangea/dnd";
import { FC } from "react";
import styled from "styled-components";
import Image from "next/image";
import { TypeProduct } from "@/types/Product";
import { ToggleSwitch } from "@/UI/ToggleSwitch";
import { CloseButton } from "@/UI/CloseButton";

interface IRowBodyProps {
	$isDragging?: boolean;
}

export const StyledRow = styled.div`
	display: flex;
	border-bottom: 1px solid #eaecf1;
`;

export const StyledCeil = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;
	flex: 1;
	padding: 10px;
`;

export const StyledCeilGrab = styled(StyledCeil)`
	flex: 0;
	min-width: 43px;
`;

export const StyledCeilCloseBtn = styled(StyledCeil)`
	flex: 0;
	min-width: 62px;
`;

const StyledRowBody = styled(StyledRow)<IRowBodyProps>`
	background-color: #ffffff;
	line-height: 16px;
	transition: box-shadow 130ms ease-in-out;
	${({ $isDragging }) =>
		$isDragging ? "box-shadow: 0px 3px 6px #0000000D;" : ""}
`;

export interface ITableRow {
	handleVisibilityToggle: (id: string) => void;
	removeProduct: (id: string) => void;
	product: TypeProduct;
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
}

export const TableRow: FC<ITableRow> = ({
	product,
	provided,
	snapshot,
	handleVisibilityToggle,
	removeProduct,
}) => {
	return (
		<StyledRowBody
			$isDragging={snapshot.isDragging}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			ref={provided.innerRef}
		>
			<StyledCeilGrab>
				<Image
					src={
						snapshot.isDragging
							? "/draggabledots_grab.svg"
							: "/draggabledots.svg"
					}
					alt="draggable dots"
					width={21}
					height={28}
				/>
			</StyledCeilGrab>
			<StyledCeil>
				<Image
					src={"/" + product.img}
					alt={product.title}
					width={48}
					height={48}
				/>
				{product.title}
			</StyledCeil>
			<StyledCeil>{product.category}</StyledCeil>
			<StyledCeil>
				<ToggleSwitch
					name={"visible" + product.id}
					checked={product.visible}
					onChange={() => handleVisibilityToggle(product.id)}
				/>
			</StyledCeil>
			<StyledCeilCloseBtn>
				<CloseButton onClick={() => removeProduct(product.id)} />
			</StyledCeilCloseBtn>
		</StyledRowBody>
	);
};
