import React from 'react'

function Alert({ type = 'danger', messages = [] }) {
    return (
        <div className={`alert alert-${type}`} role='alert'>
            {messages.map(err => (
                <p className='mb-0 small' key={err}>{err}</p>
            ))}
        </div>
    )
}

export default Alert