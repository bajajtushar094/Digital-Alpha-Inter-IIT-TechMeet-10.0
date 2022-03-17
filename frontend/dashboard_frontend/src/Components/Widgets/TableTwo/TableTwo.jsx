import React from 'react'
import "./tabletwo.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
    // return {  fat, carbs, protein };
  }

  const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male"},
  ]

  export default function TableTwo() {
    return (
        <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <table style={{width:"70%"}}>
        <tr style={{display:'flex',justifyContent:"space-between"}}>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr  style={{display:'flex',justifyContent:"space-between",alignItems:'center'}}key={key}>
              <td>{val.name}</td>
              <td>{val.age}</td>
              <td>{val.gender}</td>
            </tr>
          )
        })}
      </table>
      </div>
    );
  }