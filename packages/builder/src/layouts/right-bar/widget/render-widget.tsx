import { WidgetFormat, type FormField, type Widget } from '@efie-form/core';
import TextWidget from './text-widget';
import NumberWidget from './number-widget';
import RangeWidget from './range-widget';
import SwitchWidget from './switch-widget';
import OptionsWidget from './options-widget';
import FourSideWidget from './four-side-widget';
import BoxShadowWidget from './box-shadow-widget';
import ColorWidget from './color-widget';
import SizeWidget from './size-widget';
import CountryWidget from './country-widget';

interface RenderWidgetsProps {
  widgets: Widget[];
  field: FormField;
}

export default function RenderWidgets({ widgets, field }: RenderWidgetsProps) {
  return (
    <>
      {widgets.map(widget => (
        <RenderWidget key={widget.name} widget={widget} field={field} />
      ))}
    </>
  );
}

interface RenderWidgetProps {
  widget: Widget;
  field: FormField;
}

function RenderWidget({ widget, field }: RenderWidgetProps) {
  switch (widget.format) {
    case WidgetFormat.TEXT: {
      return <TextWidget widget={widget} field={field} />;
    }
    case WidgetFormat.NUMBER: {
      return <NumberWidget widget={widget} />;
    }
    case WidgetFormat.RANGE: {
      return <RangeWidget widget={widget} />;
    }
    case WidgetFormat.SWITCH: {
      return <SwitchWidget widget={widget} field={field} />;
    }
    case WidgetFormat.OPTIONS: {
      return <OptionsWidget widget={widget} />;
    }
    case WidgetFormat.FOUR_SIDE: {
      return <FourSideWidget widget={widget} />;
    }
    case WidgetFormat.BOX_SHADOW: {
      return <BoxShadowWidget widget={widget} />;
    }
    case WidgetFormat.COLOR: {
      return <ColorWidget widget={widget} />;
    }
    case WidgetFormat.SIZE: {
      return <SizeWidget widget={widget} />;
    }
    case WidgetFormat.COUNTRY: {
      return <CountryWidget widget={widget} />;
    }
    default: {
      return;
    }
  }
}
