import React, { useEffect, useState } from "react";
import Product from "../../Component/Product/Product";
import axios from "axios";
import { useGetSortQuery } from "../../redux/Reducer/Api";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { ApiList } from "../../Api/ApiList";
import { BASE_URL } from "../../Api/ApiList";
import Slider from "rc-slider";
import Loader from "../../Component/Loader";
import { useLocation } from "react-router-dom";


const ShopFullWidthCol6 = () => {
    // const [settings, setSettings] = useState()

    const [sort, setSort] = useState(0)
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [filterTitle, setFilterTitle] = useState([])
    const [filterData, setFilterData] = useState([])
    const [showSideBar, setShowSideBar] = useState(false)
    const [data, setData] = useState([])
    const [minGrossWt, setMinGrossWt] = useState()
    const [maxGrossWt, setMaxGrossWt] = useState()
    const [minNetWt, setMinNetWt] = useState()
    const [maxNetWt, setMaxNetWt] = useState()
    const [pieces, setPieces] = useState()
    const [designStatus, setDesignStatus] = useState()
    const [size, setSize] = useState()
    const [hasMore, setHasmore] = useState(true)
    const [hasMorefData, setHasmorefData] = useState(false)
    const [isFdata, setIsFdata] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fDataCount, setFDataCount] = useState()
    const [totalDataCount, setTotalDataCount] = useState()
    const [error, setError] = useState({})

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const company_code = searchParams.get('company_code');
    const catalogueId = searchParams.get('catalogue_id');
    const userId = searchParams.get('user_id');

    // Use the "companyCode" in your component

    // Use the "companyCode" in your component
    // console.log(company_code)


    const settings = useSelector((state) => state.reducer.settings);

    // const getCount = useGetProductCountQuery();
    const CDN = settings?.cdn
    const showLabel = settings?.show_center_label_matrix
    const labelValue = settings?.center_label_matrix_value
    const showStepper = settings?.show_quantity_stepper_on_matrix
    const lessThanMoq = settings?.allow_lessthan_moq
    const defaultData = settings?.default_matrix_page_load



    // const getFilterData = useGetFilterDataQuery()
    // const { data, isLoading, isError, refetch } = useGetProductQuery(sort, page);

    const fetchFilterDataCount = async () => {
        try {
            const response = await axios.get(BASE_URL + ApiList.productMatrixCount +
                `?mode=catalogue_filter&max_gross_wt=${maxGrossWt}&catalogue_id=${catalogueId}&user_id=${userId}&cat_id=0&session_id=&company_code=${company_code}&sort=${sort}&design_status=${designStatus ? designStatus.id : "1"}&min_gross_wt=${minGrossWt}&table=design_master`,
            )
            if (response && response?.data?.count > 0) {
                setFDataCount(response?.data?.count);
                setIsFdata(true)
            }
            console.log(response)
        } catch (error) {
            console.error(error)
        }


    }
    const fetchFilteredData = async (page, sort) => {
        try {
            setIsLoading(true)
            const response = await axios.get(BASE_URL + ApiList.products +
                `?max_gross_wt=${maxGrossWt}&data=${defaultData}&sort=${sort}&mode=catalogue_filter&catalogue_id=${catalogueId}&user_id=${userId}&cat_id=0&company_code=${company_code}&page=${page}&design_status=${designStatus ? designStatus.id : "1"}&min_gross_wt=${minGrossWt}&table=design_master`,
            )

            if (response) {
                setIsLoading(false);
                response.data.length >= parseInt(defaultData) ? setHasmorefData(true) : setHasmorefData(false)
            }
            setIsFdata(true)
            setData(response.data)

        } catch (error) {
            setIsLoading(false)
            error.response.status === 500 && setError({ data: "No Data Found" })
        }


    }
    const fetchFilterData = async () => {
        try {
            // setIsLoading(true)
            const response = await axios.get(BASE_URL + ApiList.fetchParams +
                `?collection_id=&mode=my_catalogue&catalogue_id=${catalogueId}&user_id=${userId}&cat_id=0&company_code=${company_code}&design_status=1&table=design_master`,
            )
            if (response) {
                // setIsLoading(false)
                response?.data.length >= 0 &&
                    response.data.map((i) => {
                        setFilterTitle(i.sort);
                        setFilterData(i.data)
                        i.sort && i.sort.map((data) => {
                            if (data && data.field === "gross_wt" && i.data[data.field].length > 0) {
                                setMaxGrossWt(i.data[data.field][0].max_gross_wt)
                                setMinGrossWt(i.data[data.field][0].min_gross_wt)
                            }
                            if (data && data.field === "design_status" && i.data[data.field].length > 0) {
                                let status = i.data[data.field].filter((_) => _.selected === "1")
                                setDesignStatus(status[0])
                            }
                            if (data && data.field === "net_wt" && i.data[data.field].length > 0) {
                                console.log(i.data[data.field].length > 0)
                                setMaxNetWt(i.data[data.field][0].max_net_wt)
                                setMinNetWt(i.data[data.field][0].min_net_wt)
                            }
                            return data
                        })
                        return i
                    })
            }

        } catch (error) {
            console.error(error)
            // setIsLoading(false)
        }

    }
    const fetchData = async (page, sort, defaultData) => {
        try {
            if (defaultData) {
                setIsLoading(true)
                const response = await axios.get(`http://demo.jewelflow.pro/online_api/v3/Matrix?mode=catalogue_filter&data=${defaultData}&catalogue_id=${catalogueId}&user_id=${userId}&cat_id=0&company_code=${company_code}&page=${page}&sort=${sort}&table=design_master`)
                response && setIsLoading(false);
                setData(response.data)
                if (response.data && totalDataCount) {
                    response.data.length < totalDataCount ? setHasmore(true) : setHasmore(false)
                }
            }
        } catch (error) {
            setIsLoading(false)
            error.response.status === 500 && setError({ data: "No Data Found" })
        }
    }
    const sortApi = useGetSortQuery({ companyCode: company_code });
    const sortData = sortApi?.data
    if (!sortApi.isLoading) {
    }

    const dataCount = async () => {
        try {
            const response = await axios.get(BASE_URL + ApiList.productMatrixCount +
                `?mode=catalogue_filter&catalogue_id=${catalogueId}&user_id=${userId}&cat_id=0&company_code=${company_code}&table=design_master`,
            )
            if (response && response?.data?.count > 0) {
                setTotalDataCount(response?.data?.count);
            }
        } catch (error) {
            setIsLoading(false)
        }

    }
    const fetchNextPage = async () => {
        if (isFdata) {
            if (hasMorefData) {
                try {
                    setLoading(true)
                    const add = page + 1
                    const response = await axios.get(BASE_URL + ApiList.products +
                        `?max_gross_wt=${maxGrossWt}&data=${defaultData}&sort=${sort}&mode=catalogue_filter&catalogue_id=${catalogueId}&user_id=${userId}&cat_id=0&company_code=${company_code}&page=${add}&design_status=${designStatus ? designStatus.id : "1"}&min_gross_wt=${minGrossWt}&table=design_master`);
                    response && setLoading(false)
                    const Data = response.data;
                    const newData = [...data, ...Data]
                    newData.length >= fDataCount ? setHasmorefData(false) : setHasmorefData(true)
                    setData(newData);
                    setPage((oldPage) => oldPage + 1);
                } catch (error) {
                    // Handle error if needed
                    console.error('All Data Displayed', error);
                    setLoading(false)
                }
            }
        }
        else {
            if (hasMore) {
                try {
                    setLoading(true)
                    const add = page + 1
                    const response = await axios.get(`http://demo.jewelflow.pro/online_api/v3/Matrix?mode=catalogue_filter&data=${defaultData}&catalogue_id=${catalogueId}&user_id=${userId}&cat_id=0&company_code=${company_code}&page=${add}&sort=${sort}&table=design_master`);
                    response && setLoading(false)
                    const Data = response.data;
                    const newData = [...data, ...Data]
                    newData.length >= totalDataCount ? setHasmore(false) : setHasmore(true)
                    setData(newData);
                    setPage((oldPage) => oldPage + 1);
                } catch (error) {
                    // Handle error if needed
                    setLoading(false)
                    console.error('All Data Displayed', error);
                }
            }
        }
    };
    const changeSort = (e) => {
        setSort(e.target.value)
        // setData([])
        setPage(0)
        isFdata ? fetchFilteredData(0, e.target.value) : fetchData(0, e.target.value)
    }

    const handlefilterOptions = (e, d, i, name) => {
        name === "piece" && setPieces(d)
        name === "design_status" && setDesignStatus(d)
        name === "size" && setSize(d)
    }
    const handleSliderChange = (values, name) => {
        if (name === "gross_wt") { setMinGrossWt(values[0]); setMaxGrossWt(values[1]); }

        if (name === "net_wt") { setMinNetWt(values[0]); setMaxNetWt(values[1]); }

    }
    const applyFilter = () => {
        console.log("selected minGrossWt==>", minGrossWt)
        console.log("selected maxGrossWt==>", maxGrossWt)
        console.log("selected minNetWt==>", minNetWt)
        console.log("selected maxNetWt==>", maxNetWt)
        console.log("selected pieces==>", pieces)
        console.log("selected designStatus==>", designStatus)
        console.log("selected size==>", size)
        setShowSideBar(false)
        fetchFilterDataCount()
    }
    const clearFilter = () => {
        setMinGrossWt(null)
        setMaxGrossWt(null)
        setMinNetWt(null)
        setMaxNetWt(null)
        setPieces(null)
        setDesignStatus(null)
        setSize(null)
        fetchFilterData()
    }

    useEffect(() => {

        !isFdata && sortApi.refetch();
        !isFdata && fetchData(page, sort, defaultData)
        // getFilterData.refetch()
        !isFdata && fetchFilterData()
        !isFdata && dataCount()
        // refetch();
        fDataCount > 0 && fetchFilteredData(0, sort);

    }, [fDataCount, company_code, sort, defaultData]);
    // console.log(error)
    console.log(data)
    return (
        <div>
            {/* <BreadCrumb /> */}
            <section className="ec-page-content ">
                <div className="container-fluid">
                    <div className="row">
                        <div className="ec-shop-rightside col-lg-12 col-md-12">
                            <div className="ec-pro-list-top d-flex">
                                <div className="col-md-6 ec-grid-list">
                                    <div className="ec-gl-btn">
                                        <button className="btn sidebar-toggle-icon"
                                            onClick={() => setShowSideBar(!showSideBar)}>
                                            <i className="fi-rr-filter"></i>
                                        </button>
                                        {/* <button className="btn btn-grid-50 active">
                                            <i className="fi-rr-apps"></i>
                                        </button>
                                        <button className="btn btn-list-50">
                                            <i className="fi-rr-list"></i>
                                        </button> */}
                                    </div>
                                </div>
                                <div className="col-md-6 ec-sort-select">
                                    <span className="sort-by">Sort by</span>
                                    <div className="ec-select-inner">
                                        <select name="ec-select" id="ec-select" onChange={changeSort} value={sort}>
                                            {sortData && sortData.length > 0 ? (
                                                sortData.map((item, i) => (
                                                    <option key={i} value={item?.value}>{item?.label}</option>
                                                ))
                                            ) : (
                                                <option value="" disabled>No data available</option>
                                            )}
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <Loader isLoading={isLoading} />
                            {!isLoading &&
                                <div className="shop-pro-content">
                                    <div className="shop-pro-inner">
                                        <div className="row">
                                            <InfiniteScroll
                                                hasMore={hasMore}
                                                dataLength={(data && data.length) || 0}
                                                next={fetchNextPage}
                                            >
                                                {data && data.length > 0 ? (
                                                    <div className="row">
                                                        {data.map((item, index) => (
                                                            <div
                                                                key={index}
                                                                className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-6 pro-gl-content"
                                                            >
                                                                <Product
                                                                    id={item?.design_master_id}
                                                                    image={`${CDN}${item.image_path}${item.design_files}`}
                                                                    centerLabel={showLabel && item[labelValue]}
                                                                    label={item?.label}
                                                                    values={item?.values}
                                                                    showStepper={showStepper}
                                                                    minQty={item?.min_order_quantity}
                                                                    lessThanMoq={lessThanMoq}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : <>
                                                    <h1>{error.data}</h1>
                                                </>}
                                                <Loader isLoading={loading} />
                                            </InfiniteScroll>
                                        </div>

                                    </div>
                                    {/* <!-- Ec Pagination Start --> */}
                                    {/* <div className="ec-pro-pagination">
                                    <span>Showing 1-12 of 21 item(s)</span>
                                    <ul className="ec-pro-pagination-inner">
                                        <li>
                                            <a className="active" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">2</a>
                                        </li>
                                        <li>
                                            <a href="#">3</a>
                                        </li>
                                        <li>
                                            <a href="#">4</a>
                                        </li>
                                        <li>
                                            <a href="#">5</a>
                                        </li>
                                        <li>
                                            <a className="next" href="#">
                                                Next <i className="ecicon eci-angle-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div> */}
                                    {/* <!-- Ec Pagination End --> */}
                                </div>}
                            {/* <!--Shop content End --> */}
                        </div>
                        {/* <!-- Sidebar Area Start --> */}
                        <div className="filter-sidebar-overlay " style={showSideBar ? { display: "block" } : { display: "none" }}></div>
                        <div className={showSideBar ? "ec-shop-leftside filter-sidebar toggle-sidebar-swipe" : "ec-shop-leftside filter-sidebar "} >
                            <div className="ec-sidebar-heading">
                                <h1>Filter Products By</h1>
                                {/* <a > */}
                                <button className="filter-cls-btn" onClick={() => setShowSideBar(!showSideBar)}>×</button>

                                {/* </a> */}
                            </div>
                            <div className="ec-sidebar-wrap">
                                {/* <div className="ec-sidebar-block">
                                    <div className="ec-sb-title">
                                        <h3 className="ec-sidebar-title">Category</h3>
                                    </div>
                                    <div className="ec-sb-block-content">
                                        <ul>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" checked /> <a href="#">clothes</a><span
                                                        className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" /> <a href="#">Bags</a><span className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" /> <a href="#">Shoes</a><span className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" /> <a href="#">cosmetics</a><span
                                                        className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" /> <a href="#">electrics</a><span
                                                        className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" /> <a href="#">phone</a><span className="checked"></span>
                                                </div>
                                            </li>
                                            <li id="ec-more-toggle-content"
                                            //  style="padding: 0; display: none;"
                                            >

                                                <ul>
                                                    <li>
                                                        <div className="ec-sidebar-block-item">
                                                            <input type="checkbox" /> <a href="#">Watch</a><span
                                                                className="checked"></span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="ec-sidebar-block-item">
                                                            <input type="checkbox" /> <a href="#">Cap</a><span
                                                                className="checked"></span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item ec-more-toggle">
                                                    <span className="checked"></span><span id="ec-more-toggle">More
                                                        Categories</span>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                </div> */}
                                {
                                    filterData &&
                                    filterTitle &&
                                    filterTitle.length >= 0 &&
                                    filterTitle.map((data, index) => {
                                        return <>
                                            <div className="ec-sidebar-block">
                                                <div className="ec-sb-title">
                                                    <h3 className="ec-sidebar-title">{data?.custom_label !== "Karat" ? data?.custom_label : ""}</h3>
                                                </div>
                                                <div className="ec-sb-block-content">
                                                    <ul >
                                                        {filterData[data?.field] &&
                                                            filterData[data?.field].length > 0 &&
                                                            filterData[data?.field].map((d, i) => {

                                                                return <>
                                                                    {d.type === "range" ?
                                                                        <>
                                                                            {
                                                                                data?.field === "gross_wt" &&
                                                                                <div className="ec-sb-block-content es-price-slider">
                                                                                    <div className="ec-price-filter">
                                                                                        <Slider
                                                                                            range
                                                                                            min={parseFloat(d.min_gross_wt) || 0}
                                                                                            max={parseFloat(d.max_gross_wt) || 10}
                                                                                            step={0.01}
                                                                                            defaultValue={[parseFloat(d?.min_gross_wt), parseFloat(d?.max_gross_wt)]}
                                                                                            value={[minGrossWt, maxGrossWt]}
                                                                                            onChange={(values) => handleSliderChange(values, data?.field)}
                                                                                        />
                                                                                        <div className="ec-price-input">
                                                                                            <label className="filter__label">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="filter__input"
                                                                                                    value={minGrossWt}
                                                                                                    onChange={(e) => setMinGrossWt(e.target.value)}
                                                                                                />
                                                                                            </label>
                                                                                            <span className="ec-price-divider"></span>
                                                                                            <label className="filter__label">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="filter__input"
                                                                                                    value={maxGrossWt}
                                                                                                    onChange={(e) => setMaxGrossWt(e.target.value)}
                                                                                                />
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                            {
                                                                                data?.field === "net_wt" &&
                                                                                <div className="ec-sb-block-content es-price-slider">
                                                                                    <div className="ec-price-filter">
                                                                                        <Slider
                                                                                            range
                                                                                            min={parseFloat(d.min_net_wt) || 0}
                                                                                            max={parseFloat(d.max_net_wt) || 10}
                                                                                            step={0.01}
                                                                                            value={[minNetWt, maxNetWt]}
                                                                                            onChange={(values) => handleSliderChange(values, data?.field)}
                                                                                        />
                                                                                        <div className="ec-price-input">
                                                                                            <label className="filter__label">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="filter__input"
                                                                                                    value={minNetWt}
                                                                                                    onChange={(e) => setMinNetWt(e.target.value)}
                                                                                                />
                                                                                            </label>
                                                                                            <span className="ec-price-divider"></span>
                                                                                            <label className="filter__label">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className="filter__input"
                                                                                                    value={maxNetWt}
                                                                                                    onChange={(e) => setMaxNetWt(e.target.value)}
                                                                                                />
                                                                                            </label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </>
                                                                        :
                                                                        <>
                                                                            {
                                                                                data?.field === "design_status" &&
                                                                                <div className="ec-sidebar-block-item">

                                                                                    <li key={i}
                                                                                        className={designStatus && designStatus.id === d.id ? "selected" : ""}
                                                                                    >
                                                                                        <button
                                                                                            className="ec-opt-sz"
                                                                                            onClick={(e) => handlefilterOptions(e, d, i, data?.field)}
                                                                                        >
                                                                                            {d?.design_status_value}
                                                                                        </button>
                                                                                    </li>
                                                                                </div>

                                                                            }
                                                                            {
                                                                                data?.field === "piece" &&
                                                                                <>
                                                                                    <div className="ec-sidebar-block-item">
                                                                                        <li key={i}
                                                                                            className={pieces && pieces.id === d.id ? "selected" : ""}
                                                                                        >
                                                                                            <button
                                                                                                className="ec-opt-sz"
                                                                                                onClick={(e) => handlefilterOptions(e, d, i, data?.field)}
                                                                                            >
                                                                                                {d?.piece_value}
                                                                                            </button>
                                                                                        </li>
                                                                                    </div>
                                                                                </>
                                                                            }
                                                                            {
                                                                                data?.field === "size" &&
                                                                                <>
                                                                                    <div className="ec-sidebar-block-item">
                                                                                        <li key={i}
                                                                                            className={size && size.id === d.id ? "selected" : ""}
                                                                                        >
                                                                                            <button
                                                                                                className="ec-opt-sz"
                                                                                                style={{ position: "sticky" }}
                                                                                                onClick={(e) => handlefilterOptions(e, d, i, data?.field)}
                                                                                            >
                                                                                                {d?.size_value}
                                                                                            </button>
                                                                                        </li>
                                                                                    </div>
                                                                                </>

                                                                            }
                                                                        </>
                                                                    }
                                                                </>
                                                            })
                                                        }


                                                    </ul>
                                                </div>

                                            </div ></>
                                    })
                                }
                                {/* <div className="ec-sidebar-block">
                                    <div className="ec-sb-title">
                                        <h3 className="ec-sidebar-title">Size</h3>
                                    </div>
                                    <div className="ec-sb-block-content">
                                        <ul>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" value="" checked /><a href="#">S</a><span
                                                        className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" value="" /><a href="#">M</a><span
                                                        className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" value="" /> <a href="#">L</a><span
                                                        className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" value="" /><a href="#">XL</a><span
                                                        className="checked"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item">
                                                    <input type="checkbox" value="" /><a href="#">XXL</a><span
                                                        className="checked"></span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="ec-sidebar-block ec-sidebar-block-clr">
                                    <div className="ec-sb-title">
                                        <h3 className="ec-sidebar-title">Color</h3>
                                    </div>
                                    <div className="ec-sb-block-content">
                                        <ul>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#c4d6f9;"
                                                >
                                                </span></div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#ff748b;"
                                                >
                                                </span></div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#000000;"
                                                >
                                                </span></div>
                                            </li>
                                            <li className="active">
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#2bff4a;"
                                                >
                                                </span></div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#ff7c5e;"
                                                >
                                                </span></div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#f155ff;"
                                                >
                                                </span></div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#ffef00;"
                                                >
                                                </span></div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#c89fff;"
                                                >
                                                </span></div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#7bfffa;"
                                                >
                                                </span></div>
                                            </li>
                                            <li>
                                                <div className="ec-sidebar-block-item"><span
                                                // style="background-color:#56ffc1;"
                                                >
                                                </span></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <RangeBar
                                    // step={1}
                                    maxValue={10}
                                    minValue={0}
                                /> */}
                                <div className="ec-sidebar-block" id="apply-btn-contaiiner">
                                    <button className="btn btn-primary" id="btn-filter-apply" onClick={applyFilter}>apply
                                    </button>
                                    {/* </div> */}
                                    {/* <div className="ec-sidebar-block" id="apply-btn-contaiiner"> */}
                                    <button className="btn btn-primary" id="btn-filter-apply" onClick={clearFilter}>clear
                                    </button>
                                </div>
                                {/* <div className="ec-sb-title">
                                        <h3 className="ec-sidebar-title">Price</h3>
                                    </div>
                                    <div className="ec-sb-block-content es-price-slider">
                                        <div className="ec-price-filter">
                                            <div id="ec-sliderPrice" className="filter__slider-price" data-min="0" data-max="250"
                                                data-step="10"></div>
                                            <div className="ec-price-input">
                                                <label className="filter__label"><input type="text" className="filter__input" /></label>
                                                <span className="ec-price-divider"></span>
                                                <label className="filter__label"><input type="text" className="filter__input" /></label>
                                            </div>
                                        </div>
                                    </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default ShopFullWidthCol6;
