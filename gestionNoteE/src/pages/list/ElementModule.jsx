import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataElement from "../../components/datatable/DataElement"

const ElementModule = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataElement/>
      </div>
    </div>
  )
}

export default ElementModule