import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kokoc test APP",
	description: "Сагайдачный Данил",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body>{children}</body>
		</html>
	);
}
