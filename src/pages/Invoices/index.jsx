import React from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'

import { BrandLink } from '../../components/CustomLink'
import { getInvoices } from './data'

export default function Invoices() {
    const invoices = getInvoices()
    const [params, setParamas] = useSearchParams()
    return (
        <div>
            {
                invoices.map((i) => {
                    return (
                        <BrandLink
                            key={i.number}
                            style={{ display: "block", margin: "1rem 0" }}
                            brand={i.number}
                            to={'/invoices'}>{i.name}</BrandLink>
                    )
                })
            }


            <div>
                <Outlet />
            </div>
        </div>
    )
}
