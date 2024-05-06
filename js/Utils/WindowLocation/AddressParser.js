
const isValidIPv4 = (ip) => {
    const blocks = ip.split('.');
    if (blocks.length !== 4) {
        return false;
    }
    for (const block of blocks) {
        const numericBlock = parseInt(block, 10);
        if (!(numericBlock >= 0 && numericBlock <= 255)) {
            return false;
        }
    }
    return true;
}

const isValidIPv6 = (ip) => {
    const blocks = ip.split(':');
    if (blocks.length < 8) {
        return false;
    }
    for (const block of blocks) {
        if (!/^[0-9A-Fa-f]{1,4}$/.test(block)) {
            return false;
        }
    }
    return true;
}

export const isValidIP = (ip) => {
    return isValidIPv4(ip) || isValidIPv6(ip);
}

export const isHostNameValidIP = () => {
    return isValidIP(window.location.host);
}