import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../auth/UserContext'
import './JobCard.css'

function JobCard({ id, title, salary, equity, companyName }) {
    const [applied, setApplied] = useState()
    const { hasAppliedToJob, applyToJob } = useContext(UserContext)

    useEffect(function updateAppliedStatus() {
        setApplied(hasAppliedToJob(id))
    }, [id, hasAppliedToJob])

    async function handleApply() {
        if (hasAppliedToJob(id)) return
        applyToJob(id)
        setApplied(true)
    }

    return (
        <div className="JobCard card"> {applied}
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p>{companyName}</p>
                {salary && <div>
                    <small>Salary: {formatSalary(salary)}</small>
                </div>}
                {equity !== undefined && <div>
                    <small>Equity: {equity}</small>
                </div>}
                <button className="btn btn-outline-success font-weight-bold text-uppercase float-right"
                    onClick={handleApply} disabled={applied}>
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    )
}

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i >= 0; i--) {
        digitsRev.push(salaryStr[i]);
        if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
}

export default JobCard