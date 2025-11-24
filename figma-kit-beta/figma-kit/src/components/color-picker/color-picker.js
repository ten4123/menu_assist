import { useState } from 'react';
import { createContext } from '@lib/react/create-context';
import { hslaToHex, hsvaToHex, rgbaToHex, hslaToHsva, hslaToRgba, hsvaToHsla, hsvaToRgba, rgbaToHsla, rgbaToHsva, } from '@lib/color';
import { useControllableState } from '@lib/react/use-controllable-state';
const DEFAULT_COLOR = { r: 0, g: 0, b: 0, a: 1 };
const DEFAULT_MODELS = ['hex', 'rgb', 'hsl', 'hsv'];
const [ColorPickerContextProvider, useColorPickerContext] = createContext('ColorPicker');
const Root = (props) => {
    var _a, _b, _c, _d;
    const { colorSpace, models = DEFAULT_MODELS, defaultActiveModel, activeModel: activeModelProp, onActiveModelChange, defaultColor, color: colorProp, onColorChange, children, } = props;
    validateModelProps(activeModelProp, defaultActiveModel, models);
    const [color = DEFAULT_COLOR, setColor] = useControllableState({
        prop: colorProp,
        defaultProp: defaultColor,
        onChange: onColorChange,
    });
    const [activeModel = models[0], setActiveModel] = useControllableState({
        prop: activeModelProp,
        defaultProp: defaultActiveModel,
        onChange: onActiveModelChange,
    });
    const [editingColorsByModel, setEditingColorsByModel] = useState({});
    const colorsByModel = {
        hsv: (_a = editingColorsByModel.hsv) !== null && _a !== void 0 ? _a : rgbaToHsva(color),
        hsl: (_b = editingColorsByModel.hsl) !== null && _b !== void 0 ? _b : rgbaToHsla(color),
        rgb: (_c = editingColorsByModel.rgb) !== null && _c !== void 0 ? _c : color,
        hex: (_d = editingColorsByModel.hex) !== null && _d !== void 0 ? _d : rgbaToHex(color),
    };
    // TODO: Rethink when adding OKLCH
    const hue = colorsByModel.hsv.h;
    const handleColorChange = (params) => {
        const { mode, value } = params;
        if (mode === 'rgb') {
            setEditingColorsByModel({
                rgb: value,
                hsv: rgbaToHsva(value),
                hsl: rgbaToHsla(value),
                hex: rgbaToHex(value),
            });
            setColor(value);
        }
        else if (mode === 'hsv') {
            setEditingColorsByModel({
                hsv: value,
                hsl: hsvaToHsla(value),
                rgb: hsvaToRgba(value),
                hex: hsvaToHex(value),
            });
            setColor(hsvaToRgba(value));
        }
        else if (mode === 'hsl') {
            setEditingColorsByModel({
                hsv: hslaToHsva(value),
                hsl: value,
                rgb: hslaToRgba(value),
                hex: hslaToHex(value),
            });
            setColor(hslaToRgba(value));
        }
    };
    return (<ColorPickerContextProvider colorSpace={colorSpace} models={models} activeModel={activeModel} onActiveModelChange={setActiveModel} color={color} onColorChange={handleColorChange} hue={hue} colorsByModel={colorsByModel}>
      {children}
    </ColorPickerContextProvider>);
};
function validateModelProps(activeModel, defaultActiveModel, models) {
    if (models.length === 0) {
        throw new Error("The 'models' prop must contain at least one color model. Omit the 'models' prop entirely to use default models.");
    }
    if (activeModel && !models.includes(activeModel)) {
        throw new Error(`Invalid 'activeModel': '${activeModel}' is not present in the 'models' array. Make sure 'activeModel' matches a model name in 'models'.`);
    }
    if (defaultActiveModel && !models.includes(defaultActiveModel)) {
        throw new Error(`Invalid 'defaultActiveModel': '${defaultActiveModel}' is not present in the 'models' array. Make sure 'activeModel' matches a model name in 'models'.`);
    }
}
export { Root, useColorPickerContext };
