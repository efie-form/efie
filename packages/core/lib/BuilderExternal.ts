import defaultSchema from '../../editor/src/lib/defaultSchema';
import { ACTION_TYPE } from '../constant';
import type { FormSchema } from '../types/formSchema.type';

interface BuilderExternalProps {
  id: string;
  height: number;
}

export default class BuilderExternal {
  private parentElem: HTMLElement | null = null;
  private iframeElem: HTMLIFrameElement | null = null;
  private json: FormSchema = defaultSchema;
  private isIframeReady = false;
  private pendingSchema: FormSchema | null = null;
  private onReady: (() => void) | null = null;

  constructor({ id, onReady }: { id: string; onReady?: () => void }) {
    this.parentElem = document.getElementById(id);
    this.onReady = onReady || null;
    this.init();
  }

  public init() {
    if (
      !this.parentElem ||
      (this.parentElem?.childElementCount &&
        this.parentElem?.childElementCount >= 1)
    )
      return;

    this.renderIframe();
    this.listenMessage();
  }

  private renderIframe() {
    this.iframeElem = document.createElement('iframe');
    this.iframeElem.src = 'http://localhost:3074';
    this.iframeElem.style.border = 'none';
    this.iframeElem.style.width = '100%';
    this.iframeElem.style.height = '100%';
    this.parentElem?.appendChild(this.iframeElem);
  }

  public setHeight(height: number) {
    if (!this.iframeElem || !this.parentElem) return;

    this.parentElem.style.height = `${height}px`;

    this.postMessage(ACTION_TYPE.SET_HEIGHT, { height });
  }

  private listenMessage() {
    if (!this.iframeElem) return;
    if (typeof window === 'undefined') return;

    window.addEventListener('message', (event) => {
      this.jsonChangeHandler(event);
      this.iframeLoadedHandler(event);

      // Handle LOADED event
      if (event.data.type === ACTION_TYPE.LOADED) {
        this.onReady?.();
      }
    });
  }

  private iframeLoadedHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.INIT) return;

    this.isIframeReady = true;

    // If there's a pending schema, send it now
    if (this.pendingSchema) {
      setTimeout(() => {
        this.postMessage(ACTION_TYPE.RESET_DATA, this.pendingSchema);
        this.pendingSchema = null;
      }, 0);
    } else {
      setTimeout(() => {
        this.postMessage(ACTION_TYPE.RESET_DATA, this.json);
      }, 0);
    }
  }

  private jsonChangeHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.SET_DATA) return;

    this.json = event.data.data;
  }

  public getValue() {
    return this.json;
  }

  public loadSchema(data: FormSchema) {
    this.json = data;
    console.log('loadSchema', data, this.iframeElem, this.isIframeReady);

    if (!this.iframeElem) return;

    if (!this.isIframeReady) {
      this.pendingSchema = data;
      return;
    }

    setTimeout(() => {
      this.postMessage(ACTION_TYPE.RESET_DATA, data);
    }, 0);
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
