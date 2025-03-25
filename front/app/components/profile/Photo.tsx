"use client";

import { useThemeContext } from "@/hooks/useTheme";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PhotoProps {
  classname?: string;
  rounded?: boolean;
  idUser?: number;
  profile?: boolean;
}

export default function Photo({ classname, rounded, profile, idUser }: PhotoProps) {
  const { secondaryColor, terciaryColor } = useThemeContext();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (idUser) {
      fetch(`http://localhost:3000/image/${idUser}`)
        .then((res) => {
          if (!res.ok) throw new Error("Imagem não encontrada");
          return res.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setPhotoUrl(url);
        })
        .catch((error) => {
          console.error(error);
          setPhotoUrl(null);
        });
    }
  }, [idUser]);

  if (!photoUrl) {
    return rounded ? (
      <svg className={classname || "w-[200px] h-[200px]"} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_489_11834)">
          <rect width="200" height="200" rx="100" fill={terciaryColor} />
          <circle cx="100" cy="100" r="40" fill={secondaryColor} />
          <path d="M165 203C165 183.904 158.152 165.591 145.962 152.088C133.772 138.586 117.239 131 100 131C82.7609 131 66.2279 138.586 54.0381 152.088C41.8482 165.591 35 183.904 35 203L100 203H165Z" fill={secondaryColor} />
        </g>
        <defs>
          <clipPath id="clip0_489_11834">
            <rect width="200" height="200" rx="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ) : (
      <svg className={classname || "w-full"} viewBox="0 0 238 276" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_489_12108)">
          <rect width="238" height="276" rx="4" fill={terciaryColor} />
          <circle cx="119" cy="145" r="57" fill={secondaryColor} />
          <path d="M219 276.5C219 254.089 208.464 232.596 189.711 216.749C170.957 200.903 145.522 192 119 192C92.4784 192 67.043 200.903 48.2893 216.749C29.5357 232.596 19 254.089 19 276.5L119 276.5H219Z" fill={secondaryColor} />
        </g>
        <defs>
          <clipPath id="clip0_489_12108">
            <rect width="238" height="276" rx="4" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <Image
      src={photoUrl}
      alt="Custom Image"
      width={500}
      height={500}
      className={rounded ? `rounded-full ${classname} ${profile ? "w-[244px] h-[200px]" : ""}` : `${classname}`}
    />
  );
}