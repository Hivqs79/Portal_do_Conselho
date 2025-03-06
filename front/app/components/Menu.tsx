import { useThemeContext } from '@/hooks/useTheme';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
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

interface MenuHeaderProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
    variant?: string;
}

export default function MenuHeader({ anchorEl, open, onClose, variant }: MenuHeaderProps) {
    const {whiteColor} = useThemeContext();

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}                        
        >
            <Box className="">                
                <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={BsHouse} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Principal</Typography>                    
                </MenuItem>
                <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={MdOutlineChat} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Chat</Typography>                    
                </MenuItem>
                {variant === "leader" && (
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={LuPencilLine} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Pré-conselho</Typography>                    
                    </MenuItem>
                )}
                {variant === "teacher" && (
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={LuPencilLine} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Anotações</Typography>                    
                    </MenuItem>
                )}
                {(variant === "teacher" || variant === "pedagogic" || variant === "supervisior") && (
                    <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={FaRegClock} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Histórico de conselhos</Typography>                    
                    </MenuItem>
                )}
                {variant === "pedagogic" && (
                    <>
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={CgFileDocument} color={whiteColor} />
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Conselho</Typography>                    
                        </MenuItem>
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={PiBooks} color={whiteColor} />
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Pré-conselho</Typography>                    
                        </MenuItem>
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={TbReport} color={whiteColor} />                            
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Liberação de conselho</Typography>                    
                        </MenuItem>
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={SiGoogleclassroom} color={whiteColor} />                            
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Gerenciamento de turmas</Typography>                    
                        </MenuItem>
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={GoPeople} color={whiteColor} />                            
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Gerenciamento de usuários</Typography>                    
                        </MenuItem>
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={GoGraph} color={whiteColor} />                            
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Dashboard</Typography>                    
                        </MenuItem>
                        <MenuItem onClick={onClose} className="flex flex-row">                    
                            <Icon IconPassed={FaRegFilePdf} color={whiteColor} />                            
                            <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Relatórios</Typography>                    
                        </MenuItem>
                    </>
                )}
                <div style={{ backgroundColor: whiteColor }} className="w-full h-[1px] my-4" />
                <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={BiSupport} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Suporte</Typography>                    
                </MenuItem>
                <MenuItem onClick={onClose} className="flex flex-row">                    
                        <Icon IconPassed={IoSettingsOutline} color={whiteColor} />
                        <Typography variant="lg_text_regular" color={whiteColor} className="!ml-2">Configurações</Typography>                    
                </MenuItem>
            </Box>
        </Menu>
    );
}