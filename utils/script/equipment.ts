export const getGradeColor = (grade: string) => {
    switch (grade) {
        case "고급":
            return "itemGrade1";
        case "희귀":
            return "itemGrade2";
        case "영웅":
            return "itemGrade3";
        case "전설":
            return "itemGrade4";
        case "유물":
            return "itemGrade5";
        case "고대":
            return "itemGrade6";
        case "에스더":
            return "itemGrade7";
        default:
            return "#ffffff";
    }
};
