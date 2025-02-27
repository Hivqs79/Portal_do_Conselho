"use client";
import { Container , Box, Button, TextField, Switch, FormControlLabel, RadioGroup, Radio, Typography } from "@mui/material";
import { useThemeContext } from "@/hooks/useTheme";
import { useState } from "react";
import { IoClose, IoCopyOutline, IoFolderOpenOutline, IoMenu, IoSearch, IoSettingsOutline } from "react-icons/io5";
import { BsExclamationTriangle, BsHouse, BsPin } from "react-icons/bs";
import { LuLogOut, LuPencilLine, LuSend, LuTrash, LuTrophy, LuUpload } from "react-icons/lu";
import { FiDownload, FiPlus } from "react-icons/fi";
import { FaChalkboardTeacher, FaCheck, FaRegCalendarAlt, FaRegClock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiCheckDouble, BiSolidFilePdf, BiSupport } from "react-icons/bi";
import { PiBooksLight, PiStudentBold, PiUserBold } from "react-icons/pi";
import { GoGraph, GoPeople } from "react-icons/go";
import { MdOutlineChat } from "react-icons/md";
import { HiOutlineFilter, HiOutlineKey } from "react-icons/hi";
import { VscBell, VscSettings } from "react-icons/vsc";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { CgFileDocument } from "react-icons/cg";
import { TbReport } from "react-icons/tb";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowRoundBack, IoIosArrowRoundForward, IoIosArrowUp } from "react-icons/io";
import Icon from "@/components/Icon";

