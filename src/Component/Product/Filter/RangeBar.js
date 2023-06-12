import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeBar = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(250);

    const handleSliderChange = (values) => {
        setMinValue(values[0]);
        setMaxValue(values[1]);
    };

    return (
        <div className="ec-sidebar-block">
            <div className="ec-sb-title">
                <h3 className="ec-sidebar-title">Price</h3>
            </div>
            <div className="ec-sb-block-content es-price-slider">
                <div className="ec-price-filter">
                    <Slider
                        range
                        min={0}
                        max={250}
                        step={10}
                        value={[minValue, maxValue]}
                        onChange={handleSliderChange}
                    />
                    <div className="ec-price-input">
                        <label className="filter__label">
                            <input
                                type="text"
                                className="filter__input"
                                value={minValue}
                                onChange={(e) => setMinValue(e.target.value)}
                            />
                        </label>
                        <span className="ec-price-divider"></span>
                        <label className="filter__label">
                            <input
                                type="text"
                                className="filter__input"
                                value={maxValue}
                                onChange={(e) => setMaxValue(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RangeBar;
