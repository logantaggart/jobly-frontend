import React, { useState, useEffect } from 'react'
import Search from '../common/SearchForm'
import JobCardList from './JobCardList'
import JoblyApi from '../api/api'
import LoadingSpinner from '../common/LoadingSpinner'

function JobList() {
    const [jobs, setJobs] = useState(null)

    useEffect(function getAllJobsOnMount() {
        search()
    }, [])

    async function search(title) {
        let jobs = await JoblyApi.getJobs(title)
        setJobs(jobs)
    }

    if (!jobs) return <LoadingSpinner />

    return (
        <div className="JobList col-md-8 offset-md-2">
            <Search searchFor={search} />
            {jobs.length ?
                <JobCardList jobs={jobs} />
                : <p className="lead">There were no matching results found!</p>
            }
        </div>
    )
}

export default JobList