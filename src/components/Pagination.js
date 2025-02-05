import React from 'react'

function Pagination(props) {
    let { page, pageClickHandler } = props;
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {
                        page.map((item, index) => (
                            <li className="page-item " key={index}><a className="page-link bg-primary text-light" onClick={() => pageClickHandler(item)}>{item}</a></li>
                        ))
                    } 
                </ul>
            </nav>
        </div>
    )
}

export default Pagination