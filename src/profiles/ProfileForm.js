import React, { useState, useContext } from 'react'
import UserContext from '../auth/UserContext'
import Alert from '../common/Alert'
import JoblyApi from '../api/api'

function ProfileForm() {
    const { currUser, setCurrUser } = useContext(UserContext)

    const [formErrors, setFormErrors] = useState([])
    const [saveConfirmed, setSavedConfirmed] = useState(false)
    const [formData, setFormData] = useState({
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
        username: currUser.username,
        password: ""
    })

    function handleChange(evt) {
        const { name, value } = evt.target
        setFormData(d => ({ ...d, [name]: value }))
        setFormErrors([])
    }

    async function handleSubmit(evt) {
        evt.preventDefault()
        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let username = formData.username
        let updatedUser

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData)
        }
        catch (err) {
            setFormErrors(err)
            return
        }

        setFormData(d => ({ ...d, password: '' }))
        setFormErrors([])
        setSavedConfirmed(true)
        setCurrUser(updatedUser)
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h3>Profile</h3>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <p className="form-control-plaintext">{formData.username}</p>
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Please Confirm Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {formErrors.length
                            ? <Alert type="danger" messages={formErrors} />
                            : null}

                        {saveConfirmed
                            ?
                            <Alert type="success" messages={["Updated successfully."]} />
                            : null}

                        <button className="btn btn-primary btn-block mt-4" onClick={handleSubmit}>
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm