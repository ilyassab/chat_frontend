import tinycolor from 'tinycolor2';

export default hash => {
    const [r, g, b] = hash
        .substr(-3,3)
        .split('')
        .map(char => char.charCodeAt(0) > 255 ? 255 : char.charCodeAt(0));
    const color = tinycolor({r, g, b});
    const colorLighten = tinycolor({r, g, b}).lighten(40);
    return {color: color.toHexString(), colorLighten: colorLighten.toHexString()};
};