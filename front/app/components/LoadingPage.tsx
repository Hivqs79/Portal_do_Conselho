/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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