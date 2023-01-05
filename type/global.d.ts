declare type Pair<T, K> = [T, K];
declare type Action<T> = (t: T) => void;
declare type Func<T, K> = (t: T) => K;
declare type NoParamsFuncWithReturn<K> = () => K;
