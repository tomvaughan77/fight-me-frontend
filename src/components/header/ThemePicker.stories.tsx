import { expect } from '@storybook/jest'
import { StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import ThemePicker from './ThemePicker'

export default {
    component: ThemePicker,
    title: 'Components/Header/ThemePicker',
}

const Template: StoryObj<typeof ThemePicker> = {
    render: (args) => <ThemePicker {...args} />,
}

export const DayTheme: typeof Template = {
    ...Template,
    loaders: [
        async () => ({
            setTheme: localStorage.setItem('theme', JSON.stringify('light')),
        }),
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await expect(canvas.getByText('Dark Mode')).toBeInTheDocument()
        await expect(canvas.queryByText('Light Mode')).not.toBeInTheDocument()

        await userEvent.click(canvas.getByText('Dark Mode'))

        await expect(canvas.queryByText('Dark Mode')).not.toBeInTheDocument()
        await expect(canvas.getByText('Light Mode')).toBeInTheDocument()

        await userEvent.click(canvas.getByText('Light Mode'))

        await expect(canvas.getByText('Dark Mode')).toBeInTheDocument()
        await expect(canvas.queryByText('Light Mode')).not.toBeInTheDocument()
    },
}

export const NightTheme: typeof Template = {
    ...Template,
    loaders: [
        async () => ({
            setTheme: localStorage.setItem('theme', JSON.stringify('dark')),
        }),
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await expect(canvas.getByText('Light Mode')).toBeInTheDocument()
        await expect(canvas.queryByText('Dark Mode')).not.toBeInTheDocument()

        await userEvent.click(canvas.getByText('Light Mode'))

        await expect(canvas.getByText('Dark Mode')).toBeInTheDocument()
        await expect(canvas.queryByText('Light Mode')).not.toBeInTheDocument()

        await userEvent.click(canvas.getByText('Dark Mode'))

        await expect(canvas.queryByText('Dark Mode')).not.toBeInTheDocument()
        await expect(canvas.getByText('Light Mode')).toBeInTheDocument()
    },
}
