import { CircularProgress, Typography } from "@mui/material";

interface LoadingPageProps {
    message: string;
}

export default function LoadingPage({message}: LoadingPageProps) {
    return (
        <body className="flex flex-col gap-2 items-center justify-center h-[100vh] w-[100vw]">
            <CircularProgress />
            <Typography variant="lg_text_regular">{message}</Typography>
        </body>
    );
}