"use client";
import styled from "styled-components";

const StyledButton = styled.button`
	color: #f93c47;
	background-color: #f9f9f9;
	padding: 8px;
	border-radius: 8px;
	height: 40px;
	width: 40px;
	border: none;
	cursor: pointer;

	&:focus {
		outline: none;
	}
	&::before {
		content: "✕";
		font-weight: 900;
	}
`;

export const CloseButton = (): JSX.Element => {
	return <StyledButton />;
};
