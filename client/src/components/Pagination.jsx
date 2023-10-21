import React from 'react';
import '../styles/pagination.css'
import { AiOutlineDoubleLeft, AiOutlineLeft, AiOutlineDoubleRight, AiOutlineRight } from "react-icons/ai";

const HandlePagination = ({handlePage,  totalPages = 0, active = 0 }) => {
  const startPage = Math.max(active - 1, 1);
  const endPage = Math.min(startPage + 2, totalPages);
  const pageNumbers = [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);

  return (
    <div className='d-flex justify-content-center align-items-center gap-3  pageContainer'>
      <button className='btn1' onClick={() => handlePage(1)} disabled={active===1}>
        <AiOutlineDoubleLeft fontSize={"15px"}/>
      </button>
      <button  className='btn2'  onClick={() => handlePage(active-1)} disabled={active===1}>
        <AiOutlineLeft fontSize={"15px"}/>
      </button>
      {pageNumbers.map(page => (
        <button className ="btn3" key={page} style={{ backgroundColor: active===page ? "skyblue" : ""}} disabled={active===page} onClick={() => handlePage(page)}>
          {page}
        </button>
      ))}
      <button className="btn4"  onClick={() => handlePage(active+1)} disabled={active===totalPages}>
      <AiOutlineRight fontSize={"15px"}/>
      </button>
      <button className="btn5" onClick={() => handlePage(totalPages)} disabled={active===totalPages}>
        <AiOutlineDoubleRight fontSize={"15px"}/>
      </button>
    </div>
  );
}

export default HandlePagination;
