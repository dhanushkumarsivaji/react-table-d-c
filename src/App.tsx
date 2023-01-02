import React from "react";
import TableComponent from "./components/table";

import "./App.css";

function App() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="App">
      <TableComponent enableColumnFilters={checked} handleChange={handleChange}/>
    </div>
  );
}

export default App;


// function ColumnVisibilityComponent({ table }: any) {
//   return (
//     <div className="p-2">
//       <div
//         className="inline-block border border-black shadow rounded"
//         style={{ display: "flex" }}
//       >
//         {/* <div className="px-1 border-b border-black">
//         <label>
//           <input
//             {...{
//               type: 'checkbox',
//               checked: table.getIsAllColumnsVisible(),
//               onChange: table.getToggleAllColumnsVisibilityHandler(),
//             }}
//           />{' '}
//           Toggle All
//         </label>
//       </div> */}
//         {table
//           .getAllLeafColumns()
//           .map(
//             (column: {
//               id:
//                 | boolean
//                 | React.ReactElement<
//                     any,
//                     string | React.JSXElementConstructor<any>
//                   >
//                 | React.ReactFragment
//                 | React.Key
//                 | null
//                 | undefined;
//               getIsVisible: () => any;
//               getToggleVisibilityHandler: () => any;
//             }) => {
//               return (
//                 <div className="px-1">
//                   <label>
//                     <Checkbox
//                       checked={column.getIsVisible()}
//                       onChange={column.getToggleVisibilityHandler()}
//                       inputProps={{ "aria-label": "controlled" }}
//                     />{" "}
//                     {column.id}
//                   </label>
//                 </div>
//               );
//             }
//           )}
//       </div>
//     </div>
//   );
// }