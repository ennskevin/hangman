type Props = {
    id: string;
    name: string;
    isAlive: boolean;
    backgroundColor: string;
    color: string;
}

export default function Language({ id, name, isAlive, backgroundColor, color }: Props) {
    const styles = {
        backgroundColor: backgroundColor,
        color: color,
    }

    return (
        <>
            <div className="language" style={styles}>
                {name}
            </div>
        </>
    )
}