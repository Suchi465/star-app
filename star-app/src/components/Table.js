import React,{useMemo} from "react"
import {useTable,useSortBy,useFilters} from 'react-table'
import {COLUMNS} from "./Columns";
import './developer.css'

function Table(props)
{
    
        const columns=useMemo(()=>COLUMNS,[]);
        const data=useMemo(()=>props.value,[]);
        console.log(columns);
        
         
        
        
        const {
            getTableProps
            ,getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,}=useTable({
            columns:columns,
            data:props.value,
        },
          useFilters,
          useSortBy
          );
 
    return (
        <div className="fixTableHead">
                    
        
            <table className="table1" {...getTableProps()}>
                <thead  className="top-row1">
                    {headerGroups.map(headerGroup =>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column =>(
                                    <th className="th1" >
                                        <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}

                                        <span> {column.isSorted ?(column.isSortedDesc ? '⬇' :'⬆'):''}</span>
                                    
                                        </div>

                                           
                                      <div className="searchBox"> {column.canFilter ? column.render('Filter'):null}</div>
    
                                    </th>
                                ))
                            }
                           
                        </tr>                      

                        ))
                    }
                   
                </thead>

                <tbody className="top-row1" {...getTableBodyProps()}>
                    {rows.map(row=>{
                            prepareRow(row)
                            return (
                                <tr  {...row.getRowProps()}>
                                    {
                                        row.cells.map((cell)=>{
                                            return  <td  className="td1" {...cell.getCellProps()}>
                                                {cell.render('Cell')}    
                                            </td>
                                        })}
                        
                    </tr>
                            )
                            })
                    }
                    
                </tbody>
            </table>

            </div>
                   

    )
}
export default Table;