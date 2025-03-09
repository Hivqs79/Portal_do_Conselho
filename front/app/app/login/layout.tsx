"use client";
import Image from "next/image";
import loginImage from "@/assets/image_login.png";
import { usePathname } from "next/navigation";
import { Box, Typography } from "@mui/material";
import LogoIcon from "@/components/LogoIcon";
import { ThemeLoginProvider, useThemeLoginContext  } from "@/hooks/useThemeLogin";

export default function LayoutLogin({ children }: { children: React.ReactElement }) {
    return (
        <ThemeLoginProvider>
            <InnerLayoutLogin>{children}</InnerLayoutLogin>
        </ThemeLoginProvider>
    )
}

function InnerLayoutLogin({
    children,
  }: Readonly<{
    children: React.ReactElement;
  }>) {
    const { bluePrimary } = useThemeLoginContext();
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    
    return (
        <Box className={`flex h-screen justify-center items-center ` + (isLoginPage ? "flex-row" : "flex-row-reverse")}>  
            <Box className="hidden lg:block w-1/2 h-screen relative">
                <Image src={loginImage} alt="Happy students looking forward to camera" fill objectFit="cover" className="w-[50%]" />
                <div style={{ backgroundColor: bluePrimary + '8C' }} className="absolute top-0 left-0 w-full h-screen"/>
            </Box>
            <Box className="relative w-3/4 lg:w-1/2 lg:my-36 top-0 right-0 flex flex-col justify-center items-center">
              <Box className="flex flex-row items-center mb-12 sm:mb-20">
                  <LogoIcon color={bluePrimary} className="w-32 h-32 sm:w-44 sm:h-44"/>
                  <Typography variant="xl_text_bold" color={bluePrimary} className="!ml-9 !text-4xl sm:!text-5xl">Portal do <br/>Conselho</Typography>
              </Box>
              {children}
            </Box>
        </Box>
    );
}