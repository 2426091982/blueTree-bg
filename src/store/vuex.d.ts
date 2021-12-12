import { DispatchOptions, CommitOptions } from "vuex";
import { storeOptions } from "./index";

export type StoreType = typeof storeOptions;



type AddPrefix<Prefix, Keys> = `${Prefix & string}/${Keys & string}`;

declare module "vuex" {

    type AddModuleActionKeys<Module, Prefix> = Module extends { modules: infer M }
    ? AddPrefix<Prefix, GetModulesActionsKey<M>>
    : never;
    type GetActionsKey<Module> = Module extends { actions: infer A } ? keyof A : never;
    type GetModuleAction<Module, Prefix> = AddPrefix<Prefix, GetActionsKey<Module>> | AddModuleActionKeys<Module, Prefix> | GetActionsKey<Module>;
    type GetModulesActionsKey<Module> = {
        [k in keyof Module]: GetModuleAction<Module[k], k>
    }[keyof Module];
    type DispatchType = GetActionsKey<StoreType> | GetModulesActionsKey<StoreType["modules"]>;

    export interface Dispatch {
        (type: DispatchType, payload: any, options?: DispatchOptions): Promise<any>
    }

    type AddModuleMutationKeys<Module, Prefix> = Module extends { modules: infer M }
    ? AddPrefix<Prefix, GetModulesMutationsKey<M>>
    : never;
    type GetModuleMutations<Module, Prefix> = AddPrefix<Prefix, GetMutationsKey<Module>>
    type GetModulesMutationsKey<Module> = {
        [k in keyof Module]: GetModuleMutations<Module[k], k>
    }[keyof Module];
    type GetMutationsKey<Module> = Module extends { mutations: infer M } ? keyof M : never;
    type CommitType = GetMutationsKey<StoreType> | GetModulesMutationsKey<StoreType["modules"]>;
    export interface Commit {
        (type: CommitType, payload: any, options?: CommitOptions): void;
    }
}
