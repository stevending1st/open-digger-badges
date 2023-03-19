export enum BadgeStyleType {
    PLASTIC = 'plastic',
    FLAT = 'flat',
    FLAT_SQUARE = 'flat-square',
    FOR_THE_BADGE = 'for-the-badge',
    SOCIAL = 'social',
}

export const badgeStyleList = [{ value: "", label: "--Please choose a style--" }, ...Object.entries(BadgeStyleType).map(([label, value]) => ({ label, value: value as string }))]
