import { clsx } from "clsx"

type Props = {
    id: string;
    name: string;
    lost: boolean;
    backgroundColor: string;
    color: string;
}

export default function Language({ id, name, lost, backgroundColor, color }: Props) {
    const styles = {
        backgroundColor: backgroundColor,
        color: color,
    }
    
    const className = clsx({
        language: true,
        lost: lost,
    })

    return (
        <>
            <div className={className} style={styles}>
                {name}
            </div>
        </>
    )
}