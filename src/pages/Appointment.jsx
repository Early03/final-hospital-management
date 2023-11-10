import { useContext, useEffect, useState } from 'react'
import DoctorCard from '../components/Doctors/DoctorCard'
import starIcon from '../assets/images/Star.png'
import './appointment.css'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/config'
import { authContext } from '../context/AuthContext'

function Appointment ({}) {
    const [doctorArray, setDoctorArray] = useState([])
    
    const handleSearch = async (value) => {
        value.preventDefault()
        const searchValue = value.target.elements.search.value
        
        try {
        const res = await fetch(`${BASE_URL}/doctors/?query=${searchValue}`)
        const data = await res.json()
        setDoctorArray(data.data)


        } catch (error) {
        console.error('Error fetching doctor data', error)
        }
    }

    return (
        <>
        <div className='appointment-wrapper'>
            <form onSubmit={handleSearch}>
                <MiniCard></MiniCard>
            </form>
            <form>
                <input type="text" name='name' placeholder='Fullname'/>
                <input type="text" name='email' placeholder='Email Address'/>
                <input type="date" name='date'/>
                <input type="text" name='phone-number' placeholder='Phone Number'/>
                <input type="text" name='location' placeholder='Location'/>
                <input type="text" name='blood-type' placeholder='Blood Type'/>

                <button type='submit'>Submit</button>
            </form>
        </div>
        </>
    )
}

export default Appointment