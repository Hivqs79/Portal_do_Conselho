"use client";
import { Container, Box, Button, TextField, Typography } from "@mui/material";
import { useThemeContext } from "@/hooks/useTheme";
import {
  IoClose,
  IoCopyOutline,
  IoFolderOpenOutline,
  IoMenu,
  IoSearch,
  IoSettingsOutline,
} from "react-icons/io5";
import { BsExclamationTriangle, BsHouse, BsPin } from "react-icons/bs";
import {
  LuLogOut,
  LuPencilLine,
  LuSend,
  LuTrash,
  LuTrophy,
  LuUpload,
} from "react-icons/lu";
import { FiDownload, FiPlus } from "react-icons/fi";
import {
  FaChalkboardTeacher,
  FaCheck,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegEyeSlash,
} from "react-icons/fa";
import { BiCheckDouble, BiSupport } from "react-icons/bi";
import { PiBooks, PiStudentBold, PiUserBold } from "react-icons/pi";
import { GoGraph, GoPeople } from "react-icons/go";
import { MdOutlineChat } from "react-icons/md";
import { HiOutlineFilter, HiOutlineKey } from "react-icons/hi";
import { VscBell, VscSettings } from "react-icons/vsc";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { CgFileDocument } from "react-icons/cg";
import { TbReport } from "react-icons/tb";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
  IoIosArrowUp,
} from "react-icons/io";
import Icon from "@/components/Icon";
import Rank from "@/components/rank/Rank";
import { FaRegEye, FaRegFilePdf } from "react-icons/fa6";
import Table from "@/components/table/Table";
import TextareaComponent from "@/components/input/TextareaComponent";
import Photo from "@/components/profile/Photo";
import AvaliationInputs from "@/components/council/AvaliationInputs";
import Pagination from "@/components/table/Pagination";

export default function Components() {
  const { primaryColor, secondaryColor, terciaryColor, constrastColor } =
    useThemeContext();

  return (
    <Container
      maxWidth={"lg"}
      className="flex flex-col gap-8 justify-center items-center min-h-screen" //change to center after
    >
      <Box className="flex flex-row gap-8 justify-center items-center">
        <Box className="flex flex-col gap-4">
          <Button variant="contained" color="primary" sx={{ width: 300 }}>
            Teste Primary
          </Button>
          <Button variant="contained" color="secondary" sx={{ width: 300 }}>
            Teste Secondary
          </Button>
          <Button variant="contained" color="terciary" sx={{ width: 300 }}>
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
      <Box className="!flex !flex-row !gap-8">
        <Box
          style={{ backgroundColor: primaryColor, borderColor: constrastColor }}
          className="border-2 rounded-lg w-16 h-16"
        ></Box>
        <Box
          style={{
            backgroundColor: secondaryColor,
            borderColor: constrastColor,
          }}
          className="border-2 rounded-lg w-16 h-16"
        ></Box>
        <Box
          style={{
            backgroundColor: terciaryColor,
            borderColor: constrastColor,
          }}
          className="border-2 rounded-lg w-16 h-16"
        ></Box>
      </Box>
      <Box className="!flex !flex-row !gap-8 items-center">
        <Typography variant="h1_title" component="h1">
          h1_title
        </Typography>
        <Typography variant="h2_title" component="h2">
          h2_title
        </Typography>
        <Typography variant="h3_title" component="h3">
          h3_title
        </Typography>
        <Typography variant="h4_title" component="h4">
          h4_title
        </Typography>
        <Typography variant="h5_title" component="h5">
          h5_title
        </Typography>
        <Typography variant="h6_title" component="h6">
          h6_title
        </Typography>
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
      <Box className="!flex !flex-row !flex-wrap">
        <Icon IconPassed={IoFolderOpenOutline} />
        <Icon IconPassed={BsHouse} />
        <Icon IconPassed={LuPencilLine} />
        <Icon IconPassed={LuTrash} />
        <Icon IconPassed={FiPlus} />
        <Icon IconPassed={FaCheck} />
        <Icon IconPassed={BiCheckDouble} />
        <Icon IconPassed={IoClose} />
        <Icon IconPassed={FiDownload} />
        <Icon IconPassed={LuUpload} />
        <Icon IconPassed={PiUserBold} />
        <Icon IconPassed={GoPeople} />
        <Icon IconPassed={MdOutlineChat} />
        <Icon IconPassed={LuSend} />
        <Icon IconPassed={IoSettingsOutline} />
        <Icon IconPassed={LuLogOut} />
        <Icon IconPassed={IoMenu} />
        <Icon IconPassed={HiOutlineFilter} />
        <Icon IconPassed={VscSettings} />
        <Icon IconPassed={IoSearch} />
        <Icon IconPassed={BiSupport} />
        <Icon IconPassed={FaRegClock} />
        <Icon IconPassed={VscBell} />
        <Icon IconPassed={BsExclamationTriangle} />
        <Icon IconPassed={FaRegCalendarAlt} />
        <Icon IconPassed={RiCalendarScheduleLine} />
        <Icon IconPassed={SiGoogleclassroom} />
        <Icon IconPassed={LuTrophy} />
        <Icon IconPassed={PiBooks} />
        <Icon IconPassed={PiStudentBold} />
        <Icon IconPassed={CgFileDocument} />
        <Icon IconPassed={BsPin} />
        <Icon IconPassed={FaChalkboardTeacher} />
        <Icon IconPassed={HiOutlineKey} />
        <Icon IconPassed={TbReport} />
        <Icon IconPassed={GoGraph} />
        <Icon IconPassed={IoIosArrowUp} />
        <Icon IconPassed={IoIosArrowForward} />
        <Icon IconPassed={IoIosArrowDown} />
        <Icon IconPassed={IoIosArrowBack} />
        <Icon IconPassed={IoIosArrowRoundForward} />
        <Icon IconPassed={IoIosArrowRoundBack} />
        <Icon IconPassed={FaRegFilePdf} />
        <Icon IconPassed={FaRegEye} />
        <Icon IconPassed={FaRegEyeSlash} />
        <Icon IconPassed={IoCopyOutline} />
      </Box>

      <Table variant="primary" />
      <Table variant="primary" />

      <TextareaComponent readonly={false} title="Pontos Positivos" />
      <TextareaComponent
        readonly={true}
        title="Pontos Positivos"
        content="teste"
      />

      <Pagination />

      <AvaliationInputs
        wrtiteOnly={false}
        Negativecontent="teste"
        Positivecontent="teste"
      />

      <Photo photo={""} rounded={false} classname="w-20 h-20" />
      <Photo photo={""} rounded={true} classname="w-20 h-20" />
    </Container>
  );
}
