type Props = {
    message: string;
    onClose: () => void;
};

export default function SuccessBanner({ message, onClose }: Props) {
    return (
        <div className="success-banner">
            <span>{message}</span>
            <button onClick={onClose}>✕</button>
        </div>
    );
}