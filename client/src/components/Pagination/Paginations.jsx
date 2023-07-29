import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

function Paginations({handlePrevious,handleNext,page,useGet,setPage,pageCount}) {
  return (
    <>
     <div className='pagination_div d-flex justify-content-end mx-5'>
     <Pagination>
     <Pagination.Prev onClick={()=>handlePrevious()}/>
     <Pagination.Item active={true}>{20}</Pagination.Item>
      <Pagination.Next onClick={()=>handleNext()}/>
      
    </Pagination>
     </div>
    </>
  )
}

export default Paginations