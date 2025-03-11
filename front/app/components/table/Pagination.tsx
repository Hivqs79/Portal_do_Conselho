import { Box, MenuItem, Pagination, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function PaginationTable() {
    const [page, setPage] = useState(10);
    const [count, setCount] = useState(10);
    const [rowsPerPage, setRowsPerPage] = useState(10);    
    const [isMedium, setIsMedium] = useState(window.innerWidth < 700);    
    const [isSmall, setIsSmall] = useState(window.innerWidth < 600);    
    const [isTiny, setIsTiny] = useState(window.innerWidth < 450);    

    useEffect(() => {
        setCount(10);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMedium(window.innerWidth < 700);
            setIsSmall(window.innerWidth < 600);
            setIsTiny(window.innerWidth < 450);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <Box className="!flex !flex-col-reverse !w-full !items-end lg:!justify-end lg:!flex-row lg:items-center">
            <Box className="!flex !flex-row items-center mt-4 lg:mt-0 lg:mr-4">
                <Typography variant={isMedium ? "sm_text_bold" : "md_text_bold"} className="!mr-4">Itens por página</Typography>    
                <Select 
                    value={rowsPerPage} 
                    size="small" 
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            paddingTop: isMedium ? '4.5px' : '8.5px',
                            paddingBottom: isMedium ? '4.5px' : '8.5px',
                        },
                    }}   
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                borderRadius: '4px',
                                marginTop: '4px',
                            },
                        },
                        MenuListProps: {    
                            sx: {
                                padding: "4px",                        
                                '& .MuiMenuItem-root': {
                                    justifyContent:'center',
                                    paddingLeft:'8.5px',
                                    paddingRight:'8.5px',
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>                   
            </Box>
            <Pagination 
                count={count}
                page={page}   
                onChange={(event, value) => setPage(value)}                             
                shape="rounded"
                variant="outlined"
                size={isMedium ? "medium" : "large"}                            
                siblingCount={ isTiny ? 0 : 1}
                boundaryCount={isSmall ? 0 : 1}
            />            
        </Box>
    );
}