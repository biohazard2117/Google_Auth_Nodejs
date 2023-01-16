import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import axios from "axios";


const Table = () => {
  async function getData() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(res.data);
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);

 
  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
 
    data[row.index] = values;
    setData([...data]);
    exitEditingMode(); 
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: "id", 
        header: "User ID",
      },
      {
        accessorKey: "name",
        header: "User Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} 
  editingMode='row'
  enableEditing
  onEditingRowSave={handleSaveRow}
  />;
};

export default Table;
