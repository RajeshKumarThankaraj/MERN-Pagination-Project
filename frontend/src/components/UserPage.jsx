import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Project from './Project'
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  
  const user = localStorage.getItem("username");

  const [currentPage, setCurrentPage] = useState(1);
  const [projectData, setProjectData] = useState([]);
  const [sortBy, setSortBy] = useState("cDate");
  const [pages, setPages] = useState(0);

  const customStyle = {
    "cursor":"pointer"
  }
  
  const handleMouseOver = (e) => {
    e.target.style.textDecoration = "underline"
  }
  
  const handleMouseOut = (e) => {
    e.target.style.textDecoration = "none"
  }
   
    useEffect(() => {
        try {
          console.log(currentPage, sortBy);
          const fetchAPI = async () => {
            const response = await axios.get(`http://localhost:5000/?page=${currentPage}&orderBy=${sortBy}`);
            setProjectData(response.data.data);
            // setProjectData(response.data.noOfPages);
            setPages(response.data.noOfPages)
            console.log(response.data);
          }
          fetchAPI();
        } catch (err) {
          console.log(err);
        }   
      }, [currentPage, sortBy]);

    const handleClick = (pageNo) => {
         setCurrentPage(pageNo);
    };
      const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("username")
      navigate("/")
    }


    // const userName = window.hr
  return (
  <>
  <nav className="navbar navbar-light bg-dark ">
  <div className="container-fluid">
    <a className="navbar-brand text-light" href="/">Welcome {user}</a>
    <button type="button" className="btn btn-secondary" onClick={handleLogout}>LogOut</button>
  </div>
</nav>
       <div className='container mt-5'>

        <div className="row mt-5">
        <div className="col-3"></div>
        <div className="col-6  mt-5">
          <table className="table text-center">
            <thead className="table-dark">
                <tr className=''>
                  <th scope="col">Project Title</th>
                  <th scope="col">Username</th>
                  <th scope="col">Category Name</th>
              </tr>
            </thead>
            <tbody>
              {projectData.map((project) => 
                <Project projectData={project} key={project.P_ID}/>
              )}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
            <div
              className="page-link"
              onClick={() => {
                handleClick(currentPage - 1);
              }}
            >
              Previous
            </div>
          </li>
          {Array.from({ length: +pages }, (_, i) => (
            <li key={i} className="page-item">
              <div
                className="page-link"
                onClick={() => {
                  handleClick(i + 1);
                }}
              >
                {i + 1}
              </div>
            </li>
          ))}
          <li
            className={
              currentPage >= pages ? "page-item disabled" : "page-item"
            }
          >
            <div
              className="page-link"
              onClick={() => {
                handleClick(currentPage + 1);
              }}
            >
              Next
            </div>
          </li>
        </ul>
      </nav>
        </div>
        <div className="col-1">
        <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle float-md-end mt-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Sort By
        </button>
        <ul className="dropdown-menu p-1" aria-labelledby="dropdownMenuButton1">
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={customStyle} className='nav-link p-1 hover-link' onClick={() => {setSortBy("cDate")}}>Recent Projects</li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={customStyle} className='nav-link p-1 hover-link' onClick={() => {setSortBy("userName")}}>Sort by Username</li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={customStyle} className='nav-link p-1 hover-link' onClick={() => {setSortBy("pTitle")}}>Sort by Project Title</li>
          <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={customStyle} className='nav-link p-1 hover-link' onClick={() => {setSortBy("cName")}}>Sort by Category Name</li>
        </ul>
        </div>
      </div>
      <div className="col-2"></div>
    </div> 
    </div>
    </>    
  )
}
