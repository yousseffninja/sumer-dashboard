import { useState,useEffect } from "react";
import useDebounce from "./useDebounce";

export const usePageUtilities = () => {
    const [search,setSearch] = useState();
    const debouncedSearch = useDebounce(search,500);
    const [controller, setController] = useState({
        page: 0,
        rowsPerPage: 10,
        filter: " ",
    });

    const handlePageChange = (event: any, newPage: number) => {
        
        setController({
            ...controller,
            page: newPage,
        });
    };

    const handleRowsPerPageChange = (event: any) => {
        setController({
            ...controller,
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0,
        });
    };

    const handleSearch = (event: any) => {
        const txt = (event.target.value).toString();
        setSearch(txt)
    };
    useEffect(()=>{
        setController({
            ...controller,
            page: 0,
            filter: debouncedSearch||'',
        });
    },[debouncedSearch])
    return {
        handlePageChange,
        handleRowsPerPageChange,
        handleSearch,
        controller,
        setController,
        debouncedSearch
    };
};