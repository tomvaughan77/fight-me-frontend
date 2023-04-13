import { expect } from '@storybook/jest'
import type { StoryObj } from '@storybook/react'
import { within } from '@storybook/testing-library'
import TopicLabel from './TopicLabel'

export default {
    component: TopicLabel,
    title: 'Components/Chat/TopicLabel',
}

const Template: StoryObj<typeof TopicLabel> = {
    render: (args) => <TopicLabel {...args} />,
}

export const ForTopic: typeof Template = {
    ...Template,
    args: {
        topic: 'Example topic',
        side: 'true',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await expect(canvas.getByText('FOR')).toBeInTheDocument()
        await expect(canvas.getByText(/Example topic/)).toBeInTheDocument()
    },
}

export const AgainstTopic: typeof Template = {
    ...Template,
    args: {
        topic: 'Example topic',
        side: 'false',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await expect(canvas.getByText('AGAINST')).toBeInTheDocument()
        await expect(canvas.getByText(/Example topic/)).toBeInTheDocument()
    },
}

export const ForEmpty: typeof Template = {
    ...Template,
    args: {
        topic: '',
        side: 'true',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await expect(canvas.getByText('FOR')).toBeInTheDocument()
        await expect(canvas.queryByText(/Example topic/)).not.toBeInTheDocument()
    },
}

export const AgainstEmpty: typeof Template = {
    ...Template,
    args: {
        topic: '',
        side: 'false',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        await expect(canvas.getByText('AGAINST')).toBeInTheDocument()
        await expect(canvas.queryByText(/Example topic/)).not.toBeInTheDocument()
    },
}
