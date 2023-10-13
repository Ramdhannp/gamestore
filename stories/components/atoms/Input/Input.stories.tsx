import type { Meta, StoryObj } from "@storybook/react";
import Input from "../../../../components/atoms/Input";

const meta: Meta<typeof Input> = {
	title: "Components/Atoms/Input",
	component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		label: "Full Name",
		placeHolder: "Add Full Name",
	},
};
