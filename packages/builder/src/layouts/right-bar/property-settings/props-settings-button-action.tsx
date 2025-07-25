import {
  FieldType,
  isButtonActionValue,
  isStringValue,
  type PropertyDefinition,
  PropertyType,
  type PropValue,
  type PropValueButtonAction,
} from '@efie-form/core';
import { useRef } from 'react';
import { Input, Select, Switch } from '../../../components/form';
import { useSchemaStore } from '../../../lib/state/schema.state';
import type { PropSettingsButtonAction } from '../../../types/prop-settings.type';

interface PropsSettingsButtonActionProps extends PropSettingsButtonAction {
  fieldId: string;
}

const ACTION_OPTIONS = [
  { value: 'submit', label: 'Submit' },
  { value: 'hyperlink', label: 'Hyperlink' },
  { value: 'navigate', label: 'Navigate' },
];

function getDefaultValue(value?: PropValue): PropValueButtonAction {
  if (value && isButtonActionValue(value)) {
    return value;
  }
  return { action: 'submit' };
}

function createHyperlinkValue(
  url: string,
  target: '_blank' | '_self' = '_self',
): PropValueButtonAction {
  return { action: 'hyperlink', url, target };
}

function createNavigateValue(pageId: string): PropValueButtonAction {
  return { action: 'navigate', pageId };
}

function createSubmitValue(): PropValueButtonAction {
  return { action: 'submit' };
}

export default function PropsSettingsButtonAction({
  fieldId,
  label,
  type,
}: PropsSettingsButtonActionProps) {
  const fieldProperty = useSchemaStore((state) => state.getFieldProperty(fieldId, type));
  const updateFieldProperty = useSchemaStore((state) => state.updateFieldProperty);
  const schema = useSchemaStore((state) => state.schema);

  const value = getDefaultValue(fieldProperty?.value);

  // Page options to avoid recalculation on every render
  const pageOptions = schema.form.fields
    .filter((field) => field.type === FieldType.PAGE)
    .map((page) => {
      const pageNameProp = page.props?.find((prop) => prop.type === PropertyType.PAGE_NAME);
      const pageName = isStringValue(pageNameProp?.value) ? pageNameProp.value : `Page ${page.id}`;
      return { value: page.id, label: pageName };
    });

  // Store previous values to restore when switching between action types
  const prevValuesRef = useRef<Record<string, PropValueButtonAction>>({
    [value.action]: value,
  });

  const updateProperty = (newValue: PropValueButtonAction) => {
    prevValuesRef.current = {
      ...prevValuesRef.current,
      [newValue.action]: newValue,
    };

    updateFieldProperty(fieldId, {
      type,
      value: newValue,
    } as PropertyDefinition);
  };

  const handleActionTypeChange = (newAction: string) => {
    let newValue: PropValueButtonAction;

    switch (newAction) {
      case 'submit': {
        newValue = createSubmitValue();
        break;
      }
      case 'hyperlink': {
        const previousHyperlink = prevValuesRef.current.hyperlink;
        const url = previousHyperlink?.action === 'hyperlink' ? previousHyperlink.url : '';
        const target =
          previousHyperlink?.action === 'hyperlink' ? previousHyperlink.target : '_self';
        newValue = createHyperlinkValue(url, target);
        break;
      }
      case 'navigate': {
        const previousNavigate = prevValuesRef.current.navigate;
        const pageId = previousNavigate?.action === 'navigate' ? previousNavigate.pageId : '';
        newValue = createNavigateValue(pageId);
        break;
      }
      default: {
        throw new Error(`Unknown action type: ${newAction}`);
      }
    }

    updateProperty(newValue);
  };

  const handleUrlChange = (newUrl: string) => {
    if (value.action !== 'hyperlink') return;

    const newValue = createHyperlinkValue(newUrl, value.target);
    updateProperty(newValue);
  };

  const handlePageIdChange = (newPageId: string) => {
    if (value.action !== 'navigate') return;

    const newValue = createNavigateValue(newPageId);
    updateProperty(newValue);
  };

  const handleOpenInNewTabChange = (checked: boolean) => {
    if (value.action !== 'hyperlink') return;

    const target = checked ? '_blank' : '_self';
    const newValue = createHyperlinkValue(value.url, target);
    updateProperty(newValue);
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex items-center justify-between">
          <p className="typography-body3 text-neutral-800">{label}</p>
          <div>
            <Select
              value={value.action}
              onChange={handleActionTypeChange}
              options={ACTION_OPTIONS}
            />
          </div>
        </div>

        {value.action === 'hyperlink' && (
          <div className="mt-4 space-y-4">
            <Input value={value.url} onChange={handleUrlChange} placeholder="Enter URL" />
            <div className="flex items-center justify-between">
              <label
                htmlFor={`openInNewTab-${fieldId}`}
                className="typography-body3 cursor-pointer text-neutral-800"
              >
                Open in new tab
              </label>
              <Switch
                id={`openInNewTab-${fieldId}`}
                checked={value.target === '_blank'}
                onChange={handleOpenInNewTabChange}
              />
            </div>
          </div>
        )}

        {value.action === 'navigate' && (
          <div className="mt-4 flex items-center gap-2">
            <p className="typography-body3 whitespace-nowrap text-neutral-800">Navigate to: </p>
            <div>
              <Select value={value.pageId} onChange={handlePageIdChange} options={pageOptions} />
            </div>
          </div>
        )}
      </div>

      <div className="mx-4">
        <div className="h-[1px] w-full border-neutral-400 border-t-[0.5px]" />
      </div>
    </>
  );
}
