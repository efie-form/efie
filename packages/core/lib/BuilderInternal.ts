import type { FormSchema } from '../types/formSchema.type';
import { ACTION_TYPE } from '../constant';

export default class BuilderInternal {
  isLoaded = false;
  onDataReset: ((data: FormSchema) => void) | null = null;
  height: number | null = null;

  constructor() {}

  public setValue(value: FormSchema) {
    if (typeof window === 'undefined') return;

    this.postMessage(ACTION_TYPE.SET_DATA, value);
  }

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

  private dataResetHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.RESET_DATA) return;
    if (this.onDataReset) this.onDataReset(event.data.data);
  }

  private heightHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.SET_HEIGHT) return;
    this.height = event.data.data.height;
  }

  public setOnDataReset(cb: (data: FormSchema) => void) {
    this.onDataReset = cb;
  }

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
