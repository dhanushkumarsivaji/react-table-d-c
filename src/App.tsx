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
