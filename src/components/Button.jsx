export default function Button ({func, classStyle, text}) {
    return (
        <button onClick={func} className={classStyle}>{text}</button>
    )
}