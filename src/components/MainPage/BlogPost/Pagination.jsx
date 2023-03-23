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
            <li className="page-item"><button className='page-link'>Previous</button></li>
            {
                pageNumbers.map(number =>(
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </button>
                    </li>
                ))
            }
            <li className="page-item"><button className='page-link'>Next</button></li>
        </ul>
    </nav>
  )
}

export default Pagination
