const map = {
    "Y": "yyyy", // 1999
    "y": "yy", // 99
    "Y": "y", // 1999
    "F": "MMMM", // January
    "M": "MMM", // Jan
    "m": "MM", // 01
    "d": "dd", // 19
    "j": "d", // 
    "l": "EEEE", // Tuesday
    "D": "EEE", // Tue
    "D": "EE", // Tue
    "a": "a", // Am/PM
    "p": "p", // Am/PM
    "H": "HH", // 24-hour with leading zeros
    "G": "H", // 24-hour without leading zeros
    "h": "h", // 12-hour with leading zeros
    "g": "K", // 12-hour without leading zero
    "i": "mm", // Minutes with leading zeros
    "s": "ss", // Seconds, with leading zeros
    "T": "zz", // Timezone abbreviation
    "e": "zzzz", // Timezone
};

const unicode2PHP = formatStr => segments(formatStr)
    .reduce((string, segment) => {
        return string.replace(segment, map[segment] || "");
    }, formatStr);

const segments = formatStr => formatStr
    .split(new RegExp([" ", "-", "/", ":"].join('|'), ''))
    .sort(function (a, b) {
        return b.length - a.length; // ASC -> a - b; DESC -> b - a
    });

export default unicode2PHP;