export const getGradeColorHex = (grade: string) => {
    switch (grade) {
        case "고급":
            return "#8df901";
        case "희귀":
            return "#00b0fa";
        case "영웅":
            return "#ba00f9";
        case "전설":
            return "#f9a100";
        case "유물":
            return "#fa5d00";
        case "고대":
            return "#ddc29d";
        case "에스더":
            return "#3cf2e6";
        default:
            return "#ffffff";
    }
};

export const getQualityColor = (quality: number) => {
    if (quality < 30) return "#ffe81d";
    else if (quality < 70) return "#2ab1f6";
    else if (quality < 90) return "#00b0fa";
    else if (quality < 100) return "#8045dd";
    else return "#f9ae00";
};
