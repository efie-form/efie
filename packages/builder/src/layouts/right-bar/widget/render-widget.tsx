import { WidgetType, type Widget } from '@efie-form/core';
import TextWidget from './text-widget';

interface RenderWidgetProps {
  widget: Widget;
}

export default function RenderWidget({ widget }: RenderWidgetProps) {
  switch (widget.type) {
    case WidgetType.TEXT: {
      return <TextWidget widget={widget} />;
    }
  }
}
