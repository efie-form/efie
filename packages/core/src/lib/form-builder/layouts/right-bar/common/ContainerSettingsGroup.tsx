import type { FormField } from '@lib/types/formSchema.type.ts';
import SettingsField4Sides from '../property-layouts/SettingsField4Sides';
import SettingsFieldBorder from '../property-layouts/SettingsFieldBorder';

interface ContainerSettingsGroupProps {
  field: FormField;
}

export default function ContainerSettingsGroup({
  field,
}: ContainerSettingsGroupProps) {
  return (
    <>
      <div className="px-4 py-2 bg-neutral-100 text-neutral-800 typography-body3 uppercase">
        Container
      </div>
      <SettingsField4Sides
        label="Margin"
        allSideLabel="All Sides"
        splitSides={[
          { key: 'props.container.margin.top', label: 'Top' },
          { key: 'props.container.margin.right', label: 'Right' },
          { key: 'props.container.margin.bottom', label: 'Bottom' },
          { key: 'props.container.margin.left', label: 'Left' },
        ]}
        field={field}
        divider
      />
      <SettingsField4Sides
        label="Padding"
        allSideLabel="All Sides"
        splitSides={[
          { key: 'props.container.padding.top', label: 'Top' },
          { key: 'props.container.padding.right', label: 'Right' },
          { key: 'props.container.padding.bottom', label: 'Bottom' },
          { key: 'props.container.padding.left', label: 'Left' },
        ]}
        field={field}
        divider
      />
      <SettingsFieldBorder
        label="Border"
        field={field}
        divider
        radiusKey="props.container.border.radius"
        colorKey="props.container.border.color"
        widthKey="props.container.border.width"
      />
    </>
  );
}
