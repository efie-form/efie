export { default as Iframe } from './iframe';
export { default as Builder } from './builder';
export type {
  FormSchema,
} from './types/form-schema.type';
export type { RootRule } from './types/root-rule.type';
export type { CustomInputDef } from './types/builder-custom-input.type';
export type { PropertyDefinition } from './types/property-definition';

export type {
  FieldCondition,
  FieldConditionGroup,
  FieldConditionValue,
  FieldConditionOperator,
  FieldValue,
  ValidationOperator,
  ValidationRule,
  ValidationGroup,
  ValidationCondition,
  ValidationCase,
  ValidationSchema,
} from './types/field-conditions.type';

export type {
  BaseFormField,
  FileFormField,
  ImageFormField,
  ButtonFormField,
  PageFormField,
  DividerFormField,
  RowFormField,
  ColumnFormField,
  BlockFormField,
  HeadingFormField,
  DateFormField,
  TimeFormField,
  DateTimeFormField,
  SingleChoiceFormField,
  MultipleChoiceFormField,
  ShortTextFormField,
  LongTextFormField,
  NumberFormField,
  FormField,
  FormInputField,
} from './types/form-field.type';

export { FieldType } from './constants/field-type';
export { PropertyType, SizeUnit, SizeType } from './constants/form-schema.constant';

export {
  marginToStyle,
  paddingToStyle,
  borderRadiusToStyle,
  boxShadowToStyle,
  widthToStyle,
  textAlignToStyle,
  colorToStyle,
  fontSizeToStyle,
  sizeToStyle,
  toSize,
} from './utils/props-parse';

export {
  type BgColorProperty,
  type ColorProperty,
  type FontSizeProperty,
  type SrcProperty,
  type AltProperty,
  type ObjectFitProperty,
  type HeightProperty,
  type MarginProperty,
  type PaddingProperty,
  type MaxFilesProperty,
  type BoxShadowProperty,
  type BorderRadiusProperty,
  type BorderStyleProperty,
  type LabelProperty,
  type PlaceholderProperty,
  type RequiredProperty,
  type AcceptProperty,
  type OptionsProperty,
  type WidthProperty,
  type TextAlignProperty,
  type ContentProperty,
  type PageNameProperty,
} from './types/property-definition';

export type {
  Color,
  ColorHsla,
  ColorRgba,
  SizeAuto,
  SizeLength,
  SizePercentage,
  SizeInitial,
  SizeInherit,
  WidthHeightSize,
  MarginSize,
  PaddingSize,
  Size,
  FontSize,
  SizeAbsolute,
  SizeRelative,
  BoxShadow,
} from './types/common.type';

export {
  isStringValue,
  isColorValue,
  isNumberValue,
  isBooleanValue,
  isWidthValue,
  isBorderRadiusValue,
  isBoxShadowValue,
  isSizeValue,
  isAcceptValue,
  isMarginValue,
  isPaddingValue,
  isOptionsValue,
  isButtonActionValue,
  isSize,
  isColor,
} from './utils/value-validator';

export type {
  PropValue,
  PropValueAccept,
  PropValueColor,
  PropValueString,
  PropValueNumber,
  PropValueBoolean,
  PropValueBorderRadius,
  PropValueBoxShadow,
  PropValueSize,
  PropValueMargin,
  PropValuePadding,
  PropValueOptions,
  BorderRadius,
  PropValueButtonAction,
  PropValueJsonContent,
} from './types/field-property-value.type';

export { getColorObject, hslaToHex, rgbaToHex } from './utils/colors';

export { default as validateSchema } from './utils/validations';
