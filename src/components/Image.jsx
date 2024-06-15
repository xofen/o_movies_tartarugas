function Image (props) {
    return <img src={props.url} style={{
        width: props.width,
        height: props.height,
        borderRadius: '10px',
    }}></img>;
}

export default Image