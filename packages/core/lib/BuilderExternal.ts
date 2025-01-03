import { ACTION_TYPE } from '../constant';
import type { FormSchema } from '../types/formSchema.type';

interface BuilderExternalProps {
  id: string;
}

export default class BuilderExternal {
  private parentElem;
  private iframeElem: HTMLIFrameElement | null = null;
  private onValueChange: ((value: FormSchema) => void) | null = null;
  private json: FormSchema | null = null;
  private height: number | null = null;

  constructor({ id }: BuilderExternalProps) {
    this.parentElem = document.getElementById(id);
  }

  public setHeight(height: number) {
    this.height = height;
    if (!this.iframeElem) return;
    this.iframeElem.style.height = `${height}px`;
    this.postMessage(ACTION_TYPE.SET_HEIGHT, { height });
  }

  public init() {
    this.renderIframe();
    this.listenMessage();
  }

  private renderIframe() {
    if (!this.parentElem) return;

    const iframeElem = document.createElement('iframe');
    iframeElem.src = 'http://localhost:3074';
    iframeElem.style.border = 'none';
    iframeElem.style.width = '100%';
    iframeElem.style.height = `${this.height}px`;
    this.iframeElem = iframeElem;
    this.parentElem.appendChild(iframeElem);
  }

  private listenMessage() {
    if (!this.iframeElem) return;
    if (typeof window === 'undefined') return;

    window.addEventListener('message', (event) => {
      this.jsonChangeHandler(event);
      this.iframeLoadedHandler(event);
    });
  }

  private iframeLoadedHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.INIT) return;
    console.log('iframe loaded', this.json);
    this.postMessage(ACTION_TYPE.RESET_DATA, this.json);
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
    this.json = data;

    if (!this.iframeElem) return;
    this.postMessage(ACTION_TYPE.RESET_DATA, data);
  }

  private postMessage(type: string, data: unknown) {
    if (!this.iframeElem) return;
    this.iframeElem.contentWindow?.postMessage(
      {
        type,
        data,
      },
      '*'
    );
  }
}
