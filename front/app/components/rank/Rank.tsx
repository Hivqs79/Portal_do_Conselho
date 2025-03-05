import { BrandColors } from "@/theme/BrandColors";
import {
  FaRegFaceFrown,
  FaRegFaceLaugh,
  FaRegFaceMeh,
  FaRegFaceSmile,
} from "react-icons/fa6";

interface RankProps {
  type: "otimo" | "bom" | "mediano" | "critico";
  outline: boolean;
}

export default function Rank({ type, outline }: RankProps) {
  const primaryColor = BrandColors.primary_color;
  const terciaryColor = BrandColors.terciary_color;

  const className = `text-4xl p-1 ${
    outline ? "border-[2px] p-1 text-4xl rounded-normal" : ""
  }`;

  const rank = {
    otimo: (
      <FaRegFaceLaugh
        className={`${className} text-[#549600]`}
        style={
          outline
            ? { backgroundColor: terciaryColor, borderColor: primaryColor }
            : {}
        }
      />
    ),
    bom: (
      <FaRegFaceSmile
        className={`${className} text-[#7ABA28]`}
        style={
          outline
            ? { backgroundColor: terciaryColor, borderColor: primaryColor }
            : {}
        }
      />
    ),
    mediano: (
      <FaRegFaceMeh
        className={`${className} text-[#F3C91C]`}
        style={
          outline
            ? { backgroundColor: terciaryColor, borderColor: primaryColor }
            : {}
        }
      />
    ),
    critico: (
      <FaRegFaceFrown
        className={`${className} text-[#FE3535]`}
        style={
          outline
            ? { backgroundColor: terciaryColor, borderColor: primaryColor }
            : {}
        }
      />
    ),
  };

  return <div>{rank[type]}</div>;
}
