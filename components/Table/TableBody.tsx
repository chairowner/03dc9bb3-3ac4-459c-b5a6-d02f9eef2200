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

export interface ITableBody {
	items: TypeProduct[];
	setItems: Dispatch<SetStateAction<TypeProduct[]>>;
}

const reorder = (list: any, startIndex: any, endIndex: any): TypeProduct[] => {
	const result: TypeProduct[] = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

export const TableBody: FC<ITableBody> = ({ items, setItems }) => {
	const handleVisibilityToggle = (id: string) => {
		const updatedItems = items.map((item) =>
			item.id === id ? { ...item, visible: !item.visible } : item
		);
		setItems(updatedItems);
	};

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const newItems: TypeProduct[] = reorder(
			items,
			result.source.index,
			result.destination.index
		);
		setItems(newItems);
	};
	const removeItem = (id: string) => {
		const updatedItems = items.filter((item) => item.id !== id);
		setItems(updatedItems);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="products">
				{(provided) => (
					<StyledTable {...provided.droppableProps} ref={provided.innerRef}>
						{items.map((product: TypeProduct, index) => (
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
	);
};
