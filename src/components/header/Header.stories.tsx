import { StoryObj } from '@storybook/react'
import Header from './Header'

const Component = Header

export default {
    component: Component,
    title: 'Components/Header',
}

const Template: StoryObj<typeof Component> = {
    render: (args) => <Component {...args} />,
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
