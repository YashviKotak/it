import React, { useEffect, useState } from 'react'
import './profile.css'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/esm/Row'
import {useParams} from 'react-router-dom'
import { singleUsergetfunc } from '../../services/Apis'
import { BASE_URL } from '../../services/helper'
import moment from 'moment'

function Profile() {

  const {id}=useParams();
  const [userprofile,setUserProfile]=useState({});

  const userprofileget=async()=>{
    const response=await singleUsergetfunc(id);
    if(response.status===200){
      setUserProfile(response.data)
    }
    else{
      console.log("error")
    }
  }
  useEffect(()=>{
    userprofileget();
  },[id])
  return (
    <>
      <div className='container'>
        <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
          <Card.Body>
            <Row>
              <div className='col'>
                <div className='card-profile-stats d-flex justify-content-center'>
                  <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt='Man'/>

                </div>
              </div>
            </Row>
            <div className='text-center'>
              <h3>{userprofile.fname +userprofile.lname}</h3>
              <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:-<span>{userprofile.email}</span></h4>
              <h5><i class="fa-solid fa-mobile"></i>&nbsp;:-<span>{userprofile.mobile}</span></h5>
              <h4><i class="fa-solid fa-person"></i>&nbsp;:-<span>{userprofile.gender}</span></h4>
              <h4><i class="fa-solid fa-location-dot location"></i>&nbsp;:-<span>{userprofile.location}</span></h4>
              <h4>Status&nbsp;:- <span>Active</span></h4>
              <h4><i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date Created&nbsp;:- <span>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</span></h4>
              <h4><i class="fa-solid fa-calendar-days calender"></i>&nbsp;Date Updated&nbsp;:- <span>12th August 2023</span></h4>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Profile