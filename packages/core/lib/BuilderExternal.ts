import defaultSchema from '../../editor/src/lib/defaultSchema';
import { ACTION_TYPE } from '../constant';
import type { FormSchema } from '../types/formSchema.type';

// interface BuilderExternalProps {
//   id: string;
//   height: number;
// }

export default class BuilderExternal {
  private parentElem: HTMLElement | undefined = undefined;
  private iframeElem: HTMLIFrameElement | undefined = undefined;
  private json: FormSchema = defaultSchema;
  private isIframeReady = false;
  private pendingSchema: FormSchema | undefined = undefined;
  private onReady: (() => void) | undefined = undefined;

  constructor({ id, onReady }: { id: string; onReady?: () => void }) {
    const elem = document.querySelector(`#${id}`);
    if (!elem || !(elem instanceof HTMLElement)) {
      throw new Error(`Element with id ${id} not found`);
    }
    this.parentElem = elem;
    this.onReady = onReady || undefined;
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
    this.parentElem?.append(this.iframeElem);
  }

  public setHeight(height: number) {
    if (!this.iframeElem || !this.parentElem) return;

    this.parentElem.style.height = `${height}px`;

    this.postMessage(ACTION_TYPE.SET_HEIGHT, { height });
  }

  private listenMessage() {
    if (!this.iframeElem) return;
    if (globalThis.window === undefined) return;

    window.addEventListener('message', (event) => {
      switch (event.data.type) {
        case ACTION_TYPE.INIT: {
          this.isIframeReady = true;
          if (this.pendingSchema) {
            this.postMessage(ACTION_TYPE.RESET_DATA, this.pendingSchema);
            this.pendingSchema = undefined;
          }

          break;
        }
        case ACTION_TYPE.SET_DATA: {
          this.json = event.data.data;

          break;
        }
        case ACTION_TYPE.LOADED: {
          this.onReady?.();

          break;
        }
        // No default
      }
    });
  }

  public getValue() {
    return this.json;
  }

  public loadSchema(data: FormSchema) {
    console.log('loadSchema', data, this.iframeElem);
    this.json = data;

    if (!this.iframeElem) {
      return;
    }

    if (!this.isIframeReady) {
      this.pendingSchema = data;
      return;
    }

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
