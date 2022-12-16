import Header from "../head/Head";
import Sidebar from "../Sidebar/Sidebar";
import './Layout.css'

const Layout = (props) => {
  return (
    <div className="layout">
        <Sidebar />
         <div className="container1">
            <Header />
            <div>{props.children}</div>
      </div>
    </div>
  );
};
export default Layout;
