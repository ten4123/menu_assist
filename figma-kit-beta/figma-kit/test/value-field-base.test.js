var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as ValueField from '@components/value-field//value-field-base';
const LABEL = 'test-field';
const INITIAL_VALUE = 30;
const user = userEvent.setup();
const formatter = {
    parse: (input) => {
        if (input.length > 0 && !isNaN(Number(input))) {
            return { valid: true, value: Number(input) };
        }
        return { valid: false };
    },
    format: (value) => `${value}`,
};
describe('given a basic field', () => {
    const VALID_VALUE = '40';
    const INVALID_VALUE = 'dogs';
    const TestControl = ({ onChange }) => {
        const [value, setValue] = useState(INITIAL_VALUE);
        const handleChange = (value) => {
            onChange === null || onChange === void 0 ? void 0 : onChange(value);
            setValue(value);
        };
        return <ValueField.Base aria-label={LABEL} value={value} onChange={handleChange} formatter={formatter}/>;
    };
    it('formats correctly', () => {
        const { getByLabelText } = render(<TestControl />);
        const field = getByLabelText(LABEL);
        expect(field).toHaveValue(formatter.format(INITIAL_VALUE));
    });
    it('saves on blur', () => __awaiter(void 0, void 0, void 0, function* () {
        const { getByLabelText } = render(<TestControl />);
        const field = getByLabelText(LABEL);
        yield user.type(field, VALID_VALUE);
        yield user.keyboard('{Tab}');
        expect(field).not.toHaveFocus();
        expect(field).toHaveValue(VALID_VALUE);
    }));
    it('reverts invalid values', () => __awaiter(void 0, void 0, void 0, function* () {
        const { getByLabelText } = render(<TestControl />);
        const field = getByLabelText(LABEL);
        yield user.type(field, INVALID_VALUE);
        yield user.keyboard('{Tab}');
        expect(field).not.toHaveFocus();
        expect(field).toHaveValue(formatter.format(INITIAL_VALUE));
    }));
    it('saves on Enter', () => __awaiter(void 0, void 0, void 0, function* () {
        const { getByLabelText } = render(<TestControl />);
        const field = getByLabelText(LABEL);
        yield user.type(field, VALID_VALUE);
        yield user.keyboard('{Enter}');
        expect(field).not.toHaveFocus();
        expect(field).toHaveValue(VALID_VALUE);
    }));
    it('reverts on Escape', () => __awaiter(void 0, void 0, void 0, function* () {
        const { getByLabelText } = render(<TestControl />);
        const field = getByLabelText(LABEL);
        yield user.type(field, VALID_VALUE);
        expect(field).toHaveValue(VALID_VALUE);
        yield user.keyboard('{Escape}');
        expect(field).not.toHaveFocus();
        expect(field).toHaveValue(formatter.format(INITIAL_VALUE));
    }));
    it("doesn't fire onChange when submitted value is the same", () => __awaiter(void 0, void 0, void 0, function* () {
        const changeHandler = vi.fn();
        const { getByLabelText } = render(<TestControl onChange={changeHandler}/>);
        const field = getByLabelText(LABEL);
        yield user.type(field, `${INITIAL_VALUE}`);
        yield user.keyboard('{Enter}');
        expect(changeHandler).not.toBeCalled();
    }));
    it.todo("doesn't close parent modal on Escape"); // feature unimplemented
    it.todo('increments correctly');
    it.todo('selects value on  click');
});
