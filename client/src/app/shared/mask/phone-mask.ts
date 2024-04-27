import type { MaskitoOptions, MaskitoPreprocessor } from '@maskito/core';
import {
  maskitoAddOnFocusPlugin,
  maskitoCaretGuard,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';

export default {
  mask: [
    '+',
    '8',
    '4',
    ' ',
    '(',
    /\d/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
  ],
  postprocessors: [
    // non-removable country prefix
    maskitoPrefixPostprocessorGenerator('+84 '),
  ],
  preprocessors: [createCompletePhoneInsertionPreprocessor()],
  plugins: [
    maskitoAddOnFocusPlugin('+84 '),
    maskitoRemoveOnBlurPlugin('+84 '),
    // Forbids to put caret before non-removable country prefix
    // But allows to select all value!
    maskitoCaretGuard((value, [from, to]) => [
      from === to ? '+84 '.length : 0,
      value.length,
    ]),
  ],
} as MaskitoOptions;

// Paste "89123456789" => "+7 (912) 345-67-89"
function createCompletePhoneInsertionPreprocessor(): MaskitoPreprocessor {
  const trimPrefix = (value: string): string =>
    value.replace(/(^\+?84(\D*0)?|^0)|\D/g, '');
  const countDigits = (value: string): number =>
    value.replace(/\D/g, '').length;

  return ({ elementState, data }) => {
    const { value, selection } = elementState;
    console.log(countDigits(value), value, trimPrefix(value));
    return {
      elementState: {
        selection,
        value: countDigits(value) > 10 ? trimPrefix(value) : value,
      },
      data: countDigits(data) >= 10 ? trimPrefix(data) : data,
    };
  };
}
