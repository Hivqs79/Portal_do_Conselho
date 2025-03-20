export class BrandColors {
    private static _primary_color: string = "#0050AC";
    private static _secondary_color: string = "#459DEB";
    private static _terciary_color: string = "#E2EEFC";

    constructor(primary_color: string, secondary_color: string, terciary_color: string) {
        BrandColors._primary_color = primary_color;
        BrandColors._secondary_color = secondary_color;
        BrandColors._terciary_color = terciary_color;
    }

    public static get primary_color(): string {
        return BrandColors._primary_color;
    }

    public static get secondary_color(): string {
        return BrandColors._secondary_color;
    }

    public static get terciary_color(): string {
        return BrandColors._terciary_color;
    }

    public static changePallete(color: "gray" | "blue" | "pink" | "yellow" | "red" | "green" | "purple" | "orange") {
        BrandColors._primary_color = colors.pallete[color].primary;
        BrandColors._secondary_color = colors.pallete[color].secondary;
        BrandColors._terciary_color = colors.pallete[color].terciary;
    }
}

export const colors = {
    "whiteColor": "#f5f5f5",
    "blackColor": "#333333",
    "textDarkColor": "#191919",
    "primaryGrayColor": "#888888",
    "secondaryGrayColor": "#E7E7E7",
    "redDanger": "#FE3535",
    "pallete" : {
        "blue": {
            "primary": "#0050AC",
            "secondary": "#459DEB",
            "terciary": "#E2EEFC"
        },
        "green": {
            "primary": "#3B5A1A",
            "secondary": "#7ABA28",
            "terciary": "#D3EFA7"
        },
        "gray": {
            "primary": "#535353",
            "secondary": "#B0B0B0",
            "terciary": "#E7E7E7"
        },
        "pink": {
            "primary": "#DD1155",
            "secondary": "#FF879C",
            "terciary": "#FFE3E8"
        },
        "yellow": {
            "primary": "#814E12",
            "secondary": "#F3C91C",
            "terciary": "#FAEE8E"
        },
        "red": {
            "primary": "#A41010",
            "secondary": "#FF757A",
            "terciary": "#FFC5C5"
        },
        "purple": {
            "primary": "#4E0BA7",
            "secondary": "#AF92FF",
            "terciary": "#DBD0FF"
        },
        "orange": {
            "primary": "#8D3A0B",
            "secondary": "#FF9D33",
            "terciary": "#FFDCA6"
        }
    }
}