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