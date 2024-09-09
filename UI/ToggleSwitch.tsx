"use client";
import { FC } from "react";
import styled from "styled-components";

interface ToggleSwitchProps {
	checked: boolean;
	onChange: () => void;
}

const Switch = styled.label`
	position: relative;
	display: inline-block;
	width: 50px;
	height: 28px;
`;

const Checkbox = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;

const Slider = styled.span<{ checked: boolean }>`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${(props) => (props.checked ? "#2196F3" : "#ccc")};
	transition: 0.4s;
	border-radius: 34px;

	&:before {
		position: absolute;
		content: "";
		height: 22px;
		width: 22px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
		transform: ${(props) => (props.checked ? "translateX(22px)" : "none")};
	}
`;

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ checked, onChange }) => {
	return (
		<Switch>
			<Checkbox type="checkbox" checked={checked} onChange={onChange} />
			<Slider checked={checked}></Slider>
		</Switch>
	);
};
