import React, { useEffect, useState,useContext } from 'react'
import './home.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import Tables from '../../components/Tables/Tables';
import Spinner from 'react-bootstrap/Spinner';
import Spiner from '../../components/Spinner/Spiner';
import { addData, updateData } from '../../components/context/ContextProvider';
import Alert from 'react-bootstrap/Alert';
import { usergetfunc,deletefunc,exporttocsvfunc} from '../../services/Apis';
import { toast } from 'react-toastify';

function Home() {

  const [showspin,setShowSpin]=useState(true)

  const {useradd,setUseradd}=useContext(addData);
  const {update,setUpdate}=useContext(updateData)

  const [userdata,setUserData]=useState([]);
  const [search,setsearch]=useState("")
  const [gender,setGender]=useState("All")
  const [status,setStatus]=useState("All")
  const [sort,setSort]=useState("new")
  const [page,setPage]=useState(1)
  const [pageCount,setPageCount]=useState(0)

  const navigate=useNavigate()
  const adduser=()=>{
    navigate('/register')
  }

  const  userGet= async()=>{
    const response=await usergetfunc(search,gender,status,sort,page)
    console.log(response)
    if(response.status===200){
      setUserData(response.data.userdata)
      setPageCount(response.data.Pagination.pageCount)
    }
    else{
      console.log("Error for get user data")
    }
  }
  // const deleteUser = async(id)=>{
  //   const response = await deletefunc(id);
  //   if(response.status === 200){
  //     userGet();
  //     // setDLtdata(response.data)
  //   }else{
  //     toast.error("error")
  //   }
  // }

  const deleteUser = async(id)=>{
    const response = await deletefunc(id);
    if(response.status === 200){
      userGet();
      // setDLtdata(response.data)
    }else{
      toast.error("error")
    }
  }

  const exportuser=async()=>{
    const response=await exporttocsvfunc();
    if(response.status===200){
      window.open(response.data.downloadURL,"blank")
    }
    else{
      toast.error("Error")
    }
    console.log(response);
  }

  // useEffect(()=>{
  //   userGet();
  //   setTimeout(()=>{
  //     setShowSpin(false)
  //   },5000)
  // },[search])

  const handlePrevious=()=>{
    setPage(()=>{
      if(page===1)return page;
      return page-1
    })
  }

  const handleNext=()=>{
    setPage(()=>{
      if(page===pageCount) return page;
      return page+1

    })
  }
  useEffect(()=>{
    userGet();
    setTimeout(()=>{
        setShowSpin(false)
    },1200)
  },[search,gender,status,sort,page])
  return (
    <>
    {
      useradd ? <Alert variant="success" onClose={() => setUseradd("")} dismissible>
        {useradd.fname.toUpperCase()}  Successfully Added    
      </Alert>:""
    }
    {
      update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
        {update.fname.toUpperCase()}  Successfully Update
      </Alert>:""
    }
      <div className='container'>
        <div className='main_div'>
          <div className='search_add mt-4 d-flex justify-content-between'>
            <div className='search col-lg-4'>
            <Form className="d-flex">
            <Form.Control onChange={(e)=>setsearch(e.target.value)}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="success" className='search_btn'>Search</Button>
          </Form>
            </div>
            <div className='add_btn'>
            <Button variant="primary" onClick={adduser}><i class="fa-solid fa-plus"></i>&nbsp;Add User</Button>
            </div>
          </div>
          <div className='filter_div mt-5 d-flex justify-content-between flex-wrap'>
            <div className='export_csv'>
            <Button className='export_btn' onClick={exportuser}>Export To CSV</Button>
            </div>
            <div className='filter_gender'>
              <div className='filter'>
                <h3>Filter by Gender</h3>
                <div className='gender d-flex justify-content-between'>
                <Form.Check // prettier-ignore
            type={'radio'}
            label={`All`}
            name='gender'
            value={'All'}
            defaultChecked
            onChange={(e)=>setGender(e.target.value)}
          />
          <Form.Check // prettier-ignore
            type={'radio'}
            label={`Male`}
            name='gender'
            value={'Male'}
            onChange={(e)=>setGender(e.target.value)}
          />
          <Form.Check // prettier-ignore
            type={'radio'}
            label={`Female`}
            name='gender'
            value={'Female'}
            onChange={(e)=>setGender(e.target.value)}
          />
                </div>
              </div>
            </div>
            <div className='filter_newold'>
              <h3>Sort By Value</h3>
              <Dropdown className='text-center'>
      <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
      <i class="fa-solid fa-sort"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>setSort("new")}>New</Dropdown.Item>
        <Dropdown.Item onClick={()=>setSort("old")}>Old</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
            </div>
            <div className='filter_status'>
              <div className='status'>
                <h3>Filter By Status</h3>
                <div className='status_radio d-flex justify-content-between flex-wrap'>
                <Form.Check // prettier-ignore
            type={'radio'}
            label={`All`}
            name='status'
            value={'All'}
            onChange={(e)=>setStatus(e.target.value)}
            defaultChecked
          />
          <Form.Check // prettier-ignore
            type={'radio'}
            label={`Active`}
            name='status'
            value={'Active'}
            onChange={(e)=>setStatus(e.target.value)}
          />
          <Form.Check // prettier-ignore
            type={'radio'}
            label={`InActive`}
            name='status'
            value={'InActive'}
            onChange={(e)=>setStatus(e.target.value)}
          />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner />: <Tables userdata={userdata} deleteUser={deleteUser} handlePrevious={handlePrevious} handleNext={handleNext} page={page} pageCount={pageCount} setPage={setPage} />
        }

       
      </div>
      
    </>
  )
}

export default Home;