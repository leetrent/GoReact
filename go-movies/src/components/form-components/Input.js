const Input = (props) => {
    return (
        <div className="mb-3">
        <label htmlFor={props.name} className="form-label">{props.title}</label>
        <input
            id={props.name}
            name={props.name}
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            className={`form-control ${props.className}`}
            onChange={props.handleChange}>
        </input>
        <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
    );
};

export default Input;
