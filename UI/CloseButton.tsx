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
	&:focus,
	&:hover {
		background-color: #f1f1f1;
	}
	&::before {
		content: "✕";
		font-weight: 900;
	}
`;

export const CloseButton = ({ ...props }): JSX.Element => {
	return <StyledButton {...props} />;
};
