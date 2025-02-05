import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import Pagination from './Pagination'
// const PaginationComponent = React.lazy(() => './Pagination')

function Home() {

  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => {
        setIsLoading(false)
        setPosts(json)  
        
        //To get user ids in array
        let userId = new Set()
        json.map((data) => {
          if(!userId.has(data.userId)){
            userId.add(data.userId)
          }
        }) 
        setPage([...userId])

        //render first page data
        const data = json.filter((p) => p.userId === 1)         
        setFilteredData(data)
      })
      .catch(error => console.log(error))
  }, [])

  const onSearchChangeHandler = (e) => {
    setSearchText(e.target.value)
  }

  const onSearchClickHandler = () => { 
    const data = posts.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()))
    setFilteredData(data)
    setIsFilter(true)
  }

  const onClearFilter = () => {
    setFilteredData(posts)
    setIsFilter(false)
    setSearchText('')
    pageClickHandler(1)
  }
  
  const pageClickHandler = (data) => {  
    const pageData = posts.filter((p) => p.userId === data)
    setFilteredData(pageData)  
    window.scrollTo(0, 0)
  }

  const dragPost = useRef(0)
  const draggedOverPost = useRef(0)

  const handleSort = () => {
    const postClone = [...filteredData]
    const temp = postClone[dragPost.current]
    postClone[dragPost.current] = postClone[draggedOverPost.current]
    postClone[draggedOverPost.current] = temp
    setFilteredData(postClone)
  }

  return (
    <div className='container'>
      <Navbar />
      <div className='row my-4'>
        <div className='col-8 d-flex justify-content-end'> 
          {
            isFilter && (
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={() => onClearFilter()}
              >Clear Filter</button>
            )
          }
        </div>
        <div className='col-4'>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={(e) => onSearchChangeHandler(e)}
            />
            <button
              className="btn btn-primary"
              type="button"
              disabled={searchText.length === 0}
              onClick={() => onSearchClickHandler()}
            >Search</button>
          </form>
        </div>
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        {
          isLoading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )
        }
      </div>
      <div className='row'>
        {
          filteredData.map((post, index) => (
            <div
              key={post.id}
              draggable
              onDragStart={() => dragPost.current = index}
              onDragEnter={() => draggedOverPost.current = index}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              className='col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4'>
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{post.title.toUpperCase()}</h5>
                  <p className="card-text">{post.body}</p> 
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {
        !isFilter && (
          <div className='row my-3 justify-content-center'>
            <Pagination
              page={page}
              pageClickHandler={pageClickHandler}
            />
          </div>
        )
      }
    </div>
  )
}

export default Home