export const studentColumns = [
  {
    field: "CNE",
    headerName: "CNE",
    width: 100

  },
  {
    field: "nom",
    headerName: "Nom",
    width: 100

  },
  {
    field: "prenom",
    headerName: "Prenom",
    width: 100

  },
  {
    field: "photo",
    headerName: "Photo",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photo} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 160,
  },{
    field: "filiere",
    headerName: "Filiere",
    width: 160,
    valueGetter: (params) => params.row.filiere.nom 
  },
];
export const ProfColumns = [
  {
    field: "CIN",
    headerName: "CIN",
    width: 130

  },
  {
    field: "nom",
    headerName: "Nom",
    width: 130

  },
  {
    field: "prenom",
    headerName: "Prenom",
    width: 130

  },
  {
    field: "photo",
    headerName: "Photo",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photo} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  }
];
export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
export const fieldColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "nom",
    headerName: "Title",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  }
];
export const NoteColumns = [
  {
    field: "etudiantCNE",
    headerName: "CNE",
    width: 130,
  },
  {
    field: "elementModuleCode",
    headerName: "Element",
    width: 180,
  },
  {
    field: "note",
    headerName: "Mark",
    width: 130,
  },
  {
    field: "Status",
    headerName: "State",
    width: 100,
  }
  ,
  {
    field: "AnneeUniversitaire",
    headerName: "Annee Universitaire",
    width: 230,
  },


];
export const ModuleColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "code",
    headerName: "Code",
    width: 230,
  },
  {
    field: "nom",
    headerName: "Module",
    width: 230,
  },
  {
    field: "semestre",
    headerName: "Semestre",
    width: 230,
  }


];
export const ElementColumns = [
  {
    field: "code",
    headerName: "Code",
    width: 130,
  },
  {
    field: "nom",
    headerName: "Element",
    width: 270,
  },
  {
    field: "pourcentage",
    headerName: "Pourcentage",
    width: 130,
  },
  {
    field: "AnneeUniversitaire",
    headerName: "AnneeUniversitaire",
    width: 230,
  }


];
