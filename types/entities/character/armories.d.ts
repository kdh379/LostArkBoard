interface ArmoriesEntity {
    ArmoryProfile: ProfilesEntity;
    ArmoryEquipment: ArmoryEquipmentEntity[] | null;
    ArmoryAvatars: ArmoryAvatarsEntity[];
    ArmorySkills: ArmorySkillEntity[];
    ArmoryEngraving: ArmoryEngravingEntity;
    ArmoryGem: ArmoryGemEntity;
    ArmoryCard: ArmoryCardEntity;
}
