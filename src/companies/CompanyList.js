import React, { useState, useEffect } from 'react'
import SearchForm from '../common/SearchForm'
import CompanyCard from './CompanyCard'
import JoblyApi from '../api/api'
import LoadingSpinner from '../common/LoadingSpinner'

function CompanyList() {
    const [companies, setCompanies] = useState(null)

    useEffect(function getCompaniesOnMount() {
        search()
    }, [])

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name)
        setCompanies(companies)
    }

    if (!companies) return <LoadingSpinner />

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {companies.length ? (
                <div className="CompanyList-list">
                    {companies.map(c => (
                        <CompanyCard
                            key={c.handle}
                            handle={c.handle}
                            name={c.name}
                            description={c.description}
                            logoUrl={c.logoUrl} />
                    ))}
                </div>
            ) : (<p className="lead">There were no matching results found!</p>)}
        </div>
    )
}

export default CompanyList