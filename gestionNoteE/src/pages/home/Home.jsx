import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget1 from "../../components/widget/Widget1";
import Notes from "./Notes";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget1 type="user" />
          <Widget1 type="modules" />
          <Widget1 type="filiere" />
          <Widget1 type="marks" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Marks added</div>
          <Notes />
        </div>
        
      </div>
    </div>
  );
};

export default Home;
