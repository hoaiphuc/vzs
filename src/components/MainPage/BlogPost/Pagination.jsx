import React from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
    console.log("Length page number: ", pageNumbers.length)
    return (
    <nav className='d-flex justify-content-center mt-5'>
        <ul className='pagination'>
            <li className="page-item"><a className='page-link'>Previous</a></li>
            {
                pageNumbers.map(number =>(
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))
            }
            <li className="page-item"><a className='page-link'>Next</a></li>
        </ul>
    </nav>
  )
}

export default Pagination
