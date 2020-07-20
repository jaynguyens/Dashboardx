import React from "react";
import styled from "styled-components";
import { useTable } from "react-table";

const Table = ({ dataset }) => {
   const columns = React.useMemo(
      () =>
         Object.keys(dataset[0]).map(d => {
            return {
               Header: d,
               accessor: d
            };
         }),
      [dataset]
   );
   const data = React.useMemo(() => dataset, [dataset]);

   const tableInstance = useTable({ columns, data });
   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
   } = tableInstance;

   return (
      <Div>
         <Tables {...getTableProps()}>
            <thead>
               {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map(column => (
                        <Th {...column.getHeaderProps()}>
                           {column.render("Header")}
                        </Th>
                     ))}
                  </tr>
               ))}
            </thead>

            <tbody {...getTableBodyProps()}>
               {rows.map(row => {
                  prepareRow(row);
                  return (
                     <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                           return (
                              <Td {...cell.getCellProps()}>
                                 {cell.render("Cell")}
                              </Td>
                           );
                        })}
                     </tr>
                  );
               })}
            </tbody>
         </Tables>
      </Div>
   );
};
export default Table;

const Div = styled.div`
   display: flex;
   justify-content: space-evenly;
   align-content: stretch;
   margin: 1rem;
   background-color: #fff;
   border-radius: 2px;
   box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const Tables = styled.table`
   border: 1px solid black;
   border-spacing: 0;
   width: 90vw;
`;

const Td = styled.td`
   margin: 0;
   padding: 0.05 rem;
   border-bottom: 1px solid black;
   border-right: 1px solid black;
`;

const Th = styled.th`
   margin: 0;
   padding: 0.05 rem;
   border-bottom: 1px solid black;
   border-right: 1px solid black;
`;
