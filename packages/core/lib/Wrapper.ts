import { ACTION_TYPE } from '../constant';
import type { FormSchema } from '../types/formSchema.type';

interface WrapperProps {
  id: string;
}

export default class Wrapper {
  private parentElem;
  private iframeElem: HTMLIFrameElement | null = null;
  private onValueChange: ((value: FormSchema) => void) | null = null;
  json: FormSchema | null = null;

  constructor({ id }: WrapperProps) {
    this.parentElem = document.getElementById(id);
  }

  public init() {
    this.renderIframe();
    this.listenMessage();
  }

  private renderIframe() {
    if (!this.parentElem) return;

    const iframeElem = document.createElement('iframe');
    iframeElem.src = 'http://127.0.0.1:3001';
    iframeElem.width = '100%';
    iframeElem.height = '700px';
    this.iframeElem = iframeElem;
    this.parentElem.appendChild(iframeElem);
  }

  private listenMessage() {
    if (!this.iframeElem) return;
    if (typeof window === 'undefined') return;

    window.addEventListener('message', (event) => {
      this.jsonChangeHandler(event);
    });
  }

  private jsonChangeHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.SET_DATA) return;

    this.json = event.data.data;
    if (this.onValueChange) this.onValueChange(event.data.data);
  }

  public getValue() {
    if (!this.iframeElem) return;
    return this.json;
  }

  public setOnValueChange(cb: (value: FormSchema) => void) {
    this.onValueChange = cb;
  }

  public resetValue(data: FormSchema) {
    if (!this.iframeElem) return;

    this.json = data;
    this.iframeElem.contentWindow?.postMessage(
      {
        type: ACTION_TYPE.RESET_DATA,
        data,
      },
      '*'
    );
  }
}
