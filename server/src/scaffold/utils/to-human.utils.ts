export function toHumanUtils(name: string) {
    return name.replace(/(Service|Controller|Entity|Dto)$/, '');
}
