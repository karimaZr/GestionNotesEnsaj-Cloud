import Sidebar from "../sidebar1/Sidebar"
import ProfCourses from "../course/ProfCourses"
import Navbar from "../../../components/navbar/Navbar"
const Courses = () => {
  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
      
        <Navbar/>
        <div  style={{ boxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)", padding: "10px", margin: "20px", display: "flex" }}>
          <h1 style={{ color: "lightgray", fontSize: "20px" }}>Professeur Cours</h1>
        </div>
        <ProfCourses/>
      </div>
    </div>
  )
}

export default Courses;