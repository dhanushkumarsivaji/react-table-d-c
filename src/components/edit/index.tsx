import { useState, useEffect } from "react";
// import { isEmpty } from 'lodash';


const Edit = () => {


    const [data, setData] = useState({})

    useEffect(() => {
        if (sessionStorage.row) {
            setData(JSON.parse(sessionStorage.row))
        }
    }, [])

    return (
        <>
            {JSON.stringify(data, null, 2)}

        </>
    )
}

export default Edit;