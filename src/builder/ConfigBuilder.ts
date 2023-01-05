import EventEmitter from 'eventemitter3';
import { merge } from 'lodash-es';
import { BehaviorSubject, Observable } from 'rxjs';
export type PropertyChangeEventCallback<T> = <K extends keyof T>(
  k: K,
  t: T[K],
  context?: { value: T }
) => void;

const WATCH_EVERY_CHANGE = Symbol('on_any_property_change');

export class ConfigBuilder<T extends object> {
  private conf$ = new BehaviorSubject<object>({});
  private eventEmitter = new EventEmitter<
    string | symbol,
    { source: object }
  >();

  getConfAsObservable(): Observable<T> {
    return this.conf$ as any;
  }

  setInit(t: Partial<T>) {
    this.setProperties(t);
  }

  setProperties<K extends keyof T>(t: Partial<T>) {
    const newConf = merge({}, this.conf$.value, t);
    this.conf$.next(newConf);
    Object.keys(t).map((v) => {
      this.eventEmitter.emit(v, v, (t as any)[v] as T[K], {
        source: merge({}, t),
      });
    });
    this.eventEmitter.emit(WATCH_EVERY_CHANGE, { source: merge({}, t) });
    return this;
  }

  getProperties<K extends keyof T>(k: K[]) {
    const value = this.conf$;
    return Object.fromEntries(k.map((v) => [v, (value as any)?.[v] as T[K]]));
  }

  getAllProperties(): T {
    const { value } = this.conf$;
    return { ...value } as T;
  }

  addAnyPropertyChangeEventListener(cb: Action<{ source: T }>) {
    this.eventEmitter.on(WATCH_EVERY_CHANGE as any as string, cb);
    return this;
  }

  addPropertyChangeEventListener<K extends keyof T>(
    k: K | symbol,
    cb: PropertyChangeEventCallback<T>
  ) {
    this.eventEmitter.on(k as string, cb);
    return this;
  }

  removeAnyPropertyChangeEventListener(cb: Action<{ source: T }>) {
    this.eventEmitter.off(WATCH_EVERY_CHANGE as any as string, cb);
    return this;
  }

  removePropertyChangeEventListener<K extends keyof T>(
    k: K | symbol,
    cb: PropertyChangeEventCallback<T>
  ) {
    this.eventEmitter.off(k as string, cb);
    return this;
  }
}
