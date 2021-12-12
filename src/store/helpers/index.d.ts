import { ComputedRef } from "vue";
import { StoreType } from "../vuex";

type StrSplit<T extends string> = T extends `${infer PreFix}/${infer Str}` 
? StrSplit<Str> extends [...infer Arr]
    ? [PreFix, ...Arr]
    : [Str]
: [T];


type GetStateType<S> = S extends (...args: any) => any ? ReturnType<S> : S;
type GetModulesProperty<
    ModuleKey extends keyof StoreType["modules"], 
    PropertyKey extends keyof StoreType["modules"][ModuleKey]
> = StoreType["modules"][ModuleKey][PropertyKey]
export function transformNamespaced<T extends string>(str: T): StrSplit<T>;

export function mapState<
    K extends (keyof GetStateType<StoreType["state"]>)[],
>(namspaced: K): {
    [k in keyof GetStateType<StoreType["state"]>]: ComputedRef<GetStateType<StoreType["state"]>[k]>
};

export function mapState<
    N extends keyof StoreType["modules"], 
    K extends (keyof GetStateType<GetModulesProperty<N, "state">>)[]
>(namspaced: N, keys: K) : {
    [k in keyof GetStateType<GetModulesProperty<N, "state">>]: ComputedRef<GetStateType<GetModulesProperty<N, "state">>[k]>
};
