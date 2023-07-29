import React, { useContext, useEffect, useState } from 'react'
import './register.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { registerfunc } from '../../services/Apis';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { registerfunc } from '../../services/Apis';
import {useNavigate} from 'react-router-dom'
import { addData } from '../../components/context/ContextProvider';

function Register() {

  const [input,setInput]=useState({
    fname:'',
    lname:'',
    email:'',
    mobile:'',
    gender:'',
    location:''
  });


  console.log(input)

  const [status,setStatus]=useState("Active");
  const [image,setImage]=useState("");
  const [preview,setPreview]=useState("");



  const navigate=useNavigate()

  const {useradd,setUseradd}=useContext(addData);
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
   
  ];

  const setInputValue=(e)=>{
     const {name,value}=e.target;
     setInput({...input,[name]:value})
  }

  const setStatusValue=(e)=>{
    setStatus(e.value)
  }

  const setProfile=(e)=>{
    setImage(e.target.files[0])
  }

  useEffect(()=>{
    if(image){
      setPreview(URL.createObjectURL(image))
    }
  },[image])

  const submitUserData=async(e)=>{
    e.preventDefault();
    const {fname,lname,email,mobile,gender,location}=input;
    if(fname===""){
      toast.error("First Name is required");
    }
    else if(lname===""){
      toast.error("Last Name is required");
    }
    else if(email===""){
      toast.error("Email is required");
    }
    else if(!email.includes('@')){
      toast.error("Enter Valid Email");
    }
    else if(mobile===""){
      toast.error("Mobile is required");
    }
    else if(mobile.length>10){
      toast.error("Enter valid Mobile Number");
    }
    else if(gender===""){
      toast.error("Gender is required");
    }
    else if(status===""){
      toast.error("Status is required");
    }
    else if(image===""){
      toast.error("Profile is required");
    }
    else if(location===""){
      toast.error("Location is required");
    }
    else{
      // toast.success("Registration Done Sucessfully 👍")
      const data=new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("user_profile",image)
      data.append("location",location)

      const config={
        "Content-Type":"multipart/form-data"
      }
  
      const response=await registerfunc(data,config)
      console.log(response)

      if(response.status===200){
        setInput({
          ...input,
          fname:'',
          lname:'',
          email:'',
          mobile:'',
          gender:'',
          location:''
        })
        setStatus("")
        setImage("")
        setUseradd(response.data)
        navigate('/')
      }
      else{
        toast.error("Error in Registration")
      }
    }

    


  }
  return (
    <>
      <div className='container'>
        <h2 className='text-center mt-1'>Register Your Details</h2>
        <Card className='shadow mt-3 p-3'>
          <div className='profile_div text-center'>
            <img src={preview ? preview :'https://tartuforestaurant.com/wp-content/uploads/2017/03/dummy-man.jpg'}/>
          </div>
          <Form>
          <Row>
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" name='fname' onChange={setInputValue} value={input.fname} placeholder='Enter First name'/>
        
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" name='lname' onChange={setInputValue} value={input.lname} placeholder='Enter Last name'/>
        
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' onChange={setInputValue} value={input.email} placeholder='Enter email'/>
        
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control type="number" name='mobile' onChange={setInputValue} value={input.mobile} placeholder='Enter Mobile'/>
        
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Select Your Gender</Form.Label>
        
        <Form.Check // prettier-ignore
            type={'radio'}
            label={`Male`}
            name='gender'
            value={'Male'}
            onChange={setInputValue}
          />
          <Form.Check // prettier-ignore
            type={'radio'}
            label={`Female`}
            name='gender'
            value={'Female'}
            onChange={setInputValue}
          />
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Select Your Status</Form.Label>
        
        <Select
        
        options={options} onChange={setStatusValue}
      />
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Select Your Profile</Form.Label>
        <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your profile'/>
        
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
        <Form.Label>Enter Your Location</Form.Label>
        <Form.Control type="text" name='location' value={input.location} onChange={setInputValue} placeholder='Enter Your Location'/>
        
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={submitUserData}>
        Submit
      </Button>
          </Row>
      

      
      
    </Form>
        </Card>
        <ToastContainer position="top-center"/>
      </div>
    </>
  )
}

export default Register