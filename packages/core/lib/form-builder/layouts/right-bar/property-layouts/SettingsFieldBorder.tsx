import { useSchemaStore } from '../../../lib/state/schema.state';
import ColorPicker from '../../../components/form/ColorPicker';
import SettingsField4Sides from './SettingsField4Sides';
import SettingsFieldSwitchWithDropdown from './SettingsFieldSwitchWithDropdown';
import type { FormField } from '../../../../types/formSchema.type.ts';
import Number from '../../../components/form/Number';
import type { FieldPropsKey } from '../../../lib/genFieldKey';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

type ExtractUnionEndingWith<
  T extends string,
  Suffix extends string,
> = T extends `${string}${Suffix}` ? T : never;

interface SettingsFieldBorderProps {
  label: string;
  field: FormField;
  divider?: boolean;
  colorKey: FieldPropsKey;
  widthKey: FieldPropsKey;
  radiusKey: ExtractUnionEndingWith<FieldPropsKey, '.radius'>;
}

function SettingsFieldBorder({
  label,
  field,
  divider,
  colorKey,
  widthKey,
  radiusKey,
}: SettingsFieldBorderProps) {
  const { getFieldProps } = useSchemaStore();
  const [width, setWidth] = useControllableState({
    prop: getFieldProps(field.id, widthKey),
    onChange: (newValue) => {
      updateFieldProps(field.id, widthKey, newValue);
    },
  });
  const { updateFieldProps } = useSchemaStore();

  return (
    <>
      <SettingsFieldSwitchWithDropdown
        isOpen={width > 0}
        onOpenChange={(isOpen) => {
          setWidth(isOpen ? 1 : 0);
        }}
        label={label}
        divider={divider}
      >
        <div className="">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <p className="typography-body3 text-neutral-800 mb-2">Width</p>
              <Number
                value={width}
                onChange={(newValue) => {
                  updateFieldProps(field.id, widthKey, newValue);
                }}
                suffix="px"
                suffixType="text"
              />
            </div>
            <div>
              <p className="typography-body3 text-neutral-800 mb-2">Color</p>
              <ColorPicker
                value={getFieldProps(field.id, colorKey)}
                onChange={(newValue) => {
                  updateFieldProps(field.id, colorKey, newValue);
                }}
              />
            </div>
          </div>

          <SettingsField4Sides
            className="mt-4"
            label="Radius"
            allSideLabel="All Corners"
            splitSides={[
              { key: `${radiusKey}.topLeft`, label: 'Top Left' },
              { key: `${radiusKey}.topRight`, label: 'Top Right' },
              { key: `${radiusKey}.bottomRight`, label: 'Bottom Right' },
              { key: `${radiusKey}.bottomLeft`, label: 'Bottom Left' },
            ]}
            field={field}
            noPadding
          />
        </div>
      </SettingsFieldSwitchWithDropdown>
    </>
  );
}

export default SettingsFieldBorder;
