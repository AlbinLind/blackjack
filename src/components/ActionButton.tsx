interface ActionButtonProp {
    name: string;
    isClickable: boolean;
    onClick: () => void;
    position: {
        left: number;
        top: number;
    }
}

export default function ActionButton({ name, isClickable, onClick, position}: ActionButtonProp) {
    return (
        <div className="action-button-container" style={position}>
            <button className="action-button" disabled={isClickable} onClick={onClick}>
                {name}
            </button>
        </div>
    );
}
