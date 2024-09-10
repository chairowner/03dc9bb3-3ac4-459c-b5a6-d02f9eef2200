"use client";
import styled, { css } from "styled-components";

const StyledFlex = styled.div`
	display: flex;
	flex-direction: ${(props: any) => props.direction || "row"};
	justify-content: ${(props: any) => props.$justify || "flex-start"};
	align-items: ${(props: any) => props.$align || "flex-start"};
	gap: ${(props: any) => props.gap || "0"};
	padding: ${(props: any) => props.padding || "0"};
	margin: ${(props: any) => props.margin || "0"};
	flex: ${(props: any) => props.$flex || "auto"};

	${(props: any) => css`
		background: ${props.background || "transparent"};
	`}
	${(props: any) => css`
		width: ${props.width || "auto"};
	`}
	${(props: any) => css`
		height: ${props.height || "auto"};
	`}
`;

export const Flex = ({ ...props }): JSX.Element => {
	return <StyledFlex {...props} />;
};
