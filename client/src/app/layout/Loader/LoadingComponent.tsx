import './LoadingComponent.css';

interface Props {
    content?: string;
}

export default function LoadingComponent({ content = 'Loading...' }: Props) {
    return (
        <div className="dimmer">
            <div className="loader"></div>
            <div className="loading-text">{content}</div>
        </div>
    );
}