interface TopicLabelProps {
    topic: string
    side: string
}

const TopicLabel: React.FC<TopicLabelProps> = ({ topic, side }) => {
    console.log(`Side: ${side}`)
    console.log(`Value: ${side === 'true'}`)
    return (
        <>
            You are arguing {side === 'true' ? <SidelabelFor /> : <SidelabelAgainst />} {topic}
        </>
    )
}

const SidelabelFor = () => <div className="badge badge-success gap-2">FOR</div>
const SidelabelAgainst = () => <div className="badge badge-error gap-2">AGAINST</div>

export default TopicLabel
