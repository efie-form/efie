import { ACTION_TYPE } from './constant';
import type { FormSchema } from '../types/formSchema.type';
import defaultSchema from './defaultSchema';
import type { BuilderCustomInput } from '../types/builderCustomInput.type';

interface BuilderExternalProps {
  id: string;
  height: number;
  formInputs?: BuilderCustomInput[];
  onReady?: () => void;
}

export default class BuilderExternal {
  private parentElem: HTMLElement | undefined = undefined;
  private iframeElem: HTMLIFrameElement | undefined = undefined;
  private json: FormSchema = defaultSchema;
  private isIframeReady = false;
  private pendingSchema: FormSchema | undefined = undefined;
  private onReady: (() => void) | undefined = undefined;
  private formInputs: BuilderCustomInput[] | undefined = undefined;
  private height: number = 0;

  constructor({ id, onReady, formInputs, height }: BuilderExternalProps) {
    const elem = document.querySelector(`#${id}`);
    if (!elem || !(elem instanceof HTMLElement)) {
      throw new Error(`Element with id ${id} not found`);
    }
    this.parentElem = elem;
    this.onReady = onReady || undefined;
    this.formInputs = formInputs || undefined;
    this.height = height;
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
    if (this.height) {
      this.setHeight(this.height);
    }
    if (this.formInputs) {
      this.setFormInputs(this.formInputs);
    }
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
          if (this.formInputs) {
            this.postMessage(ACTION_TYPE.SET_FORM_INPUTS, this.formInputs);
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

  public setFormInputs(formInputs: BuilderCustomInput[]) {
    this.formInputs = formInputs;
    this.postMessage(ACTION_TYPE.SET_FORM_INPUTS, formInputs);
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
