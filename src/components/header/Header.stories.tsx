import { StoryObj } from '@storybook/react'
import Header from './Header'

export default {
    component: Header,
    title: 'Components/Header',
}

const Template: StoryObj<typeof Header> = {
    render: (args) => <Header {...args} />,
}

export const HeaderLight: typeof Template = {
    ...Template,
    loaders: [
        async () => ({
            setTheme: localStorage.setItem('theme', JSON.stringify('light')),
        }),
    ],
}

export const HeaderDark: typeof Template = {
    ...Template,
    loaders: [
        async () => ({
            setTheme: localStorage.setItem('theme', JSON.stringify('dark')),
        }),
    ],
}
