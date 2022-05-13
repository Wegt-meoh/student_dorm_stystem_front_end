import React from 'react'

import './index.css'

export default function Content(props:any) {
    const children:React.ReactNode=props.children

    return (
        <div className='index-content'>
            {children}
        </div>
    )
}
