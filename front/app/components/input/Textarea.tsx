import React from 'react';
import { useThemeContext } from "@/hooks/useTheme";

interface TextareaProps {
    title: string;
    content: string;
}

export default function Textarea({ title, content }: TextareaProps) {
    const { primaryColor, constrastColor, backgroundColor } = useThemeContext();

    return (
        <div className="flex flex-col space-y-2 w-full"> 
            <label
                className="text-lg font-semibold"
                style={{
                    color: primaryColor
                }}
            >
                {title}
            </label>
            <textarea
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
                style={{
                    backgroundColor: backgroundColor,
                    borderColor: primaryColor,
                    color: constrastColor // Adicionando a cor do texto
                }}
                defaultValue={content}
                rows={8}
            />
        </div>
    );
}