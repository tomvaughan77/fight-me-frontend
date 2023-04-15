export interface TopicLabelProps {
    topic: string
    side: string
}

const TopicLabel: React.FC<TopicLabelProps> = ({ topic, side }) => (
    <>
        You are arguing {side === 'true' ? <SideLabelFor /> : <SideLabelAgainst />} {topic}
    </>
)

const SideLabelFor = () => <div className="badge badge-success gap-2">FOR</div>
const SideLabelAgainst = () => <div className="badge badge-error gap-2">AGAINST</div>

export default TopicLabel
