// types/max.d.ts

/**
 * Type definitions for the Max v8 JavaScript environment.
 * These declarations support Max 9 scripting with basic type safety and editor autocompletion.
 */

// Globals provided by the Max environment
declare var inlets: number;
declare var outlets: number;

declare const jsarguments: string[];
declare const messagename: string;

declare function outlet(index: number, message: string): void;
declare function post(...args: any[]): void;
declare function error(...args: any[]): void;
declare function messnamed(name: string, ...args: any[]): void;
declare function arrayfromargs(...args: any[]): any[];

// Max environment globals (for completeness)
declare const max: {
    clearmaxwindow(): void;
    bind: (symbol: string, handler: (...args: any[]) => void) => void;
    unbind: (symbol: string) => void;
};

// LiveAPI (partial typing for Max for Live)
declare class LiveAPI {
    constructor(pathOrFunction: string | (() => void), idOrPath?: number | string);

    path: string;
    id: number;
    mode: number;

    get(path: string): any;
    getcount(path: string): number;
    getselected(path: string): any;
    call(method: string, ...args: any[]): any;
    set(path: string, value: any): void;

    observe(path: string): void;
    unobserve(path: string): void;

    property: any;
    info: () => void;
}
