import DoctorCard from './../../components/Doctors/DoctorCard';
import { doctors } from '../../assets/data/doctors';
import Testimonial from '../../components/Testimonial/Testimonial';
import { BASE_URL } from '../../utils/config';
import { useEffect, useState } from 'react';
import '../../components/Doctors/doctor.css'

const Doctors = () => {

  //copy

  const [doctorArray, setDoctorArray] = useState([])

  const doctorData = async () => {
    try {
      const res = await fetch(`${BASE_URL}/doctors`)
      const data = await res.json()
      setDoctorArray(data.data)
      console.log(data.data)

    } catch (error) {
      console.error('Error fetching doctor data', error)
    }
  }

  //

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

  //copy

  useEffect(()=>{
    doctorData()
  }, [])


  //
  return <>
  <div className='doctor-container'>
  <section className='bg-[#fff9ea]'>
    <div className='container text-center'>
      <h2 className='heading'>Find a Doctor</h2>
      <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>

      <form className='bg-transparent w-full cursor-pointer flex row' onSubmit={handleSearch}>

        <input type="search" className='pl-4 pr-2 w-full bg-transparent focus:outline-none placeholder:text-textColor' placeholder='Search a Doctor' name='search'/>

        <button className='btn mt-0 rounded-[0px] rounded-r-md' type='submit'>
          Search
        </button>

      </form>


      </div>
    </div>
  </section>

  <section>
    <div className="container doctor-container">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {doctorArray.map(doctor => (
            <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  </section>

  <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>What our patients say</h2>
            <p className='text__para text-center'>
              World-Class care for everyone. Our health Systems offers unmatched, expert healthcare.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
  
  </div>
  </>
   
  
}

export default Doctors