export function uuid()
{
    return Math.floor((new Date() / 1) + (Math.random() * 0x10000000000)).toString(16);
}
