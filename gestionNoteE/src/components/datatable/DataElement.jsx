import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { ElementColumns } from "../../datatablesource";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
const DataElement = () => {
    const [file, setFile] = useState(null);
    const [elementData, setElementData] = useState([]);
    const [data, setData] = useState([]);


    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const elements = parsedData.slice(1).map((row) => ({
                code: row[0],
                nom: row[1],
                description: row[2],
                pourcentage: row[3],
                moduleId: row[4],
                profCIN: row[5],
                AnneeUniversitaire: row[6],
            }));

            setElementData(elements);
        };
        reader.readAsArrayBuffer(uploadedFile);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            for (const element of elementData) {
                console.log(element);
                await axios.post('http://localhost:3000/elementModule/', element
                );
            }
            alert('Elements created successfully!');
        } catch (error) {
            console.error('Error creating elements:', error);
            alert('Error creating elements. Please try again.');
        }
    };

    useEffect(() => {
        const q = query(collection(db, 'elementModule'));
        const unsub = onSnapshot(
            q,
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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/elementModule/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete element');
            }

            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    };
    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div className="cellAction">
                    <Link to={`/modules/${params.row.id}`} style={{ textDecoration: 'none' }}>
                        <div className="viewButton">Edit</div>
                    </Link>
                    <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                        Delete
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">Add Elements</div>
            <div className="dtaa">
                <form onSubmit={handleFormSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
                </form>
            </div>

            <DataGrid
                className="datagrid"
                rows={data}
                columns={ElementColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DataElement;
