import React from "react";

import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from "react-icons/md"

function Pagination({ postsPerPage, paginate,totalPost,currentPageNum }) {
  
  const pageNumbers = [];

  for (let index = 1; index <= Math.ceil(totalPost/postsPerPage); index++) {
    pageNumbers.push(index)
    
  }

  return (
    <div className="paginationbox " style={{ margin: 10 }}>
       {pageNumbers.map((data, index) => (
        <span
        className={`${currentPageNum == data && "active"}`}
        onClick={(e)=> paginate(data)}
       >{data}</span>
      ))}
       {/* className={`${selectedIndex == data && "active"}`} */}
        {/* {startIndex > 0 &&
        <button
        onClick={backbutton}
        ><MdKeyboardArrowLeft/></button>
        }
     
      {endIndex < totalPages && <button
      onClick={nextbutton}
      ><MdKeyboardArrowRight/></button>} */}
    </div>
  );
}

export default Pagination;
