import { Dispatch, FC, SetStateAction } from "react";
import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	Droppable,
	DropResult,
} from "@hello-pangea/dnd";
import { TypeProduct } from "@/types/Product";
import { TableRow } from "./TableRow";
import { StyledTable } from "./TableHeader";
import { Flex } from "@/UI/Flex";
import styled from "styled-components";

export interface ITableBody {
	items: TypeProduct[];
	setItems: Dispatch<SetStateAction<TypeProduct[]>>;
	maxItemsOnPage: number;
	currentPage: number;
	pageItems: TypeProduct[];
	setPageItems: Dispatch<SetStateAction<TypeProduct[]>>;
}

const reorder = (
	list: TypeProduct[],
	startIndex: number,
	endIndex: number
): TypeProduct[] => {
	const result: TypeProduct[] = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const Wrapper = styled(Flex)`
	overflow-y: auto;
	width: 100%;
	height: 300px;
`;

export const TableBody: FC<ITableBody> = ({
	items,
	setItems,
	maxItemsOnPage,
	currentPage,
	pageItems,
	setPageItems,
}) => {
	const handleVisibilityToggle = (id: string) => {
		const toggle = (items: TypeProduct[]) =>
			items.map((item) =>
				item.id === id ? { ...item, visible: !item.visible } : item
			);
		setPageItems(toggle);
		setItems(toggle);
	};

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		setPageItems(
			reorder(pageItems, result.source.index, result.destination.index)
		);
		const offset: number = maxItemsOnPage * (currentPage - 1);
		setItems(
			reorder(
				items,
				offset + result.source.index,
				offset + result.destination.index
			)
		);
	};

	const removeItem = (id: string) => {
		setItems((items) => items.filter((item) => item.id !== id));
	};

	return (
		<Wrapper>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="products">
					{(provided) => (
						<StyledTable {...provided.droppableProps} ref={provided.innerRef}>
							{pageItems.map((product: TypeProduct, index) => (
								<Draggable
									key={product.id}
									draggableId={product.id}
									index={index}
								>
									{(
										provided: DraggableProvided,
										snapshot: DraggableStateSnapshot
									) => (
										<TableRow
											handleVisibilityToggle={handleVisibilityToggle}
											removeProduct={removeItem}
											product={product}
											provided={provided}
											snapshot={snapshot}
										/>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</StyledTable>
					)}
				</Droppable>
			</DragDropContext>
		</Wrapper>
	);
};
