import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [items, setItems] = useState([])



  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {type: 'buffer'});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = ((error) => {
        reject(error);
      });
    });

    promise.then((d) => {
      setItems(d)
    })
  }
  return (
    <div>
      <input type="file" onChange={(e) => {
        const file = e.target.files[0];  
        
        readExcel(file)
      }} />

<table class="table table-striped table-dark container">
  <thead>
    <tr>
      <th scope="col">Segment</th>
      <th scope="col">Country</th>
      <th scope="col">Product</th>
      <th scope="col">Discount Band</th>
      <th scope="col">Units Sold</th>
      <th scope="col">Manufacturing</th>
      <th scope="col">Sales Price</th>
      <th scope="col">Gross Sales</th>
      <th scope="col">Discounts</th>
      <th scope="col">Sales</th>
      <th scope="col">COGS</th>
      <th scope="col">Profit</th>
      <th scope="col">Date</th>
      <th scope="col">Month Number</th>
      <th scope="col">Month Name</th>
      <th scope="col">Year</th>
    </tr>
  </thead>
  <tbody>
    {
      items.map((d) => (
        <tr key={d.Segment}>
          <th>{d.Segment}</th>
          <td>{d.Country}</td>
          <td>{d.Product}</td>
          <td>{d.Discount_Band}</td>
          <td>{d.Units_Sold}</td>
          <td>{d.Manufacturing}</td>
          <td>{d.Sales_Price}</td>
          <td>{d.Gross_Sales}</td>
          <td>{d.Discounts}</td>
          <td>{d.Sales}</td>
          <td>{d.COGS}</td>
          <td>{d.Profit}</td>
          <td>{d.Date}</td>
          <td>{d.Month_Number}</td>
          <td>{d.Month_Name}</td>
          <td>{d.Year}</td>
        </tr>
      ))
    }
    
  </tbody>
</table>



    </div>
  );
}

export default App;
