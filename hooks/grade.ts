import gradeStyle from "./_grade.module.scss";

const getArmorGradeStyle = (grade: string) => {
    switch (grade) {
        case "에스더":
            return gradeStyle["grade__icon--7"];
        case "고대":
            return gradeStyle["grade__icon--6"];
        case "유물":
            return gradeStyle["grade__icon--5"];
        case "전설":
            return gradeStyle["grade__icon--4"];
        case "영웅":
            return gradeStyle["grade__icon--3"];
        case "희귀":
            return gradeStyle["grade__icon--2"];
        case "고급":
            return gradeStyle["grade__icon--1"];
        default:
            return "";
    }
};

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

export const useGradeColor = (grade: string) => {
    return {
        color: getGradeColorHex(grade),
        style: getArmorGradeStyle(grade),
    };
};
