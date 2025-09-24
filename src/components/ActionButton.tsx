interface ActionButtonProp {
    name: string;
    isClickable: boolean;
    onClick: () => void;
}

export default function ActionButton({ name, isClickable, onClick }: ActionButtonProp) {
    return (
        <div className="action-button-container">
            <button className="action-button" disabled={!isClickable} onClick={onClick}>
                {name}
            </button>
        </div>
    );
}
