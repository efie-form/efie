import { useCallback, useRef } from 'react';
import { Input, Select, Switch } from '../../../components/form';
import type { PropSettingsButtonAction } from '../../../types/prop-settings.type';
import { useSchemaStore } from '../../../lib/state/schema.state';
import { isButtonActionValue, type PropertyDefinition, type PropValue, type PropValueButtonAction } from '@efie-form/core';

interface PropsSettingsButtonActionProps extends PropSettingsButtonAction {
  fieldId: string;
}

export default function PropsSettingsButtonAction({ fieldId, label, type }: PropsSettingsButtonActionProps) {
  const fieldProperty = useSchemaStore(
    useCallback(state => state.getFieldProperty(fieldId, type), [fieldId, type]),
  );
  const updateFieldProperty = useSchemaStore(state => state.updateFieldProperty);
  const value = getValue(fieldProperty?.value);
  const prevRef = useRef<Record<string, PropValueButtonAction>>({
    [value.action]: value,
  });

  const handleActionTypeChange = (newAction: string) => {
    let newValue: PropValueButtonAction;

    switch (newAction) {
      case 'submit': {
        newValue = {
          action: 'submit',
        };
        break;
      }
      case 'hyperlink': {
        const hyperlinkPrev = prevRef.current?.hyperlink;
        const isHyperlinkAction = hyperlinkPrev && hyperlinkPrev.action === 'hyperlink';
        newValue = {
          action: 'hyperlink',
          url: (isHyperlinkAction ? hyperlinkPrev.url : '') || '',
          target: (isHyperlinkAction ? hyperlinkPrev.target : '_self') || '_self',
        };
        break;
      }
      default: {
        throw new Error(`Unknown action type: ${newAction}`);
      }
    }

    prevRef.current = {
      ...prevRef.current,
      [newAction]: newValue,
    };

    updateFieldProperty(fieldId, {
      type,
      value: newValue,
    } as PropertyDefinition);
  };

  const handleUrlChange = (newUrl: string) => {
    if (value.action !== 'hyperlink') return;

    const hyperlinkValue = {
      action: 'hyperlink' as const,
      url: newUrl,
      target: value.target || '_self' as const,
    };

    prevRef.current = {
      ...prevRef.current,
      hyperlink: hyperlinkValue,
    };
    updateFieldProperty(fieldId, {
      type,
      value: hyperlinkValue,
    } as PropertyDefinition);
  };

  const handleOpenInNewTabChange = (checked: boolean) => {
    if (value.action !== 'hyperlink') return;

    const hyperlinkValue = {
      action: 'hyperlink' as const,
      url: value.url,
      target: checked ? '_blank' as const : '_self' as const,
    };

    prevRef.current = {
      ...prevRef.current,
      hyperlink: hyperlinkValue,
    };
    updateFieldProperty(fieldId, {
      type,
      value: hyperlinkValue,
    } as PropertyDefinition);
  };

  return (
    <>
      <div className="px-4 py-3.5">
        <div className="flex justify-between items-center">
          <div>
            <p className="typography-body3 text-neutral-800">{label}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Select
              value={value.action}
              onChange={handleActionTypeChange}
              options={[
                { value: 'submit', label: 'Submit' },
                { value: 'hyperlink', label: 'Hyperlink' },
              ]}
            />
          </div>
        </div>
        <div>
          {value.action === 'hyperlink' && (
            <div className="mt-4">
              <Input
                value={value.url}
                onChange={handleUrlChange}
                placeholder="Enter URL"
              />
              <div className="flex gap-3 justify-between items-center w-full mt-4">
                <label htmlFor={`openInNewTab-${fieldId}`} className="typography-body3 text-neutral-800 cursor-pointer">Open in new tab</label>
                <Switch
                  id={`openInNewTab-${fieldId}`}
                  checked={value.target === '_blank'}
                  onChange={handleOpenInNewTabChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-4">
        <div className="w-full border-t-[0.5px] border-neutral-400 h-[1px]" />
      </div>
    </>
  );
}

function getValue(value?: PropValue): PropValueButtonAction {
  if (isButtonActionValue(value)) return value;

  return { action: 'submit' };
}
