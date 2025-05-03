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

import { useThemeContext } from '@/hooks/useTheme';
import { Box, Menu, MenuItem, Slide, styled, Typography } from '@mui/material';
import Icon from './Icon';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsHouse } from 'react-icons/bs';
import { MdOutlineChat } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import { LuPencilLine } from 'react-icons/lu';
import { FaRegClock } from 'react-icons/fa';
import { PiBooks } from 'react-icons/pi';
import { CgFileDocument } from 'react-icons/cg';
import { TbReport } from 'react-icons/tb';
import { SiGoogleclassroom } from 'react-icons/si';
import { GoPeople } from 'react-icons/go';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRoleContext } from '@/hooks/useRole';

interface MenuHeaderProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
    variant?: string;
}

const CustomMenu = styled(Menu)(() => ({
    "& .MuiPaper-root": {
        backgroundColor: "var(--primary-color)",
        color: "var(--white-color)",
        borderRadius: "0px 0px 4px 4px",
        left: "0px !important",
        boxShadow: "2px 2px 8px 0px var(--primary-color)77",
    },
    "& .MuiList-root": {
        padding: "16px 0px",
    },
}))


export default function MenuHeader({ open, onClose, variant }: MenuHeaderProps) {
    const {whiteColor} = useThemeContext();
    const [isRepresentant, setIsRepresentant] = useState(false);
    const { userId, token, role } = useRoleContext();
    const menuRef = useRef<HTMLDivElement>(null);    

    const fetchUser = async (): Promise<boolean> => {
      if (role === "student") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/student/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 404) {
            console.log("Student not found")
          }

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if ("isRepresentant" in data) {
            return data.isRepresentant === true;
          }
          return false;
        } catch (error) {
          return false;
        }
      }
      return false;
    };

    useEffect(() => {
        const handleUser = async () => {
            setIsRepresentant(await fetchUser())
        }
        handleUser();
    })

    return (
        <CustomMenu
        sx={{zIndex: 25,}}
            anchorReference="anchorPosition"
            anchorPosition={{
                top: 88,
                left: 0,
            }}
            open={open}
            ref={menuRef}
            onClose={onClose}   
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}               
            TransitionComponent={Slide}
            TransitionProps={{
                timeout: 500,
            }}       
        >
            <Box>
                <Link href="/">
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={BsHouse} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Principal</Typography>                    
                    </MenuItem>
                </Link>
                {variant !== "admin" && (
                <Link href="/chat">
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={MdOutlineChat} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Chat</Typography>                    
                    </MenuItem>
                </Link>
                )}
                {isRepresentant && (
                    <Link href="/fill-out-pre-council">
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={LuPencilLine} color={whiteColor} />
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Pré-conselho</Typography>                    
                        </MenuItem>
                    </Link>
                )}
                {variant === "teacher" && (
                    <Link href="/annotations">
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={LuPencilLine} color={whiteColor} />
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Anotações</Typography>                    
                        </MenuItem>
                    </Link>
                )}
                {(variant === "teacher" || variant === "pedagogic" || variant === "subpedagogic" || variant === "supervisor") && (
                    <Link href="/council-historic">
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={FaRegClock} color={whiteColor} />
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Histórico de conselhos</Typography>                    
                        </MenuItem>
                    </Link>
                )}
                {(variant === "pedagogic" || variant === "subpedagogic") && (
                    <>
                        <Link href="/council">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={CgFileDocument} color={whiteColor} />
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Conselho</Typography>                    
                            </MenuItem>
                        </Link>
                        <Link href="/pre-council">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={PiBooks} color={whiteColor} />
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Pré-conselho</Typography>                    
                            </MenuItem>
                        </Link>
                        <Link href="/release-feedback">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={TbReport} color={whiteColor} />                            
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Liberação de feedbacks</Typography>                    
                            </MenuItem>
                        </Link>
                        <Link href="/class-management">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={SiGoogleclassroom} color={whiteColor} />                            
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Gerenciamento de turmas</Typography>                    
                            </MenuItem>
                        </Link>
                        <Link href="/user-management">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={GoPeople} color={whiteColor} />                            
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Gerenciamento de usuários</Typography>                    
                            </MenuItem>
                        </Link>
                        {/* <Link href="/dashboard"> */}
                            {/* <MenuItem onClick={onClose} className="flex flex-row">                     */}
                                {/* <Icon IconPassed={GoGraph} color={whiteColor} />                             */}
                                {/* <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Dashboard</Typography>                     */}
                            {/* </MenuItem> */}
                        {/* </Link> */}
                        {/* <Link href="/reports"> */}
                            {/* <MenuItem onClick={onClose} className="flex flex-row">                     */}
                                {/* <Icon IconPassed={FaRegFilePdf} color={whiteColor} />                             */}
                                {/* <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Relatórios</Typography>                     */}
                            {/* </MenuItem> */}
                        {/* </Link> */}
                    </>
                )}
                {variant === "admin" && (
                    <>
                    <Link href="/class-management">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={SiGoogleclassroom} color={whiteColor} />                            
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Gerenciamento de turmas</Typography>                    
                            </MenuItem>
                        </Link>
                        <Link href="/user-management">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={GoPeople} color={whiteColor} />                            
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Gerenciamento de usuários</Typography>                    
                            </MenuItem>
                        </Link>
                    </>
                )}
                <div style={{ backgroundColor: whiteColor }} className="w-full h-[1px] my-4" />
                {variant !== "admin" && 
                <Link href="/support">
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={BiSupport} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Suporte</Typography>                    
                    </MenuItem>
                </Link>}
                <Link href="/configurations">
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={IoSettingsOutline} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Configurações</Typography>                    
                    </MenuItem>
                </Link>
            </Box>
        </CustomMenu>
    );
}