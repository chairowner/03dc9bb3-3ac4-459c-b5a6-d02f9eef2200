import { Table } from "@/components/Table";
import { FC } from "react";
import styled from "styled-components";
import { Search } from "./Search";

const StyledApp = styled.div`
	background-color: #ffffff;
	padding: 18px 20px;
	margin: 0 auto;
	width: 100%;
	max-width: 1132px;
	height: 100%;
	max-height: 780px;
	border-radius: 16px;
	overflow-y: auto;
`;

export const App: FC = () => {
	return (
		<StyledApp>
			<Search />
			<Table />
		</StyledApp>
	);
};
