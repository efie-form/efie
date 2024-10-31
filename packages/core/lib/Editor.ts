import type { FormSchema } from '../types/formSchema.type';
import { ACTION_TYPE } from '../constant';

export default class Editor {
  isLoaded = false;
  onDataReset: ((data: FormSchema) => void) | null = null;

  constructor() {}

  public setValue(value: FormSchema) {
    if (typeof window === 'undefined') return;

    window.parent.postMessage(
      {
        type: ACTION_TYPE.SET_DATA,
        data: value,
      },
      '*'
    );
  }

  public init() {
    if (typeof window === 'undefined') return;
    if (this.isLoaded) return;
    this.isLoaded = true;

    window.addEventListener('message', (e) => {
      this.dataResetHandler(e);
    });
  }

  private dataResetHandler(event: MessageEvent) {
    if (event.data.type !== ACTION_TYPE.RESET_DATA) return;
    if (this.onDataReset) this.onDataReset(event.data.data);
  }

  public setOnDataReset(cb: (data: FormSchema) => void) {
    this.onDataReset = cb;
  }
}
