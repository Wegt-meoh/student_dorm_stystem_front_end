import { useLocation, Link, useSearchParams, useNavigate } from "react-router-dom";

import React,{useState} from 'react';
import { useEffect } from "react";

export const QueryNavLink = ({ to, style, ...props }) => {
    const location = useLocation()
    return (
        <Link to={to + location.search}
            style={{ ...style }}
            {...props} />
    );
}

export const BrandLink = ({ to, brand, style, ...props }) => {

    let [searchParams,setSearchParams] = useSearchParams()
    let isActive = searchParams.getAll('brand').includes(brand + '')
    const [state, setstate] = useState({'_searchParams':searchParams.toString()});
    // function handleClick() {
    //     if (!isActive) {
    //         console.log('search params before', searchParams.toString())
    //         setSearchParams(new URLSearchParams(searchParams.append('brand', brand)),)
    //         setstate({'_searchParams':searchParams.toString()})
    //         console.log('search params after', searchParams.toString())
    //     }
    //     console.log(isActive, searchParams.toString())
    // }
    // useEffect until after the browser has painted
    // useEffect(
    //     () => {

    //     }, []
    // )

    return (
        <Link
            // onClick={handleClick}
            to={`${to}?brand=${brand}`}
            style={{ ...style, color: isActive ? 'red' : '' }}
            {...props}
        />
    );
}