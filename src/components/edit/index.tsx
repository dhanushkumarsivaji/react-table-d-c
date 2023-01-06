import { useState, useEffect } from "react";
import FormFields from "./formFields";

export default () => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (sessionStorage.row) {
      setData(JSON.parse(sessionStorage.row));
    }
  }, []);
  return (
    <>
      <FormFields data={data} />
    </>
  );
};
