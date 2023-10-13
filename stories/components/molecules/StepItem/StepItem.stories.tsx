import type { Meta, StoryObj } from "@storybook/react";
import StepItem from "../../../../components/molecules/StepItem";

const meta: Meta<typeof StepItem> = {
	title: "Components/Molecules/StepItem",
	component: StepItem,
};

export default meta;

type Story = StoryObj<typeof StepItem>;

export const Default: Story = {
	args: {
		icon: "/icon/step1.svg",
		title: "1. Start",
		desc1: "Pilih salah satu game",
		desc2: "yang ingin kamu top up",
	},
};
