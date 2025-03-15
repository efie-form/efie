import { EXTERNAL_ACTION_TYPE, INTERNAL_ACTION_TYPE } from './constant';
import defaultSchema from './defaultSchema';
import type { BuilderCustomInput } from './types/builderCustomInput.type';
import type { FormSchema } from './types/formSchema.type';

interface BuilderExternalProps {
  id: string;
  height: number;
  formInputs?: BuilderCustomInput[];
  schema?: FormSchema;
}

export default class BuilderExternal {
  private parentElem: HTMLElement | undefined = undefined;
  private iframeElem: HTMLIFrameElement | undefined = undefined;
  private schema: FormSchema = defaultSchema;
  private isIframeReady = false;
  private formInputs: BuilderCustomInput[] | undefined = undefined;
  private height: number = 0;

  constructor({ id, formInputs, height, schema }: BuilderExternalProps) {
    const elem = document.querySelector(`#${id}`);
    if (!elem || !(elem instanceof HTMLElement)) {
      throw new Error(`Element with id ${id} not found`);
    }
    this.parentElem = elem;
    if (this.isIframeRendered()) return;

    if (formInputs) this.formInputs = formInputs;
    if (height) this.height = height;
    if (schema) this.schema = schema;

    this.renderIframe();
    this.listenMessage();
  }

  private isIframeRendered() {
    return (
      this.parentElem?.childElementCount &&
      this.parentElem?.childElementCount >= 1
    );
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

    this.postMessage(EXTERNAL_ACTION_TYPE.SET_HEIGHT, { height });
  }

  private listenMessage() {
    if (!this.iframeElem) return;
    if (globalThis.window === undefined) return;

    window.addEventListener('message', (event) => {
      this.iframeLoadedHandler(event);
      switch (event.data.type) {
        case INTERNAL_ACTION_TYPE.SET_DATA: {
          this.schema = event.data.data;
          break;
        }
      }
    });
  }

  private iframeLoadedHandler(event: MessageEvent) {
    if (event.data.type !== INTERNAL_ACTION_TYPE.LOADED) return;
    this.postMessage(EXTERNAL_ACTION_TYPE.INIT_DATA, {
      schema: this.schema,
      formInputs: this.formInputs,
      height: this.height,
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

    this.postMessage(EXTERNAL_ACTION_TYPE.RESET_DATA, data);
  }

  public setFormInputs(formInputs: BuilderCustomInput[]) {
    this.formInputs = formInputs;
    this.postMessage(EXTERNAL_ACTION_TYPE.SET_FORM_INPUTS, formInputs);
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
