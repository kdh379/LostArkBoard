import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/api/request";

interface ArmoriesArgs {
    characterName: string;
}

export function useArmories(args: ArmoriesArgs) {
    return useQuery({
        queryKey: ["character.armories", args.characterName],
        queryFn: () =>
            request({
                key: "character.armories",
                params: args,
            }),
    });
}
