import { EXTERNAL_MESSAGE_TYPE, INTERNAL_MESSAGE_TYPE } from './constants/message-types';
import defaultSchema from './default-schema';
import type { CustomInputDef } from './types/builder-custom-input.type';
import type { FormSchema } from './types/form-schema.type';

interface IframeProps {
  id: string;
  height: number;
  formInputs?: CustomInputDef[];
  schema?: FormSchema;
  formKeyNonEditable?: boolean;
  inputNonReusable?: boolean;
  maxHistories?: number;
}

export default class Builder {
  private parentElem: HTMLElement | undefined = undefined;
  private iframeElem: HTMLIFrameElement | undefined = undefined;
  private schema: FormSchema = defaultSchema;
  private isIframeReady = false;
  private formInputs: CustomInputDef[] | undefined = undefined;
  private formKeyNonEditable = false;
  private inputNonReusable = true;
  private height: number = 0;
  private maxHistories?: number;

  constructor({
    id,
    formInputs,
    height,
    schema,
    formKeyNonEditable,
    inputNonReusable,
    maxHistories,
  }: IframeProps) {
    const elem = document.querySelector(`#${id}`);
    if (!elem || !(elem instanceof HTMLElement)) {
      throw new Error(`Element with id ${id} not found`);
    }
    this.parentElem = elem;
    if (this.isIframeRendered()) return;

    if (formInputs) this.formInputs = formInputs;
    if (height) this.height = height;
    if (schema) this.schema = schema;
    this.formKeyNonEditable = !!formKeyNonEditable;
    this.inputNonReusable = !!inputNonReusable;
    if (maxHistories) this.maxHistories = maxHistories;

    this.renderIframe();
    this.listenMessage();
  }

  private isIframeRendered() {
    return this.parentElem?.childElementCount && this.parentElem?.childElementCount >= 1;
  }

  public init() {
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

    this.postMessage(EXTERNAL_MESSAGE_TYPE.SET_HEIGHT, { height });
  }

  private listenMessage() {
    if (!this.iframeElem) return;
    if (globalThis.window === undefined) return;

    window.addEventListener('message', (event) => {
      this.iframeLoadedHandler(event);
      switch (event.data.type) {
        case INTERNAL_MESSAGE_TYPE.SET_DATA: {
          this.schema = event.data.data;
          break;
        }
      }
    });
  }

  private iframeLoadedHandler(event: MessageEvent) {
    if (event.data.type !== INTERNAL_MESSAGE_TYPE.LOADED) return;
    this.postMessage(EXTERNAL_MESSAGE_TYPE.INIT_DATA, {
      schema: this.schema,
      formInputs: this.formInputs,
      height: this.height,
      formKeyNonEditable: this.formKeyNonEditable,
      inputNonReusable: this.inputNonReusable,
      maxHistories: this.maxHistories,
    });
  }

  public getValue() {
    return this.schema;
  }

  public loadSchema(data: FormSchema) {
    this.schema = data;

    if (!this.iframeElem) {
      return;
    }

    if (!this.isIframeReady) {
      return;
    }

    this.postMessage(EXTERNAL_MESSAGE_TYPE.RESET_DATA, data);
  }

  public setFormInputs(formInputs: CustomInputDef[]) {
    this.formInputs = formInputs;
    this.postMessage(EXTERNAL_MESSAGE_TYPE.SET_FORM_INPUTS, formInputs);
  }

  private postMessage(type: string, data: unknown) {
    if (!this.iframeElem) return;
    this.iframeElem.contentWindow?.postMessage(
      {
        type,
        data,
      },
      '*',
    );
  }
}
