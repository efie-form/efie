import type { FormSchema } from '../types/formSchema.type';
import { ACTION_TYPE } from '../constant';

interface BuilderInternalProps {
  onDataReset: (data: FormSchema) => void;
  onDataRequest: () => FormSchema;
  onHeightChange: (height: number) => void;
}

export default class BuilderInternal {
  isLoaded = false;
  onDataReset: ((data: FormSchema) => void) | null = null;
  onDataRequest: () => FormSchema | null = () => null;
  onHeightChange: ((height: number) => void) | null = null;

  constructor(props: BuilderInternalProps) {
    this.onDataReset = props.onDataReset;
    this.onDataRequest = props.onDataRequest;
    this.onHeightChange = props.onHeightChange;
    this.init();
  }

  public init() {
    if (typeof window === 'undefined') return;
    if (this.isLoaded) return;

    window.addEventListener('message', (e) => {
      this.dataResetHandler(e);
      this.heightHandler(e);
    });

    // Send INIT first to establish connection
    this.postMessage(ACTION_TYPE.INIT, null);
  }

  public loaded() {
    if (this.isLoaded) return;

    this.isLoaded = true;
    this.postMessage(ACTION_TYPE.LOADED, null);
  }

  public setValue(value: FormSchema) {
    if (typeof window === 'undefined' || !this.isLoaded) return;
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
    console.log('dataResetHandler', event.data.data);
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
