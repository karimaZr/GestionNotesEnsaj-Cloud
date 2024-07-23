import "../list/list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataNotes from "../../components/datatable/NoteModuleExport"

const Export= () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataNotes/>
      </div>
    </div>
  )
}

export default Export;