export default function Home() {
  const [ color, setColor ] = useState("");
  const { changeThemeMode, changePallete } = useThemeContext();

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    let colorChosen = (event.target as HTMLInputElement).value as "purple" | "gray" | "blue" | "pink" | "yellow" | "red" | "green" | "orange";
    setColor(colorChosen);
    changePallete(colorChosen);
  };

  return (
    <Container maxWidth={"lg"} className="flex flex-col gap-8 justify-center items-center min-h-screen">
      <Box className="flex flex-row gap-8 justify-center items-center">
        <Box className="flex flex-col gap-4">
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 300 }}            
          >
            Teste Primary
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: 300 }}            
          >
            Teste Secondary
          </Button>
          <Button
            variant="contained"
            color="terciary"
            sx={{ width: 300 }}                      
          >
            Teste Terciary
          </Button>
        </Box>
        <Box className="!flex !flex-col !gap-5">
          <TextField
            id="outlined-search"
            label="Email"
            type="search"
            color="primary"
          />
          <TextField
            id="outlined-search"
            label="Password"
            type="search"
            color="primary"
          />
        </Box>
      </Box>
      <Box>
        <FormControlLabel
          control={<Switch
            defaultChecked
            onChange={() => changeThemeMode()}
          />}
          label="Dark mode"
        />
      </Box>
      <Box>
        <Typography variant="xl_text_bold">Pallete changer</Typography>
        <RadioGroup value={color} defaultValue="" onChange={handleChangeColor} row>
          {new Array("blue","green","red","orange","pink","purple","yellow","gray").map((color, index) => {
              return <FormControlLabel          
                label={<Typography variant="lg_text_regular">{color}</Typography>} 
                value={color}   
                key={index}         
                control={<Radio />}
              />
          })}          
        </RadioGroup>
      </Box>
      <Box className="!flex !flex-row !gap-8 items-center">
        <Typography variant="h1_title" component="h1">h1_title</Typography>
        <Typography variant="h2_title" component="h2">h2_title</Typography>
        <Typography variant="h3_title" component="h3">h3_title</Typography>
        <Typography variant="h4_title" component="h4">h4_title</Typography>
        <Typography variant="h5_title" component="h5">h5_title</Typography>
        <Typography variant="h6_title" component="h6">h6_title</Typography>
      </Box>
      <Box className="!flex !flex-row !gap-8 items-center">
        <Box className="!flex !flex-col">
          <Typography variant="xl_text_bold">xl_text_bold</Typography>
          <Typography variant="xl_text_regular">xl_text_regular</Typography>
          <Typography variant="xl_text_light">xl_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="lg_text_bold">lg_text_bold</Typography>
          <Typography variant="lg_text_regular">lg_text_regular</Typography>
          <Typography variant="lg_text_light">lg_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="md_text_bold">md_text_bold</Typography>
          <Typography variant="md_text_regular">md_text_regular</Typography>
          <Typography variant="md_text_light">md_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="sm_text_bold">sm_text_bold</Typography>
          <Typography variant="sm_text_regular">sm_text_regular</Typography>
          <Typography variant="sm_text_light">sm_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="xs_text_bold">xs_text_bold</Typography>
          <Typography variant="xs_text_regular">xs_text_regular</Typography>
          <Typography variant="xs_text_light">xs_text_light</Typography>
        </Box>
        <Box className="!flex !flex-col">
          <Typography variant="tn_text_bold">tn_text_bold</Typography>
          <Typography variant="tn_text_regular">tn_text_regular</Typography>
          <Typography variant="tn_text_light">tn_text_light</Typography>
        </Box>
      </Box>
      <Box className="!flex !flex-row">
        <Icon IconPassed={IoFolderOpenOutline}/>
        <IoFolderOpenOutline className="h-6 w-6"/>
        <BsHouse className="h-6 w-6"/>
        <LuPencilLine className="h-6 w-6"/>
        <LuTrash className="h-6 w-6"/>
        <FiPlus className="h-6 w-6"/>
        <FaCheck className="h-6 w-6"/>
        <BiCheckDouble className="h-6 w-6"/>
        <IoClose className="h-6 w-6"/>
        <FiDownload className="h-6 w-6"/>
        <LuUpload className="h-6 w-6"/>
        <PiUserBold className="h-6 w-6"/>
        <GoPeople className="h-6 w-6"/>
        <MdOutlineChat className="h-6 w-6"/>
        <LuSend className="h-6 w-6"/>
        <IoSettingsOutline className="h-6 w-6"/>
        <LuLogOut className="h-6 w-6"/>
        <IoMenu className="h-6 w-6"/>
        <HiOutlineFilter className="h-6 w-6"/>
        <VscSettings className="h-6 w-6"/>
        <IoSearch className="h-6 w-6"/>
        <BiSupport className="h-6 w-6"/>
        <FaRegClock className="h-6 w-6"/>
        <VscBell className="h-6 w-6"/>
        <BsExclamationTriangle className="h-6 w-6"/>
        <FaRegCalendarAlt className="h-6 w-6"/>
        <RiCalendarScheduleLine className="h-6 w-6"/>
        <SiGoogleclassroom className="h-6 w-6"/>
        <LuTrophy className="h-6 w-6"/>
        <PiBooksLight className="h-6 w-6"/>
        <PiStudentBold className="h-6 w-6"/>
        <CgFileDocument className="h-6 w-6"/>
        <BsPin className="h-6 w-6"/>
        <FaChalkboardTeacher className="h-6 w-6"/>
        <HiOutlineKey className="h-6 w-6"/>
        <TbReport className="h-6 w-6"/>
        <GoGraph className="h-6 w-6"/>
        <IoIosArrowUp className="h-6 w-6"/>
        <IoIosArrowForward className="h-6 w-6"/>
        <IoIosArrowDown className="h-6 w-6"/>
        <IoIosArrowBack className="h-6 w-6"/>
        <IoIosArrowRoundForward className="h-6 w-6"/>
        <IoIosArrowRoundBack className="h-6 w-6"/>
        <BiSolidFilePdf className="h-6 w-6"/>
        <FaRegEye className="h-6 w-6"/>
        <FaRegEyeSlash className="h-6 w-6"/>
        <IoCopyOutline className="h-6 w-6"/>
      </Box>
    </Container>
  );
}


