import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = ({ To, PrevpPage }) => {
    return (
        <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row ec_breadcrumb_inner">
                            <div className="col-md-6 col-sm-12">
                                <h2 className="ec-breadcrumb-title">Shop</h2>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <ul className="ec-breadcrumb-list">
                                    <li className="ec-breadcrumb-item">
                                        <a href="index.html"></a>
                                        <Link to={To}>{PrevpPage}</Link>
                                    </li>
                                    <li className="ec-breadcrumb-item active">Shop</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BreadCrumb