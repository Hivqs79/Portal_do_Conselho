import Image from "next/image";
import { useEffect, useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";

interface PhotoProps {
  classname?: string;
  rounded?: boolean;
  idUser?: number;
  profile?: boolean;
}

export default function Photo({
  classname,
  rounded,
  profile,
  idUser,
}: PhotoProps) {
  const { secondaryColor, terciaryColor } = useThemeContext();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (idUser) {
      const imageId = parseInt(localStorage.getItem("imageid") || "0"); //PENDÊNCIA: REMOVER ESTE TESTE DEPOIS, E CAPTURAR O ID CORRETO COM BASE NO USUARIO LOGADO
      if (!imageId || isNaN(imageId)) { //PENDÊNCIA: REMOVER ESTE TESTE DEPOIS, E CAPTURAR O ID CORRETO COM BASE NO USUARIO LOGADO
        console.error("Imagem não encontrada, ID não é válido"); //PENDÊNCIA: REMOVER ESTE TESTE DEPOIS, E CAPTURAR O ID CORRETO COM BASE NO USUARIO LOGADO
        return; //PENDÊNCIA: REMOVER ESTE TESTE DEPOIS, E CAPTURAR O ID CORRETO COM BASE NO USUARIO LOGADO
      } //PENDÊNCIA: REMOVER ESTE TESTE DEPOIS, E CAPTURAR O ID CORRETO COM BASE NO USUARIO LOGADO

      fetch(`http://localhost:3060/image/${imageId}`) //PENDÊNCIA: REMOVER ESTE TESTE DEPOIS, E CAPTURAR O ID CORRETO COM BASE NO USUARIO LOGADO
        .then((res) => {
          if (!res.ok) {
            console.log("Imagem não encontrada, default img selecionada")
            setPhotoUrl(null);
          }
          return res.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setPhotoUrl(url);

          // Pré-carregar a imagem para obter suas dimensões
          const img = new window.Image();
          img.src = url;
          img.onload = () => {
            setDimensions({ width: img.width, height: img.height });
          };
        })
        .catch((error) => {
          console.error(error);
          setPhotoUrl(null);
        });
    }
  }, [idUser]);

  if (!photoUrl || !dimensions) {
    return rounded ? (
      <svg
        className={classname || "max-w-[250px]"}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_489_11834)">
          <rect width="200" height="200" rx="100" fill={terciaryColor} />
          <circle cx="100" cy="100" r="40" fill={secondaryColor} />
          <path
            d="M165 203C165 183.904 158.152 165.591 145.962 152.088C133.772 138.586 117.239 131 100 131C82.7609 131 66.2279 138.586 54.0381 152.088C41.8482 165.591 35 183.904 35 203L100 203H165Z"
            fill={secondaryColor}
          />
        </g>
        <defs>
          <clipPath id="clip0_489_11834">
            <rect width="200" height="200" rx="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ) : (
      <svg
        className={classname || "max-w-[250px]"}
        viewBox="0 0 238 276"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_489_12108)">
          <rect width="238" height="276" rx="4" fill={terciaryColor} />
          <circle cx="119" cy="145" r="57" fill={secondaryColor} />
          <path
            d="M219 276.5C219 254.089 208.464 232.596 189.711 216.749C170.957 200.903 145.522 192 119 192C92.4784 192 67.043 200.903 48.2893 216.749C29.5357 232.596 19 254.089 19 276.5L119 276.5H219Z"
            fill={secondaryColor}
          />
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
      width={dimensions.width}
      height={dimensions.height}
      className={
        rounded
          ? `rounded-full ${classname} ${
              profile ? "max-w-[244px] h-[200px]" : ""
            }`
          : `${classname}`
      }
    />
  );
}