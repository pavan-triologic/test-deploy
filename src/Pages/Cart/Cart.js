import React from 'react'
import BreadCrumb from '../../Component/BreadCrumb'
import { useLocation, useNavigate } from 'react-router-dom'

const Cart = () => {
    const nav = useLocation()

    return (
        <>
            <BreadCrumb To="/" PrevpPage="Home" />
            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="ec-cart-leftside col-lg-8 col-md-12 ">
                            {/* <!-- cart content Start --> */}
                            <div className="ec-cart-content">
                                <div className="ec-cart-inner">
                                    <div className="row">
                                        <form action="#">
                                            <div className="table-content cart-table-content">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>Price</th>
                                                            <th
                                                            // style="text-align: center;"
                                                            >Quantity</th>
                                                            <th>Total</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td data-label="Product" className="ec-cart-pro-name"><a
                                                                href="product-left-sidebar.html"><img
                                                                    className="ec-cart-pro-img mr-4"
                                                                    src="assets/images/product-image/1.jpg" alt="" />Stylish
                                                                Baby Shoes</a></td>
                                                            <td data-label="Price" className="ec-cart-pro-price"><span
                                                                className="amount">$56.00</span></td>
                                                            <td data-label="Quantity" className="ec-cart-pro-qty"
                                                            // style="text-align: center;"
                                                            >
                                                                <div className="cart-qty-plus-minus">
                                                                    <input className="cart-plus-minus" type="text"
                                                                        name="cartqtybutton" value="1" />
                                                                </div>
                                                            </td>
                                                            <td data-label="Total" className="ec-cart-pro-subtotal">$56.00</td>
                                                            <td data-label="Remove" className="ec-cart-pro-remove">
                                                                <a href="#"><i className="ecicon eci-trash-o"></i></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td data-label="Product" className="ec-cart-pro-name"><a
                                                                href="product-left-sidebar.html"><img
                                                                    className="ec-cart-pro-img mr-4"
                                                                    src="assets/images/product-image/2.jpg" alt="" />Unisex
                                                                Fully Solid Hoodie</a></td>
                                                            <td data-label="Price" className="ec-cart-pro-price"><span
                                                                className="amount">$75.00</span></td>
                                                            <td data-label="Quantity" className="ec-cart-pro-qty"
                                                            // style="text-align: center;"
                                                            >
                                                                <div className="cart-qty-plus-minus">
                                                                    <input className="cart-plus-minus" type="text"
                                                                        name="cartqtybutton" value="1" />
                                                                </div>
                                                            </td>
                                                            <td data-label="Total" className="ec-cart-pro-subtotal">$75.00</td>
                                                            <td data-label="Remove" className="ec-cart-pro-remove">
                                                                <a href="#"><i className="ecicon eci-trash-o"></i></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td data-label="Product" className="ec-cart-pro-name"><a
                                                                href="product-left-sidebar.html"><img
                                                                    className="ec-cart-pro-img mr-4"
                                                                    src="assets/images/product-image/3.jpg"
                                                                    alt="" />Beautiful T-shirt For Women</a></td>
                                                            <td data-label="Price" className="ec-cart-pro-price"><span
                                                                className="amount">$48.00</span></td>
                                                            <td data-label="Quantity" className="ec-cart-pro-qty"
                                                            // style="text-align: center;"
                                                            >
                                                                <div className="cart-qty-plus-minus">
                                                                    <input className="cart-plus-minus" type="text"
                                                                        name="cartqtybutton" value="1" />
                                                                </div>
                                                            </td>
                                                            <td data-label="Total" className="ec-cart-pro-subtotal">$48.00</td>
                                                            <td data-label="Remove" className="ec-cart-pro-remove">
                                                                <a href="#"><i className="ecicon eci-trash-o"></i></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td data-label="Product" className="ec-cart-pro-name"><a
                                                                href="product-left-sidebar.html"><img
                                                                    className="ec-cart-pro-img mr-4"
                                                                    src="assets/images/product-image/4.jpg" alt="" />Wool
                                                                Hat For Men</a></td>
                                                            <td data-label="Price" className="ec-cart-pro-price"><span
                                                                className="amount">$95.00</span></td>
                                                            <td data-label="Quantity" className="ec-cart-pro-qty"
                                                            // style="text-align: center;"
                                                            >
                                                                <div className="cart-qty-plus-minus">
                                                                    <input className="cart-plus-minus" type="text"
                                                                        name="cartqtybutton" value="1" />
                                                                </div>
                                                            </td>
                                                            <td data-label="Total" className="ec-cart-pro-subtotal">$95.00</td>
                                                            <td data-label="Remove" className="ec-cart-pro-remove">
                                                                <a href="#"><i className="ecicon eci-trash-o"></i></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="ec-cart-update-bottom">
                                                        <a href="#">Continue Shopping</a>
                                                        <button className="btn btn-primary">Check Out</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Sidebar Area Start --> */}
                        <div className="ec-cart-rightside col-lg-4 col-md-12">
                            <div className="ec-sidebar-wrap">
                                {/* <!-- Sidebar Summary Block --> */}
                                <div className="ec-sidebar-block">
                                    <div className="ec-sb-title">
                                        <h3 className="ec-sidebar-title">Summary</h3>
                                    </div>
                                    <div className="ec-sb-block-content">
                                        <h4 className="ec-ship-title">Estimate Shipping</h4>
                                        <div className="ec-cart-form">
                                            <p>Enter your destination to get a shipping estimate</p>
                                            <form action="#" method="post">
                                                <span className="ec-cart-wrap">
                                                    <label>Country *</label>
                                                    <span className="ec-cart-select-inner">
                                                        <select name="ec_cart_country" id="ec-cart-select-country"
                                                            className="ec-cart-select">
                                                            <option selected="" disabled="">United States</option>
                                                            <option value="1">Country 1</option>
                                                            <option value="2">Country 2</option>
                                                            <option value="3">Country 3</option>
                                                            <option value="4">Country 4</option>
                                                            <option value="5">Country 5</option>
                                                        </select>
                                                    </span>
                                                </span>
                                                <span className="ec-cart-wrap">
                                                    <label>State/Province</label>
                                                    <span className="ec-cart-select-inner">
                                                        <select name="ec_cart_state" id="ec-cart-select-state"
                                                            className="ec-cart-select">
                                                            <option selected="" disabled="">Please Select a region, state
                                                            </option>
                                                            <option value="1">Region/State 1</option>
                                                            <option value="2">Region/State 2</option>
                                                            <option value="3">Region/State 3</option>
                                                            <option value="4">Region/State 4</option>
                                                            <option value="5">Region/State 5</option>
                                                        </select>
                                                    </span>
                                                </span>
                                                <span className="ec-cart-wrap">
                                                    <label>Zip/Postal Code</label>
                                                    <input type="text" name="postalcode" placeholder="Zip/Postal Code" />
                                                </span>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="ec-sb-block-content">
                                        <div className="ec-cart-summary-bottom">
                                            <div className="ec-cart-summary">
                                                <div>
                                                    <span className="text-left">Sub-Total</span>
                                                    <span className="text-right">$80.00</span>
                                                </div>
                                                <div>
                                                    <span className="text-left">Delivery Charges</span>
                                                    <span className="text-right">$80.00</span>
                                                </div>
                                                <div>
                                                    <span className="text-left">Coupan Discount</span>
                                                    <span className="text-right"><a className="ec-cart-coupan">Apply Coupan</a></span>
                                                </div>
                                                <div className="ec-cart-coupan-content">
                                                    <form className="ec-cart-coupan-form" name="ec-cart-coupan-form" method="post"
                                                        action="#">
                                                        <input className="ec-coupan" type="text" required=""
                                                            placeholder="Enter Your Coupan Code" name="ec-coupan" value="" />
                                                        <button className="ec-coupan-btn button btn-primary" type="submit"
                                                            name="subscribe" value="">Apply</button>
                                                    </form>
                                                </div>
                                                <div className="ec-cart-summary-total">
                                                    <span className="text-left">Total Amount</span>
                                                    <span className="text-right">$80.00</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Sidebar Summary Block --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart