import TopicLabel, { TopicLabelProps } from './TopicLabel'

export default {
    component: TopicLabel,
    title: 'Components/Chat/TopicLabel',
}

const Template = {
    render: (args: TopicLabelProps) => <TopicLabel {...args} />,
}

export const ForTopic = {
    ...Template,
    args: {
        topic: 'Example topic',
        side: 'true',
    },
}

export const AgainstTopic = {
    ...Template,
    args: {
        topic: 'Example topic',
        side: 'false',
    },
}

export const ForEmpty = {
    ...Template,
    args: {
        topic: '',
        side: 'true',
    },
}

export const AgainstEmpty = {
    ...Template,
    args: {
        topic: '',
        side: 'false',
    },
}
