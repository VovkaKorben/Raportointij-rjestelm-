import '../assets/css/Button.css'



function Button({ text, ico = null, className = '', bg }) {


    return (
        <button
            className={`frcc ${className}`}
            style={bg ? { backgroundColor: bg } : {}}
        >
            {ico && <img src={`/images/${ico}.svg`} alt="" />}
            {text}
        </button>
    )
}

export default Button
