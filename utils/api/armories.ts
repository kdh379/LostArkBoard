import { request } from "./request";

export const getArmories = (characterName: string) => {
    return request({
        apiPathKey: "character.armories",
        params: { characterName },
    });
};
