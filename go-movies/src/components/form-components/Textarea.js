const Textarea = (props) => {
    return (
        <div className="mb-3">
        <label htmlFor={props.name} className="form-label">{props.title}</label>
        <textarea 
            id={props.name}
            name={props.name}
            value={props.value}
            rows={props.rows}
            className="form-control"
            onChange={props.handleChange}
        />
    </div>
    );
};

export default Textarea;
