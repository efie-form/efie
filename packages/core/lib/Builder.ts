import { EXTERNAL_ACTION_TYPE, INTERNAL_ACTION_TYPE } from './constant';
import type { BuilderCustomInput } from './types/builder-custom-input.type';
import type { FormSchema } from './types/form-schema.type';

interface InitializedPayload {
  schema: FormSchema;
  formInputs: BuilderCustomInput[];
  height: number;
  formKeyNonEditable: boolean;
  inputNonReusable: boolean;
}

interface BuilderProps {
  onDataReset: (data: FormSchema) => void;
  onDataRequest: () => FormSchema;
  onHeightChange: (height: number) => void;
  onFormInputsChange: (formInputs: BuilderCustomInput[]) => void;
  onInitialized: (data: InitializedPayload) => void;
}

export default class Builder {
  isLoaded = false;
  isInitialized = false;
  onDataReset: ((data: FormSchema) => void) | undefined = undefined;
  onDataRequest: (() => FormSchema) | undefined = undefined;
  onHeightChange: ((height: number) => void) | undefined = undefined;
  onFormInputsChange: ((formInputs: BuilderCustomInput[]) => void) | undefined
    = undefined;

  onInitialized: ((data: InitializedPayload) => void) | undefined = undefined;
  isDataInitialized = false;

  constructor(props: BuilderProps) {
    this.onDataReset = props.onDataReset;
    this.onDataRequest = props.onDataRequest;
    this.onHeightChange = props.onHeightChange;
    this.onFormInputsChange = props.onFormInputsChange;
    this.onInitialized = props.onInitialized;
    this.init();
  }

  private init() {
    if (globalThis.window === undefined) return;
    if (this.isInitialized) return;

    this.isInitialized = true;
    window.addEventListener('message', (e) => {
      this.dataResetHandler(e);
      this.heightHandler(e);
      this.formInputsHandler(e);
      this.initializedHandler(e);
    });

    // Send INIT first to establish connection
    // wait for the outer window to be ready and send the initialized event
    this.postMessage(INTERNAL_ACTION_TYPE.LOADED);
  }

  public setValue(value: FormSchema) {
    if (globalThis.window === undefined || !this.isLoaded) return;
    this.postMessage(INTERNAL_ACTION_TYPE.SET_DATA, value);
  }

  private initializedHandler(event: MessageEvent) {
    if (
      event.data.type !== EXTERNAL_ACTION_TYPE.INIT_DATA
      || this.isDataInitialized
    )
      return;
    this.isDataInitialized = true;
    const payload = event.data.data as InitializedPayload;

    if (payload.schema && this.onDataRequest) {
      this.onDataRequest();
    }

    if (payload.formInputs && this.onFormInputsChange) {
      this.onFormInputsChange(payload.formInputs);
    }

    if (payload.height && this.onHeightChange) {
      this.onHeightChange(payload.height);
    }

    if (this.onInitialized) this.onInitialized(payload);
  }

  /**
   * Handle the data reset event
   *
   * @param event - The event
   * @returns void
   */
  private dataResetHandler(event: MessageEvent) {
    if (event.data.type !== EXTERNAL_ACTION_TYPE.RESET_DATA) return;
    if (this.onDataReset) this.onDataReset(event.data.data);
  }

  /**
   * Handle the height event
   *
   * @param event - The event
   * @returns void
   */
  private heightHandler(event: MessageEvent) {
    if (event.data.type !== EXTERNAL_ACTION_TYPE.SET_HEIGHT) return;
    if (this.onHeightChange) this.onHeightChange(event.data.data.height);
  }

  /**
   * Handle the form inputs event
   *
   * @param event - The event
   * @returns void
   */
  private formInputsHandler(event: MessageEvent) {
    if (event.data.type !== EXTERNAL_ACTION_TYPE.SET_FORM_INPUTS) return;
    if (this.onFormInputsChange) this.onFormInputsChange(event.data.data);
  }

  /**
   * Send the message to the caller
   *
   * @param type - The type of the message
   * @param data - The data of the message
   * @returns void
   */
  private postMessage(type: string, data?: unknown) {
    if (globalThis.window === undefined) return;
    window.parent.postMessage(
      {
        type,
        data,
      },
      '*',
    );
  }
}
