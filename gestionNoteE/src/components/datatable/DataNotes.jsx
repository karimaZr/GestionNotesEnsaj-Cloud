import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ModuleColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const DataNotes = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "modules"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                });
                setData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        return () => {
            unsub();
        };
    }, []);

   

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
<Link to={`/ModuleNote/${params.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View </div>
                        </Link>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Mark Details
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={ModuleColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DataNotes;
