interface Props {
    onClick: () => void;
    title: string;
    className?: string;
}

const ButtonComponent = ({ onClick, title, className }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`rounded text-white shadow ${className}`}
        >
            {title}
        </button>
    );
};

export default ButtonComponent;