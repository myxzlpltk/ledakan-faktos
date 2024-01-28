"use client";

import { successToastEN, successToastID } from "@/lib/template";
import {
	ActionIcon,
	Box,
	Button,
	Container,
	Flex,
	Paper,
	Stack,
	Text,
	Title,
	Tooltip,
	Switch,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { GB, ID } from "country-flag-icons/react/3x2";
import { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { Toaster, toast } from "sonner";

const renderIndonesianFlag = <ID title="Indonesia" width={18} height={12} />;

const renderBritishFlag = <GB title="English" width={18} height={12} />;

type TPageClientProps = {
	templatesID: [string, string][];
	templatesEN: [string, string][];
};

export default function PageClient({
	templatesID,
	templatesEN,
}: TPageClientProps) {
	const clipboard = useClipboard({ timeout: 500 });
	const [checked, setChecked] = useState<"ID" | "EN">("ID");
	const isIndonesian = checked === "ID";
	const templates = isIndonesian ? templatesID : templatesEN;

	const toOneLiner = (text1: string, text2: string): string => {
		if (text1.endsWith("?")) {
			return `${text1} ${text2}.`;
		}

		return `${text1}. ${text2}.`;
	};

	const copied = () => {
		const successToast = isIndonesian ? successToastID : successToastEN;
		const index = Math.floor(Math.random() * successToast.length);
		toast.dismiss();
		toast.success(successToast[index]);
	};

	return (
		<Container pt="lg" pb="5rem" size="xs">
			<Toaster richColors position="top-center" />
			<Title
				size="h2"
				style={{
					textAlign: "center",
				}}
			>
				{isIndonesian ? "Ledakan Faktos 💥💔🥲" : "Factos Explosion 💥💔🥲"}
			</Title>

			<Flex
				p="md"
				gap="sm"
				justify="center"
				align="center"
				direction="column"
				wrap="wrap"
			>
				<Title
					size="h5"
					style={{
						textAlign: "center",
					}}
				>
					{isIndonesian ? "Pilih Bahasa Template 🌾🙌🏼🙇‍♂️" : "Choose Template"}
				</Title>
				<Switch
					checked={isIndonesian}
					onChange={(event) =>
						event.currentTarget.checked ? setChecked("ID") : setChecked("EN")
					}
					size="md"
					onLabel={renderIndonesianFlag}
					offLabel={renderBritishFlag}
				/>
			</Flex>

			<Stack pt="lg">
				{templates.map(([text1, text2], index) => (
					<Paper
						key={`${index.toString()}-item-${isIndonesian ? "ID" : "EN"}`}
						shadow="xs"
						radius="md"
						px="md"
						py="md"
						onClick={() => {
							clipboard.copy(toOneLiner(text1, text2));
							copied();
						}}
						color="gray"
						style={{
							cursor: "pointer",
						}}
					>
						<Flex justify="space-between" align="center">
							<Text>
								<span>{text1}</span>
								<br />
								<span>{text2}</span>
							</Text>
							<Tooltip label="Salin">
								<ActionIcon
									variant="default"
									color="gray"
									size="sm"
									aria-label="Copy"
								>
									<FiClipboard />
								</ActionIcon>
							</Tooltip>
						</Flex>
					</Paper>
				))}
			</Stack>

			<Box
				mb="lg"
				pos="fixed"
				bottom="0"
				left="0"
				right="0"
				style={{
					textAlign: "center",
				}}
			>
				<Button
					onClick={() => {
						clipboard.copy(
							templates
								.map(([text1, text2]) => toOneLiner(text1, text2))
								.join("\n"),
						);
						copied();
					}}
					radius="md"
					color="teal.9"
				>
					{isIndonesian ? "Salin Semua 🤙🏻" : "Copy All 🤙🏻"}
				</Button>
			</Box>
		</Container>
	);
}
