import React, { useState } from "react";
import { useStateValue } from "../../redux/StateProvide";

const Product = ({ image, id, title, centerLabel, label, values, showStepper, minQty, lessThanMoq }) => {
    const [count, setCount] = useState(parseInt(minQty))
    const Increment = () => {
        let add = count + 1
        setCount(add)
    }
    // const lessThanMoq = false
    // console.log(lessThanMoq)
    // const minQty = 5
    const Decrement = () => {

        // if lessthen moq = Yes
        // count will decrease of minimum count
        // esle count will not decrease of minimum count
        count > 1 && lessThanMoq ? setCount(count - 1) : count > minQty && setCount(count - 1)

        // if (lessThanMoq) {
        //     let dec = count - 1
        //     setCount(dec)
        // } else {
        //     let dec = count - 1
        //     dec > minQty && setCount(dec)
        // }

    }

    return (
        <div className="ec-product-sbtn" key={id}>
            <div className="ec-product-image">
                <a href="#" className="ec-image">
                    <img className="pic-1" src={image} alt="" style={{
                        width: "270px",
                        height: "300px"
                    }} />
                    <img
                        className="pic-2"
                        src="assets/images/product-image/16_2.jpg"
                        alt=""
                    />
                </a>
                {/* <span className="ec-product-sale-label">hot</span> */}
                {/* <span className="ec-product-discount-label">-33%</span> */}
            </div>
            <div className="ec-product-body">
                {/* <ul className="ec-rating">
                    <li className="ecicon eci-star fill"></li>
                    <li className="ecicon eci-star fill"></li>
                    <li className="ecicon eci-star fill"></li>
                    <li className="ecicon eci-star fill"></li>
                    <li className="ecicon eci-star"></li>
                </ul> */}
                <h3 className="ec-title"><a href="#">{title}</a></h3>
                {/* <div className="ec-price"><span>$30.00</span> $20.00</div> */}
                {centerLabel && <><b><span>{centerLabel}</span></b>
                    <br /></>}
                {
                    label && label.length >= 0 && label.map((item, i) => {
                        return <><b> <span>{item}</span></b> :<span> {values[i]}</span><br />
                        </>
                    })
                }
                <div className="stepper">
                    {showStepper && <div className="qty-plus-minus"><div className="dec ec_qtybtn" onClick={Decrement}>-</div>
                        <input className="qty-input" type="text" disabled name="ec_qtybtn" value={count} />
                        <div className="inc ec_qtybtn" onClick={Increment}>+</div>
                    </div>}</div>

                <div className="ec-product-button-group">
                    <a className="ec-product-like-icon" href="#"><i className="fi-rr-heart"></i></a>
                    <a className="ec-add-to-cart" href="#">ADD TO CART</a>
                    <a className="ec-product-compare-icon" href="#"><i className="fi fi-rr-arrows-repeat"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Product
