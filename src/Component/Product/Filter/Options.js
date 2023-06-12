import React, { useState } from "react";

function Options({ options }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className="ec-pro-size">
            {/* <span className="ec-pro-opt-label">Options</span> */}
            <ul className="ec-opt-size">
                {options &&
                    options.length >= 0 &&
                    options.map((option, index) => (
                        <li key={index} className={selectedOption === option ? "active" : ""}>
                            <button
                                className="ec-opt-sz"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Options;
