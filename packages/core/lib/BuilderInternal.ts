import type { BuilderCustomInput } from '../types/builderCustomInput.type';
import type { FormSchema } from '../types/formSchema.type';
import { ACTION_TYPE } from './constant';

interface BuilderInternalProps {
  onDataReset: (data: FormSchema) => void;
  onDataRequest: () => FormSchema;
  onHeightChange: (height: number) => void;
  onFormInputsChange: (formInputs: BuilderCustomInput[]) => void;
}

export default class BuilderInternal {
  isLoaded = false;
  isInitialized = false;
  onDataReset: ((data: FormSchema) => void) | undefined = undefined;
  onDataRequest: (() => FormSchema) | undefined = undefined;
  onHeightChange: ((height: number) => void) | undefined = undefined;
  onFormInputsChange: ((formInputs: BuilderCustomInput[]) => void) | undefined =
    undefined;

  constructor(props: BuilderInternalProps) {
    this.onDataReset = props.onDataReset;
    this.onDataRequest = props.onDataRequest;
    this.onHeightChange = props.onHeightChange;
    this.onFormInputsChange = props.onFormInputsChange;
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
    });

    // Send INIT first to establish connection
    this.postMessage(ACTION_TYPE.INIT);
  }

  public loaded() {
    if (this.isLoaded) return;

    this.isLoaded = true;
    this.postMessage(ACTION_TYPE.LOADED);
  }

  public setValue(value: FormSchema) {
    if (globalThis.window === undefined || !this.isLoaded) return;
    this.postMessage(ACTION_TYPE.SET_DATA, value);
  }

  /**
   * Handle the data reset event
   *
   * @param event - The event
   * @returns void
   */
  private dataResetHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.RESET_DATA) return;
    if (this.onDataReset) this.onDataReset(event.data.data);
  }

  /**
   * Handle the height event
   *
   * @param event - The event
   * @returns void
   */
  private heightHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.SET_HEIGHT) return;
    if (this.onHeightChange) this.onHeightChange(event.data.data.height);
  }

  /**
   * Handle the form inputs event
   *
   * @param event - The event
   * @returns void
   */
  private formInputsHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.SET_FORM_INPUTS) return;
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
      '*'
    );
  }
}
