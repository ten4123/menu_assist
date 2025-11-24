import { round } from 'remeda';
import { Slider } from '@components/slider';
import { useColorPickerContext } from '@components/color-picker/color-picker';
import { blendWithWhite, rgbaToCssString, rgbaToP3String } from '@lib/color';
const Alpha = (props) => {
    const { className, style } = props;
    const { colorSpace, color, onColorChange } = useColorPickerContext('Hue');
    const trackBg = {
        srgb: {
            transparent: rgbaToCssString(Object.assign(Object.assign({}, color), { a: 0 })),
            opaque: rgbaToCssString(Object.assign(Object.assign({}, color), { a: 1 })),
        },
        p3: {
            transparent: rgbaToP3String(Object.assign(Object.assign({}, color), { a: 0 })),
            opaque: rgbaToP3String(Object.assign(Object.assign({}, color), { a: 1 })),
        },
    };
    const thumbBg = {
        srgb: rgbaToCssString(blendWithWhite(color)),
        p3: rgbaToP3String(blendWithWhite(color)),
    };
    const handleValueChange = (value) => {
        onColorChange({ mode: 'rgb', value: Object.assign(Object.assign({}, color), { a: round(value[0] / 100, 2) }) });
    };
    return (<Slider aria-label="alpha" min={0} max={100} range={false} value={[color.a * 100]} onValueChange={handleValueChange} className={`fp-ColorPickerAlphaSlider fp-color-space-${colorSpace} ${className}`} style={Object.assign({ '--track-bg-transparent-srgb': trackBg.srgb.transparent, '--track-bg-opaque-srgb': trackBg.srgb.opaque, '--track-bg-transparent-p3': trackBg.p3.transparent, '--track-bg-opaque-p3': trackBg.p3.opaque, '--thumb-bg-srgb': thumbBg.srgb, '--thumb-bg-p3': thumbBg.p3 }, style)}/>);
};
export { Alpha };
