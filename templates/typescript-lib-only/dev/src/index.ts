// src/index.ts

/**
 * Example Max 9 JavaScript (v8) script written in TypeScript.
 * This file will be compiled and copied to the Max project's /code folder after build.
 * You can load this in a Max patch using the [v8] object.
 */

// Inlet and outlet config
inlets = 1;
outlets = 1;

/**
 * This function is triggered for any message that doesn't have a named handler.
 * Try typing "hello" into a message box connected to your [v8] object.
 */
function anything() {
    const args = arrayfromargs(messagename, arguments);
    post("Received message:", args, "\n");
    outlet(0, "echo: " + args.join(" "));
}

/**
 * Max global functions available in v8:
 * - post("...")     → print to Max console
 * - outlet(i, msg)  → send message out of outlet
 * - jsarguments     → access arguments from object box
 */
post("Max v8 script loaded.\n");
