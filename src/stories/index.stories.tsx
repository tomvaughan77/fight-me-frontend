import { StoryObj } from '@storybook/react'
import Home from '../pages/index'

const Component = Home

export default {
    component: Component,
    title: 'Pages',
}

const Template: StoryObj<typeof Component> = {
    render: (args) => <Component {...args} />,
}

export const HomePage: typeof Template = {
    ...Template,
    loaders: [
        async () => ({
            setTheme: localStorage.setItem('theme', JSON.stringify('light')),
        }),
    ],
}
