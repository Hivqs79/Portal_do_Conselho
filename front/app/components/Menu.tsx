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
import { GoGraph, GoPeople } from 'react-icons/go';
import { FaRegFilePdf } from 'react-icons/fa6';
import Link from 'next/link';
import { useRef } from 'react';

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
    const menuRef = useRef<HTMLDivElement>(null);    

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
                <Link href="/chat">
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={MdOutlineChat} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Chat</Typography>                    
                    </MenuItem>
                </Link>
                {variant === "leader" && (
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
                {(variant === "teacher" || variant === "pedagogic" || variant === "supervisior") && (
                    <Link href="/council-historic">
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={FaRegClock} color={whiteColor} />
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Histórico de conselhos</Typography>                    
                        </MenuItem>
                    </Link>
                )}
                {variant === "pedagogic" && (
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
                        <Link href="/dashboard">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={GoGraph} color={whiteColor} />                            
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Dashboard</Typography>                    
                            </MenuItem>
                        </Link>
                        <Link href="/reports">
                            <MenuItem onClick={onClose} className="flex flex-row">                    
                                <Icon IconPassed={FaRegFilePdf} color={whiteColor} />                            
                                <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Relatórios</Typography>                    
                            </MenuItem>
                        </Link>
                    </>
                )}
                <div style={{ backgroundColor: whiteColor }} className="w-full h-[1px] my-4" />
                <Link href="/support">
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={BiSupport} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Suporte</Typography>                    
                    </MenuItem>
                </Link>
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