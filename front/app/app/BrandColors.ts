import colors from "./colors.json";

export default class BrandColors {
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
        BrandColors._primary_color = colors[color].primary;
        BrandColors._secondary_color = colors[color].secondary;
        BrandColors._terciary_color = colors[color].terciary;
    }
}