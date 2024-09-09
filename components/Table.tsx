import { FC, useState } from "react";
import Image from "next/image";
import { initData } from "@/helpers/initial-data";
import { TypeProduct, TypeProductKeys } from "@/types/Product";
import { CloseButton } from "@/UI/CloseButton";
import { Flex } from "@/UI/Flex";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "@hello-pangea/dnd";
import { ToggleSwitch } from "@/UI/ToggleSwitch";
import styled from "styled-components";
import { log } from "console";

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
	$isDragging?: boolean;
}

const StyledRowBody = styled(StyledRow)<IRowBodyProps>`
	background-color: #ffffff;
	line-height: 16px;
	transition: box-shadow 130ms ease-in-out;
	${({ $isDragging }) =>
		$isDragging ? "box-shadow: 0px 3px 6px #0000000D;" : ""}
`;

const StyledCeil = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 12px;
	flex: 1;
	padding: 10px;
`;

const StyledCeilHead = styled(StyledCeil)`
	cursor: pointer;
`;

const StyledCeilGrab = styled(StyledCeil)`
	flex: 0;
	min-width: 43px;
`;

const StyledCeilCloseBtn = styled(StyledCeil)`
	flex: 0;
	min-width: 62px;
`;

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

	const sortedBy = (key: TypeProductKeys) => {
		if (!["title", "category", "visible"].includes(key)) {
			return false;
		}
		const sortedProducts = [...products].sort(
			(a: TypeProduct, b: TypeProduct) => {
				if (a[key] > b[key]) {
					return 1;
				} else if (a[key] < b[key]) {
					return -1;
				}
				return 0;
			}
		);
		console.log("sortedProducts", sortedProducts);
		setProducts(sortedProducts);
	};

	const removeProduct = (id: string) => {
		const updatedItems = products.filter((item) => item.id !== id);
		setProducts(updatedItems);
	};

	return (
		<Flex direction="column">
			<StyledTableHead>
				<StyledRowHead>
					<StyledCeilGrab />
					<StyledCeilHead onClick={() => sortedBy("title")}>
						Товар
					</StyledCeilHead>
					<StyledCeilHead onClick={() => sortedBy("category")}>
						Категория
					</StyledCeilHead>
					<StyledCeilHead onClick={() => sortedBy("visible")}>
						Видимость
					</StyledCeilHead>
					<StyledCeilCloseBtn />
				</StyledRowHead>
			</StyledTableHead>
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
									{(provided, snapshot) => (
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
													checked={product.visible}
													onChange={() => handleVisibilityToggle(product.id)}
												/>
											</StyledCeil>
											<StyledCeilCloseBtn>
												<CloseButton
													onClick={() => removeProduct(product.id)}
												/>
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
