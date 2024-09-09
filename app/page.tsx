"use client";
import { Search } from "@/components/Search";
import { Table } from "@/modules/Table";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Geist Sans';
    src: url('/fonts/GeistVF.woff') format('woff');
    font-weight: 100 900;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Geist Mono';
    src: url('/fonts/GeistMonoVF.woff') format('woff');
    font-weight: 100 900;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Geist Sans', sans-serif;
  }

  body {
    background-color: #f2f6ff;
    height: 100vh;
  }
`;

const StyledPage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;
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

export default function Home() {
	return (
		<>
			<GlobalStyle />
			<StyledPage>
				<StyledApp>
					<Search />
					<Table />
				</StyledApp>
			</StyledPage>
		</>
	);
}
