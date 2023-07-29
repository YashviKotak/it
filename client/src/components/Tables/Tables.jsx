import React from 'react'
import './table.css'
import Row from 'react-bootstrap/esm/Row'
import Card from 'react-bootstrap/esm/Card'
import Table from 'react-bootstrap/esm/Table'
import Dropdown from 'react-bootstrap/esm/Dropdown'
import Badge from 'react-bootstrap/esm/Badge'
import { BASE_URL } from '../../services/helper'
import { NavLink } from 'react-router-dom'
import Paginations from '../Pagination/Paginations'
function Tables({userdata,deleteUser,handlePrevious,handleNext,page,useGet,setPage,pageCount}) {
  return (
    <>
     <div className='container'>
      <Row>
        <div className='col mt-2'>
          <Card className='shadow'>
            <Table className='align-items-center' responsive='sm'>
               <thead className='thead-dark'>
                <tr className='table-dark'>
                 <th>ID</th>
                 <th>FullName</th>
                 <th>Email</th>
                 <th>Gender</th>
                 <th>Status</th>
                 <th>Profile</th>
                 <th>Action</th>
                </tr>
               </thead>
               <tbody>
               {
                  userdata.length >0 ? userdata.map((element,index)=>{
                    return(
                      <>
                      <tr>
                  <td>{index + 1}</td>
                  <td>{element.fname + element.lname}</td>
                  <td>{element.email}</td>
                  <td>{element.gender=="Male" ? 'M': 'F'}</td>
                  <td className='d-flex align-items-center'>
                  <Dropdown className='text-center'>
      <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
      <Badge bg={element.status == "Active" ? 'primary':'danger'}>
        {element.status} <i class="fa-solid fa-angle-down"></i>
      </Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Active</Dropdown.Item>
        <Dropdown.Item >InActive</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
                  </td>
                  <td className='img_parent'>
                   <img src={`${BASE_URL}/uploads/${element.profile}`} />
                  </td>
                  <td>
                  <Dropdown className='text-center'>
      <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
     
      <i class="fa-solid fa-ellipsis-vertical"></i>

    
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
        <NavLink to={`/userprofile/${element._id}`} className='text-decoration-none'><i class="fa-solid fa-eye" style={{color:'green'}}></i> <span>View</span></NavLink>
        </Dropdown.Item>
        <Dropdown.Item><NavLink to={`/edit/${element._id}`} className='text-decoration-none'><i class="fa-solid fa-pen-to-square" style={{color:'blue'}}></i> <span>Edit</span></NavLink></Dropdown.Item>
        {/* <Dropdown.Item>
        <i class="fa-solid fa-trash" style={{color:'red'}}></i> <span>Delete</span></Dropdown.Item> */}
        {/* <Dropdown.Item >
                                    <div onClick={() => deleteUser(element._id)}>
                                      <i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
        */}
        <Dropdown.Item >
                                    <div onClick={() => deleteUser(element._id)}>
                                      <i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                  </td>
                </tr>
                      </>
                    )
                  }):<div className='no-data text-center'>No Data Found</div>
               }
               
               
               </tbody>
            </Table>
            <Paginations handlePrevious={handlePrevious} handleNext={handleNext} page={page} pageCount={pageCount} setPage={setPage}/>
          </Card>
        </div>
      </Row>
     </div>
    </>
  )
}

export default Tables