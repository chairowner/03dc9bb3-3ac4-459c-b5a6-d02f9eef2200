// components/DraggableList.js
import { initData } from "@/helpers/initial-data";
import { TypeProduct } from "@/types/Product";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { FC, useState } from "react";

// Функция для изменения порядка элементов
const reorder = (list: any, startIndex: any, endIndex: any): TypeProduct[] => {
	const result: TypeProduct[] = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

export const Table: FC = () => {
	// Начальный список элементов
	const [items, setItems] = useState<TypeProduct[]>(initData);

	const onDragEnd = (result: any) => {
		// Если элемент был перетащен вне допустимой зоны, возвращаем его на место
		if (!result.destination) return;

		// Обновляем список с изменённым порядком
		const newItems: TypeProduct[] = reorder(
			items,
			result.source.index,
			result.destination.index
		);
		setItems(newItems);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{items.map((item, index) => (
							<Draggable key={item.id} draggableId={item.id} index={index}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										style={{
											userSelect: "none",
											padding: 16,
											margin: "0 0 8px 0",
											backgroundColor: "#fff",
											border: "1px solid #ccc",
											...provided.draggableProps.style,
										}}
									>
										{item.title}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};
