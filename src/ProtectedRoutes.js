import React, { useEffect } from 'react'
import { useGetSettingQuery } from './redux/Reducer/Api';
import { useDispatch } from 'react-redux';
import { getSettingData } from './redux/Reducer/reducer';
import Header from './Component/Header';
import { useLocation } from 'react-router-dom';
import Loader from './Component/Loader';

const ProtectedRoutes = ({ Component }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const companyCode = searchParams.get('company_code');
    const { data, isLoading, isError, refetch } = useGetSettingQuery({ companyCode: companyCode });
    const dispatch = useDispatch();
    useEffect(() => {
        refetch();
    }, [refetch]);
    if (!isLoading && !isError) {
        // console.log(data[0]);
        dispatch(getSettingData(data[0]));
    }
    return (
        <div>
            <Header />
            <Loader isLoading={isLoading} />
            {
                !isLoading &&

                <>
                    <Component />
                </>
            }
        </div>
    )
}

export default ProtectedRoutes