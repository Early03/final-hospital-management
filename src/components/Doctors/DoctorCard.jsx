import React, { useContext, useEffect } from 'react'
import starIcon from '../../assets/images/Star.png';
import {Link, useNavigate} from 'react-router-dom'
import {BsArrowRight} from 'react-icons/bs'
import { useState } from 'react'
import Appointment from '../../pages/Appointment';
import { useModal } from '../../assets/modal/useModal';
import Modal from 'react-modal'
import './doctor.css'
import { authContext } from '../../context/AuthContext';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL, token } from '../../utils/config';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

const DoctorCard = ({doctor}) => {

    
    const {data: userData, loading, error} = useGetProfile(`${BASE_URL}/users/profile/me`);
    
    const { isOpen, openModal, closeModal } = useModal();

    const {
        name, 
        avgRating, 
        totalRating, 
        photo, 
        specialization,
        appointments,
        about,
        qualifications
    } = doctor

    const appointmentLength = doctor && doctor.appointments ? doctor.appointments.length : 0;

  return (
    <div className='p-3 lg:p-5 card-doctor'>
        <div>
            <img src={photo} className='w-full' alt="" />
        </div>

        <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>
            Dr. {name}
        </h2>

        <div className='mt-2 lg:mt-4 flex items-center justify-between'>
            <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                {specialization}
            </span>

            <div className='flex items-center gap[6px]'>
                <span className='flex items-center gap[6px] text-[14px] leading-6 lg:text-[16px] leading-7 font-semibold text-headingColor'>
                    <img src={starIcon} alt="" /> {avgRating}
                </span>
                <span className='flex items-center gap[6px] text-[14px] leading-6 lg:text-[16px] leading-7 font-semibold text-textColor'>
                    ({totalRating})
                </span>
            </div>
        </div>

        <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
            <div>
                <h3 className='text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor'>
                    +{`${appointmentLength} `}
                    {appointmentLength <= 1 ? "patient" : "patients"}
                </h3>
                <p className='text-[14px] leading-6 font-[400] text-textColor'>At {about}
                </p>
            </div>

            <Link
                className='button-hide-modal w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
            >
                <button onClick={openModal}>
                    <BsArrowRight className='group-hover:text-white w-6 h-5'/>

                </button>
            </Link>

        </div>
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="new-create-post"
            overlayClassName="modal-overlay"
            ariaHideApp={false}
        >
            <DoctorDetails doctor={doctor} closeModal={closeModal} userData={userData}/>
        </Modal>
        
    </div>
  )
}

export const DoctorDetails = ({doctor, closeModal, userData}) => {

    
    const token = localStorage.getItem('token')

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        doctorId: doctor._id,
        userId: userData._id,
        appointmentDate:'',
        ticketPrice: doctor.qualifications[3],
        doctor: doctor._id,
        status: 'approved',
      })

    const handleInputChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value })
        // console.log(formData)

    }

    const submitHandler = async event =>{
        event.preventDefault()
        setLoading(true)
    
        try {
          const res = await fetch(`${BASE_URL}/bookings/`, {
            method:'post',
            headers:{
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          })
    
          const result = await res.json();
          closeModal()
    
          if(!res.ok){
            throw new Error(result.message)
          }
          
          setLoading(false)
          toast.success(result.message)
    
        } catch (err){  
          toast.error(err.message)
          setLoading(false)
        }
      }
    
    return (
        <>
        <div className='bio-container'>
            <DoctorCard doctor={doctor}/>
            <div className='bio-details-wrapper'>
                <h1>About Me</h1>
                <div className='bio-wrapper'>
                    <p>
                        <span>Qualifications: </span>
                        {doctor.qualifications[0]}
                    </p>
                    <p>
                        <span>Educational Attainment: </span>
                        {doctor.qualifications[1]}
                    </p>
                    <p>
                        <span>Internship: </span>
                        {doctor.qualifications[2]}
                    </p>
                    <p>
                        <span>Fee: </span>
                        {doctor.qualifications[3]}
                    </p>
                </div>

                <h1>Set Appointment</h1>
                <form className='appointment-form' onSubmit={submitHandler}>
                    <input type="text" placeholder='Full Name' defaultValue={userData.name} className='name-input' required/>
                    <input type="date" name='appointmentDate' value={formData.appointmentDate} onChange={handleInputChange} required/>
                    <input type="text" placeholder='Blood Type' defaultValue={userData.bloodType}/>
                    <input type="number" placeholder='Number' required/>
                    
                    <div className='button-wrapper'>
                        <button onClick={closeModal}>Cancel</button>
                        <button type='submit'>
                            {
                                loading ? <HashLoader size={25} color='#ffffff'/> : 'Set Appointment'
                            }
                        </button>
                    </div>
                </form>

            </div>
        </div>
        </>
    )
}



export default DoctorCard