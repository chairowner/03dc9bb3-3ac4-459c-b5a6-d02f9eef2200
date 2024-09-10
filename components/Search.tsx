import { Flex } from "@/UI/Flex";
import { FC } from "react";
import styled from "styled-components";

const StyledSearchContainer = styled.div`
	position: relative;
	margin-bottom: 18px;
`;
const StyledSearch = styled.input`
	width: 216px;
	height: 44px;
	background-color: #f9f9f9;
	border: none;
	border-radius: 12px;
	padding: 0 16px;
	&:focus {
		outline: none;
	}
	color: #80899d;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	padding-left: 44px;
`;
const StyledSearchImg = styled.img`
	position: absolute;
	left: 12px;
	top: 25%;
	width: 21px;
	height: 21px;
`;

export interface ISearchProps {
	name?: string;
	placeholder?: string;
}

export const Search: FC<ISearchProps> = ({ name, placeholder }) => {
	return (
		<StyledSearchContainer>
			<StyledSearchImg src="/search.svg" alt={placeholder} />
			<StyledSearch name={name} placeholder={placeholder} />
		</StyledSearchContainer>
	);
};
