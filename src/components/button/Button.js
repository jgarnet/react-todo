const Button = (props) => {
    return (
        <div className="button">
            <button
                type="button"
                onClick={props.click}
                disabled={props.disabled}>{props.text}</button>
        </div>
    );
};

export default Button;
