import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { ModuleColumns } from "../../datatablesource";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
const DataModule = () => {
  const [file, setFile] = useState(null);
  const [filiere, setFiliere] = useState('');
  const [fields, setFields] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get('http://localhost:3000/filiere/');
        setFields(response.data); // Assuming the response contains an array of field objects
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, []);

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

      const modules = parsedData.slice(1).map((row) => ({
        code: row[0],
        nom: row[1],
        semestre: row[2],
      }));

      setModuleData(modules);
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const module of moduleData) {
        await axios.post('http://localhost:3000/module/', {
            filiereId: filiere,
            moduleData: module,
        });
      }
      alert('Modules created successfully!');
    } catch (error) {
      console.error('Error creating modules:', error);
      alert('Error creating modules. Please try again.');
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'modules'));
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
      await deleteDoc(doc(db, 'modules', id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
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
      <div className="datatableTitle">Add Modules</div>
      <div className="dtaa">
        <form onSubmit={handleFormSubmit}>
          <input type="file" onChange={handleFileChange} />
          <select value={filiere} onChange={(e) => setFiliere(e.target.value)}>
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.nom}
              </option>
            ))}
          </select>
          <button type="submit">Upload</button>
        </form>
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

export default DataModule;
