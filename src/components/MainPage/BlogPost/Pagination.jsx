import React from 'react'
import { useState } from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = []
    const [currentPage, setCurrentPage] = useState(1)

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
    
    const handleClick = (pageNumber) => {
        paginate(pageNumber);
        setCurrentPage(pageNumber);
        
    }

    console.log("Length page number: ", pageNumbers.length)
    return (
        <nav className='d-flex justify-content-center mt-5'>
            <ul className='pagination'>
                <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                    <button
                        className='page-link'
                        onClick={() => handleClick(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {
                    pageNumbers.map(number => (
                        <li key={number} className={`page-item${currentPage === number ? ' active' : ''}`}>
                            <button className='page-link' onClick={() => handleClick(number)}>
                                {number}
                            </button>
                        </li>
                    ))
                }
                <li className={`page-item${currentPage === pageNumbers.length ? ' disabled' : ''}`}>
                    <button
                        className='page-link'
                        onClick={() => handleClick(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
