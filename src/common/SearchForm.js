import React, { useState } from 'react'
import './SearchForm.css'

function SearchForm({ searchFor }) {
    const [searchTerm, setSearchTerm] = useState('')

    function handleChange(evt) {
        setSearchTerm(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        searchFor(searchTerm.trim() || undefined)
        setSearchTerm(searchTerm.trim())
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input className="form-control form-control-lg flex-grow-1"
                    name="searchTerm" placeholder="Search Jobly"
                    value={searchTerm} onChange={handleChange} />
                <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SearchForm