import { FC, useState } from "react";
import Image from "next/image";
import { initData } from "@/helpers/initial-data";
import { TypeProduct } from "@/types/Product";
import { CloseButton } from "@/UI/CloseButton";
import { Flex } from "@/UI/Flex";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ToggleSwitch } from "@/UI/ToggleSwitch";
import styled from "styled-components";

// Используем transient props для фильтрации неизвестных пропсов
const StyledTable = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const StyledTableHead = styled(StyledTable)`
	margin-bottom: 10px;
	border-radius: 12px;
	border: none;
`;

const StyledRow = styled.div`
	display: flex;
	border-bottom: 1px solid #eaecf1;
`;

const StyledRowHead = styled(StyledRow)`
	background-color: #f9f9f9;
	color: #6e7b97;
	font-weight: 600;
	font-size: 12px;
	line-height: 14.52px;
	border-radius: 12px;
`;

interface IRowBodyProps {
	$shadow?: boolean;
}

const StyledRowBody = styled(StyledRow)<IRowBodyProps>`
	background-color: #ffffff;
	line-height: 16px;
	transition: box-shadow 130ms ease-in-out;
	${({ $shadow }) => ($shadow ? "box-shadow: 0px 3px 6px #0000000D;" : "")}
`;

const StyledCeil = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;
	flex: 1;
	padding: 10px;
`;

const StyledCeilGrab = styled(StyledCeil)`
	flex: 0;
	min-width: 43px;
`;

const StyledCeilCloseBtn = styled(StyledCeil)`
	flex: 0;
	min-width: 62px;
`;

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

	// Обработчик изменения переключателя
	const handleVisibilityToggle = (id: string) => {
		// Обновляем состояние каждого элемента
		const updatedItems = items.map((item) =>
			item.id === id ? { ...item, visible: !item.visible } : item
		);
		setItems(updatedItems);
	};

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
		<Flex direction="column">
			<StyledTableHead>
				<StyledRowHead>
					<StyledCeilGrab />
					<StyledCeil>Товар</StyledCeil>
					<StyledCeil>Категория</StyledCeil>
					<StyledCeil>Видимость</StyledCeil>
					<StyledCeilCloseBtn />
				</StyledRowHead>
			</StyledTableHead>
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
									{(provided, snapshot) => (
										<StyledRowBody
											$shadow={snapshot.isDragging}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
										>
											<StyledCeilGrab>
												<Image
													src={"/draggabledots.svg"}
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
													checked={product.visible}
													onChange={() => handleVisibilityToggle(product.id)}
												/>
											</StyledCeil>
											<StyledCeilCloseBtn>
												<CloseButton />
											</StyledCeilCloseBtn>
										</StyledRowBody>
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
