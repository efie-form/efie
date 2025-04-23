import { WidgetType, type Widget } from '@efie-form/core';
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

interface RenderWidgetProps {
  widget: Widget;
}

export default function RenderWidget({ widget }: RenderWidgetProps) {
  switch (widget.type) {
    case WidgetType.TEXT: {
      return <TextWidget widget={widget} />;
    }
    case WidgetType.NUMBER: {
      return <NumberWidget widget={widget} />;
    }
    case WidgetType.RANGE: {
      return <RangeWidget widget={widget} />;
    }
    case WidgetType.SWITCH: {
      return <SwitchWidget widget={widget} />;
    }
    case WidgetType.OPTIONS: {
      return <OptionsWidget widget={widget} />;
    }
    case WidgetType.FOUR_SIDE: {
      return <FourSideWidget widget={widget} />;
    }
    case WidgetType.BOX_SHADOW: {
      return <BoxShadowWidget widget={widget} />;
    }
    case WidgetType.COLOR: {
      return <ColorWidget widget={widget} />;
    }
    case WidgetType.SIZE: {
      return <SizeWidget widget={widget} />;
    }
    case WidgetType.COUNTRY: {
      return <CountryWidget widget={widget} />;
    }
    default: {
      return;
    }
  }
}
