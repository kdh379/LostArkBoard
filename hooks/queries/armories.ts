import { useQuery } from "@tanstack/react-query";
import { getArmories } from "utils/api/armories";
import { getAPIInfo } from "utils/api/path";

interface ArmoriesArgs {
    characterName: string;
}

export function useArmories(args: ArmoriesArgs) {
    console.log(args.characterName);

    return useQuery({
        queryKey: [
            getAPIInfo("character.armories", {
                characterName: args.characterName,
            }),
        ],
        queryFn: () => getArmories(args.characterName),
    });
}
