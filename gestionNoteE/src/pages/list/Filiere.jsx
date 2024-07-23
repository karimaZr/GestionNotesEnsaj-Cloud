import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatataField from "../../components/datatable/DataField"

const Filiere = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatataField/>
      </div>
    </div>
  )
}

export default Filiere