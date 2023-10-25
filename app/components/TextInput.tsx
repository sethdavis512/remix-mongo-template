interface TextInputProps {
    id: string;
    label: string;
    name: string;
    type?: 'email' | 'text' | 'password';
    helper?: string;
    onChange?: (...args: any) => any;
    placeholder?: string;
    value?: string;
}

export default function TextInput({
    helper,
    id,
    label,
    name,
    onChange,
    placeholder,
    type = 'text',
    value
}: TextInputProps) {
    return (
        <div className="field">
            <label htmlFor={id} className="label">
                {label}
            </label>
            <div className="control">
                <input
                    id={id}
                    className="input"
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
            {helper && <p className="help">{helper}</p>}
        </div>
    );
}
