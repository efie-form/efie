import type { FormSchema } from '../types/formSchema.type';
import { ACTION_TYPE } from '../constant';

export default class BuilderInternal {
  isLoaded = false;
  onDataReset: ((data: FormSchema) => void) | null = null;
  onDataRequest: () => FormSchema | null = () => null;
  height: number | null = null;

  constructor() {}

  /**
   * Replace the schema of the form builder
   *
   * @param value - The value of the form
   * @returns void
   */
  public setValue(value: FormSchema) {
    if (typeof window === 'undefined') return;

    this.postMessage(ACTION_TYPE.SET_DATA, value);
  }

  /**
   *
   * Initialize the event listener between the caller and the iframe
   *
   * @returns void
   */
  public init() {
    if (typeof window === 'undefined') return;
    if (this.isLoaded) return;
    this.isLoaded = true;

    window.addEventListener('message', (e) => {
      this.dataResetHandler(e);
      this.heightHandler(e);
    });

    this.postMessage(ACTION_TYPE.INIT, null);
  }

  public setOnDataRequest(cb: () => FormSchema) {
    this.onDataRequest = cb;
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
    this.height = event.data.data.height;
  }

  /**
   * Set the callback function to handle the data reset event
   *
   * @param cb - The callback function
   * @returns void
   */
  public setOnDataReset(cb: (data: FormSchema) => void) {
    this.onDataReset = cb;
  }

  /**
   * Send the loaded event to the caller
   *
   * @returns void
   */
  public loaded() {
    this.postMessage(ACTION_TYPE.LOADED, null);
  }

  /**
   * Send the message to the caller
   *
   * @param type - The type of the message
   * @param data - The data of the message
   * @returns void
   */
  private postMessage(type: string, data: any) {
    if (typeof window === 'undefined') return;
    window.parent.postMessage(
      {
        type,
        data,
      },
      '*'
    );
  }
}
