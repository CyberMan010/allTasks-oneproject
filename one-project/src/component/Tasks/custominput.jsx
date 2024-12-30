import React, { useState } from "react";

function InputCustom({
    name,
    type = "text",
    placeholder,
    required,
    minLength,
    maxLength,
    options,
    onInputChange,
}) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        // Validation
        if (required && inputValue.trim() === "") {
            setError(`${name} is required`);
        } else if (type === "text" && minLength && inputValue.length < minLength) {
            setError(`${name} must be at least ${minLength} characters`);
        }
        else if (maxLength && inputValue.length > maxLength) {
            setError(`${name} must be no more than ${maxLength} characters`);
        }  
        // Validation for due date
        else if (type === "date" && new Date(inputValue) < new Date()) {
            setError(`${name} cannot be in the past`);
        }
        else if (type === "select" && required && !inputValue) {
            setError(`${name} is required`);
        }  else {
            setError("");
        }

        onInputChange(inputValue);
    };

    return (
        <div>
        {type === "select" ? (
            <select
                name={name}
                value={value}
                onChange={handleChange}
                style={{
                    border: error ? "1px solid red" : "1px solid #ccc",
                    padding: "0.5em",
                }}
            >
                <option value="" disabled>
                    Select {name}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                maxLength={maxLength}
                onChange={handleChange}
                style={{
                    border: error ? "1px solid red" : "1px solid #ccc",
                    padding: "0.5em",
                }}
            />
        )}
        {error && <p style={{ color: "red", fontSize: "0.8em" }}>{error}</p>}
    </div>
    );
}

export default InputCustom;
