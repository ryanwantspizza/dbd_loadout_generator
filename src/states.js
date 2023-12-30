import { atom } from 'recoil';

export const survivorPerksState = atom({
    key: 'survivorPerksState',
    default: []
});

export const survivorPerkTraitsState = atom({
    key: 'survivorPerkTraitsState',
    default: []
});

export const survivorsState = atom({
    key: 'survivorsState',
    default: []
});

export const survivorItemsState = atom({
    key: 'survivorItemsState',
    default: []
});

export const allowEmptySurvivorPerk = atom({
    key: 'allowEmptySurvivorPerk',
    default: true
});

export const noItemAllowedState = atom({
    key: 'noItemAllowedState',
    default: true
});

export const survivorItemAddOnsState = atom({
    key: 'survivorItemAddOnsState',
    default: []
});

export const noItemAddOnAllowedState = atom({
    key: 'noItemAddOnAllowedState',
    default: true
});

export const survivorOfferingsState = atom({
    key: 'survivorOfferingsState',
    default: []
});

export const noOfferingAllowedState = atom({
    key: 'noOfferingAllowedState',
    default: true
});

export const defaultEmptyAllowedState = atom({
    key: 'defaultEmptyAllowedState', // Unique key
    default: "not allowed", // Default value
});