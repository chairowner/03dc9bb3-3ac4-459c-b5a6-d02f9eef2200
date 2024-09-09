import { FC, useState } from "react";
import { initData } from "@/helpers/initial-data";
import { TypeProduct } from "@/types/Product";
import { Flex } from "@/UI/Flex";
import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	Droppable,
	DropResult,
} from "@hello-pangea/dnd";
import { TableRow } from "../components/TableRow";
import { StyledTable, TableHeader } from "../components/TableHeader";

const reorder = (list: any, startIndex: any, endIndex: any): TypeProduct[] => {
	const result: TypeProduct[] = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

export const Table: FC = () => {
	const [products, setProducts] = useState<TypeProduct[]>(initData);

	const handleVisibilityToggle = (id: string) => {
		const updatedItems = products.map((item) =>
			item.id === id ? { ...item, visible: !item.visible } : item
		);
		setProducts(updatedItems);
	};

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const newItems: TypeProduct[] = reorder(
			products,
			result.source.index,
			result.destination.index
		);
		setProducts(newItems);
	};

	const removeProduct = (id: string) => {
		const updatedItems = products.filter((item) => item.id !== id);
		setProducts(updatedItems);
	};

	return (
		<Flex direction="column">
			<TableHeader items={products} setItems={setProducts} />
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="products">
					{(provided) => (
						<StyledTable {...provided.droppableProps} ref={provided.innerRef}>
							{products.map((product: TypeProduct, index) => (
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
											removeProduct={removeProduct}
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
		</Flex>
	);
};
