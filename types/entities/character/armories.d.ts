interface ArmoriesEntity {
    ArmoryProfile: ProfilesEntity;
    ArmoryEquipment: ArmoryEquipmentEntity[] | null;
    ArmoryAvatars: ArmoryAvatarsEntity[];
    ArmorySkills: ArmorySkillsEntity[];
    ArmoryEngraving: ArmoryEngravingEntity;
    ArmoryGem: ArmoryGemEntity;
    ArmoryCard: ArmoryCardEntity;
}
