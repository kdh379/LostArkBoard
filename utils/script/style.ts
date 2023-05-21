export const getQualityColor = (quality: number) => {
    if (quality < 30) return "#ffe81d";
    else if (quality < 70) return "#2ab1f6";
    else if (quality < 90) return "#00b0fa";
    else if (quality < 100) return "#8045dd";
    else return "#f9ae00";
};

export const CARD_PADDING = {
    paddingTop: "0.9rem",
    paddingBottom: "0.9rem",
    paddingLeft: "0.8rem",
    paddingRight: "0.8rem",
};
