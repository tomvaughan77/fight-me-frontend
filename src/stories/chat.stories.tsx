import { StoryObj } from '@storybook/react'
import Chat from '../pages/chat'

const Component = Chat

export default {
    component: Component,
    title: 'Pages',
}

const Template: StoryObj<typeof Component> = {
    render: (args) => <Component {...args} />,
}

export const ChatPage: typeof Template = {
    ...Template,
    loaders: [
        async () => ({
            setTheme: localStorage.setItem('theme', JSON.stringify('light')),
        }),
    ],
}
