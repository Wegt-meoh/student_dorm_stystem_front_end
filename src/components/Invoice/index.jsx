import React from 'react'
import { useParams } from 'react-router-dom'
import { getInvoice } from '../../pages/Invoices/data'

export default function Invoice() {
    const params = useParams()

    let invoice = getInvoice(parseInt(params.name, 10))

    return (
        <div>
            {
                invoice === undefined ? <>no such number</> :
                    <>
                        <h2>
                            {invoice.name}
                        </h2>
                        <h2>
                            {invoice.number}
                        </h2>
                        <h2>
                            {invoice.amount}
                        </h2>
                        <h2>
                            {invoice.due}
                        </h2>
                    </>
            }
        </div>

    )
}
