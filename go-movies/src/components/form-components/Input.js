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
            className="form-control"
            onChange={props.handleChange}
            required>
        </input>
        <div className="invalid-feedback">{props.errormsg}</div>
    </div>
    );
};

export default Input;
