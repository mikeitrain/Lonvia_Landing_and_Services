(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__69b81b._.js", {

"[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": (()=>addMessageListener),
    "connectHMR": (()=>connectHMR),
    "sendMessage": (()=>sendMessage)
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
}}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_esm__({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)");
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/src/lib/utils.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "cn": (()=>cn),
    "formatDate": (()=>formatDate),
    "formatTime": (()=>formatTime),
    "routeToBasePage": (()=>routeToBasePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(dateString, language = 'de') {
    if (!dateString) return '';
    const date = new Date(dateString);
    const locale = language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB';
    const timeZone = language === 'ro' ? 'Europe/Bucharest' : language === 'de' ? 'Europe/Berlin' : 'Europe/London';
    return date.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: timeZone
    });
}
function formatTime(dateString, language = 'de') {
    if (!dateString) return '';
    const date = new Date(dateString);
    const locale = language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB';
    const timeZone = language === 'ro' ? 'Europe/Bucharest' : language === 'de' ? 'Europe/Berlin' : 'Europe/London';
    return date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timeZone
    });
}
function routeToBasePage(groups) {
    if (groups.includes('admin')) {
        return '/admin/panel';
    } else if (groups.includes('doctor')) {
        return '/doctor/panel';
    } else if (groups.includes('patient')) {
        return '/user/profile';
    }
    return '/user/profile';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/common/Button.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/class-variance-authority/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary-500 text-white shadow hover:bg-primary-600 active:bg-primary-700",
            destructive: "bg-error-500 text-white shadow-sm hover:bg-error-600 active:bg-error-700",
            outline: "border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 hover:text-neutral-900",
            secondary: "bg-secondary-500 text-white shadow-sm hover:bg-secondary-600 active:bg-secondary-700",
            ghost: "hover:bg-neutral-100 hover:text-neutral-900",
            link: "text-primary-600 underline-offset-4 hover:underline bg-transparent p-0"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/common/Button.tsx",
        lineNumber: 47,
        columnNumber: 13
    }, this);
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_refresh__.register(_c, "Button$React.forwardRef");
__turbopack_refresh__.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/landing-page/card.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border bg-card text-card-foreground shadow-box", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/landing-page/card.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.forwardRef(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/landing-page/card.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.forwardRef(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/landing-page/card.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.forwardRef(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/landing-page/card.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.forwardRef(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/landing-page/card.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.forwardRef(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/landing-page/card.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_refresh__.register(_c, "Card$React.forwardRef");
__turbopack_refresh__.register(_c1, "Card");
__turbopack_refresh__.register(_c2, "CardHeader$React.forwardRef");
__turbopack_refresh__.register(_c3, "CardHeader");
__turbopack_refresh__.register(_c4, "CardTitle$React.forwardRef");
__turbopack_refresh__.register(_c5, "CardTitle");
__turbopack_refresh__.register(_c6, "CardDescription$React.forwardRef");
__turbopack_refresh__.register(_c7, "CardDescription");
__turbopack_refresh__.register(_c8, "CardContent$React.forwardRef");
__turbopack_refresh__.register(_c9, "CardContent");
__turbopack_refresh__.register(_c10, "CardFooter$React.forwardRef");
__turbopack_refresh__.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/lonvia-labs/questionnaire.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>LonviaLabsQuestionnaire)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/common/Button.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/landing-page/card.tsx [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
const AgeInput = ({ id, label, value, onChange })=>{
    const handleChange = (event)=>{
        const nextValue = event.target.value;
        if (/^\d*$/.test(nextValue)) {
            onChange(nextValue);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lonvia-age-input",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "input-container",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    id: id,
                    value: value,
                    onChange: handleChange,
                    required: true,
                    placeholder: " ",
                    inputMode: "numeric",
                    className: "age-field w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10552E] focus:border-transparent"
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: id,
                    className: "label text-gray-600",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "underline"
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
};
_c = AgeInput;
function LonviaLabsQuestionnaire() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedDirection, setSelectedDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isCompleted, setIsCompleted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Check for category parameter in URL and auto-select direction
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LonviaLabsQuestionnaire.useEffect": ()=>{
            const category = router.query.category;
            if (category && !selectedDirection) {
                setSelectedDirection(category);
                setCurrentQuestionIndex(0);
                setAnswers({});
            }
        }
    }["LonviaLabsQuestionnaire.useEffect"], [
        router.query.category,
        selectedDirection
    ]);
    const directions = [
        {
            id: "hormones",
            title: "Hormone Optimization",
            description: "Testosterone, Growth Hormone, Thyroid optimization",
            icon: "⚡",
            color: "from-blue-500 to-blue-600"
        },
        {
            id: "aesthetics",
            title: "Aesthetic Enhancement",
            description: "Hair loss treatment, skin health, anti-aging",
            icon: "✨",
            color: "from-pink-500 to-pink-600"
        },
        {
            id: "metabolic",
            title: "Metabolic Health",
            description: "Weight management, diabetes, metabolic optimization",
            icon: "⚖️",
            color: "from-green-500 to-green-600"
        },
        {
            id: "mental",
            title: "Mental Health",
            description: "Cognitive enhancement, stress management, mood optimization",
            icon: "🧠",
            color: "from-purple-500 to-purple-600"
        },
        {
            id: "longevity",
            title: "Longevity & Anti-Aging",
            description: "Peptide therapy, NAD+ therapy, cellular health",
            icon: "🧬",
            color: "from-indigo-500 to-indigo-600"
        },
        {
            id: "sexual",
            title: "Sexual Health",
            description: "ED treatment, libido enhancement, performance optimization",
            icon: "❤️",
            color: "from-red-500 to-red-600"
        },
        {
            id: "performance",
            title: "Athletic Performance",
            description: "Recovery optimization, performance enhancement, injury prevention",
            icon: "🏃‍♂️",
            color: "from-orange-500 to-orange-600"
        },
        {
            id: "wellness",
            title: "Sleep & Wellness",
            description: "Sleep optimization, recovery, general wellness",
            icon: "😴",
            color: "from-teal-500 to-teal-600"
        }
    ];
    // Comprehensive questionnaire data with 10-15 questions each
    const questionnaireData = {
        hormones: [
            // Q1: Age (required first question)
            {
                id: "age",
                question: "What is your age?",
                type: "age-input",
                required: true,
                label: "Age"
            },
            // Q2: Gender (required second question)
            {
                id: "gender",
                question: "What is your biological sex?",
                type: "multiple-choice",
                options: [
                    "Male",
                    "Female",
                    "Intersex",
                    "Prefer not to say"
                ],
                required: true,
                isGenderQuestion: true
            },
            // Q3: Primary concern
            {
                id: "primary_concern",
                question: "What is your primary hormone-related concern?",
                type: "multiple-choice",
                options: [
                    "Low energy/fatigue",
                    "Low libido/sexual dysfunction",
                    "Weight gain/difficulty losing weight",
                    "Mood changes/depression",
                    "Sleep issues",
                    "Muscle loss/weakness",
                    "Memory/cognitive issues",
                    "Other"
                ],
                required: true
            },
            // Q4: Duration of symptoms
            {
                id: "symptom_duration",
                question: "How long have you been experiencing these symptoms?",
                type: "multiple-choice",
                options: [
                    "Less than 3 months",
                    "3-6 months",
                    "6-12 months",
                    "1-2 years",
                    "More than 2 years"
                ],
                required: true
            },
            // Q5: Male-specific - Erectile function
            {
                id: "erectile_function",
                question: "Have you experienced changes in erectile function or morning erections?",
                type: "multiple-choice",
                options: [
                    "No changes",
                    "Slight decrease in morning erections",
                    "Significant decrease in morning erections",
                    "Difficulty achieving erections",
                    "Difficulty maintaining erections",
                    "Complete loss of erectile function"
                ],
                required: true,
                visibleForGenders: [
                    "Male",
                    "Intersex"
                ]
            },
            // Q6: Female-specific - Menstrual cycle
            {
                id: "menstrual_status",
                question: "What is your current menstrual status?",
                type: "multiple-choice",
                options: [
                    "Regular cycles",
                    "Irregular cycles",
                    "Perimenopausal (changing cycles)",
                    "Menopausal (no period for 12+ months)",
                    "Postmenopausal",
                    "Pregnant or breastfeeding",
                    "Not applicable"
                ],
                required: true,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q7: Energy levels
            {
                id: "energy_levels",
                question: "How would you rate your current energy levels compared to 2-3 years ago?",
                type: "multiple-choice",
                options: [
                    "Significantly decreased",
                    "Moderately decreased",
                    "Slightly decreased",
                    "No change",
                    "Improved"
                ],
                required: true
            },
            // Q8: Body composition changes
            {
                id: "body_composition",
                question: "Have you noticed changes in body composition?",
                type: "checkbox",
                options: [
                    "Increased abdominal/visceral fat",
                    "Loss of muscle mass",
                    "Difficulty building muscle",
                    "Overall weight gain",
                    "No notable changes"
                ],
                required: true
            },
            // Q9: Sleep quality
            {
                id: "sleep_quality",
                question: "How is your sleep quality?",
                type: "multiple-choice",
                options: [
                    "Excellent - feel refreshed",
                    "Good - occasional issues",
                    "Fair - frequent disruptions",
                    "Poor - rarely feel rested",
                    "Very poor - chronic insomnia"
                ],
                required: true
            },
            // Q10: Previous hormone testing
            {
                id: "previous_testing",
                question: "Have you had hormone testing in the past 12 months?",
                type: "multiple-choice",
                options: [
                    "Yes - comprehensive hormone panel",
                    "Yes - basic testosterone/estrogen only",
                    "Yes - thyroid panel only",
                    "No previous testing",
                    "Unsure"
                ],
                required: true
            },
            // Q11: Current medications
            {
                id: "current_medications",
                question: "Are you currently taking any of the following medications or supplements?",
                type: "checkbox",
                options: [
                    "Antidepressants (SSRIs, SNRIs)",
                    "Blood pressure medications",
                    "Statins or cholesterol medications",
                    "Diabetes medications",
                    "Thyroid medications",
                    "Hormone replacement therapy",
                    "Testosterone/anabolic steroids",
                    "DHEA or other hormone supplements",
                    "None of the above"
                ],
                required: true
            },
            // Q12: Medical history
            {
                id: "medical_history",
                question: "Do you have any of the following medical conditions?",
                type: "checkbox",
                options: [
                    "Diabetes or prediabetes",
                    "High blood pressure",
                    "High cholesterol",
                    "Heart disease",
                    "Thyroid disorder",
                    "Depression or anxiety",
                    "Sleep apnea",
                    "Prostate issues",
                    "PCOS or endometriosis",
                    "None of the above"
                ],
                required: true
            },
            // Q13: Lifestyle factors
            {
                id: "lifestyle",
                question: "Which lifestyle factors apply to you?",
                type: "checkbox",
                options: [
                    "Regular exercise (3+ times/week)",
                    "High stress job or life situation",
                    "Poor sleep (<6 hours/night)",
                    "Current smoker",
                    "Regular alcohol use (>7 drinks/week)",
                    "Shift work or irregular schedule",
                    "Optimized diet and nutrition"
                ],
                required: true
            },
            // Q14: Treatment goals
            {
                id: "treatment_goals",
                question: "What are your primary goals for hormone optimization?",
                type: "checkbox",
                options: [
                    "Restore energy and vitality",
                    "Improve sexual function and libido",
                    "Enhance cognitive performance",
                    "Support body composition/muscle mass",
                    "Stabilize mood and mental health",
                    "Improve sleep quality",
                    "Optimize long-term health and longevity"
                ],
                required: true
            },
            // Q15: Willingness for lab testing
            {
                id: "lab_willingness",
                question: "Are you willing to complete baseline lab testing before starting treatment?",
                type: "yes-no",
                required: true
            }
        ],
        aesthetics: [
            // Q1: Age (required first question)
            {
                id: "age",
                question: "What is your age?",
                type: "age-input",
                required: true,
                label: "Age"
            },
            // Q2: Gender (required second question)
            {
                id: "gender",
                question: "What is your biological sex?",
                type: "multiple-choice",
                options: [
                    "Male",
                    "Female",
                    "Intersex",
                    "Prefer not to say"
                ],
                required: true,
                isGenderQuestion: true
            },
            // Q3: Primary aesthetic concern
            {
                id: "primary_concern",
                question: "What is your primary aesthetic focus?",
                type: "multiple-choice",
                options: [
                    "Hair loss/thinning",
                    "Skin aging and wrinkles",
                    "Acne or acne scarring",
                    "Pigmentation issues",
                    "Body contouring/fat reduction",
                    "Facial volume loss",
                    "Other aesthetic concerns"
                ],
                required: true
            },
            // Q4: Hair loss specific - Pattern (shown for hair loss concern)
            {
                id: "hair_loss_pattern",
                question: "If experiencing hair loss, describe the pattern:",
                type: "multiple-choice",
                options: [
                    "Receding hairline at temples",
                    "Thinning at crown/vertex",
                    "Diffuse thinning overall",
                    "Patchy hair loss (alopecia areata)",
                    "Widening part line",
                    "Postpartum hair loss",
                    "Not applicable - no hair loss"
                ],
                required: false
            },
            // Q5: Male-specific - Family history of hair loss
            {
                id: "family_hair_loss_male",
                question: "Do male relatives (father, brothers, uncles) have significant hair loss?",
                type: "multiple-choice",
                options: [
                    "Yes - father and/or brothers",
                    "Yes - uncles or grandfather",
                    "Yes - multiple relatives",
                    "No family history",
                    "Unsure"
                ],
                required: false,
                visibleForGenders: [
                    "Male",
                    "Intersex"
                ]
            },
            // Q6: Female-specific - Hormonal factors
            {
                id: "hormonal_factors_female",
                question: "Have you experienced any of the following?",
                type: "checkbox",
                options: [
                    "Irregular menstrual cycles",
                    "PCOS (Polycystic Ovary Syndrome)",
                    "Thyroid disorder",
                    "Recent pregnancy or childbirth",
                    "Currently breastfeeding",
                    "Significant weight changes",
                    "None of the above"
                ],
                required: false,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q7: Duration of aesthetic concern
            {
                id: "concern_duration",
                question: "How long have you been experiencing your primary aesthetic concern?",
                type: "multiple-choice",
                options: [
                    "Less than 6 months",
                    "6-12 months",
                    "1-2 years",
                    "2-5 years",
                    "More than 5 years"
                ],
                required: true
            },
            // Q8: Previous treatments
            {
                id: "previous_treatments",
                question: "Have you tried any of the following treatments?",
                type: "checkbox",
                options: [
                    "Minoxidil (Rogaine)",
                    "Finasteride/Dutasteride",
                    "PRP (Platelet-Rich Plasma)",
                    "Microneedling",
                    "Prescription retinoids",
                    "Chemical peels or laser treatments",
                    "Hair transplant",
                    "Injectable fillers or Botox",
                    "None of the above"
                ],
                required: true
            },
            // Q9: Skin type
            {
                id: "skin_type",
                question: "How would you describe your skin type?",
                type: "multiple-choice",
                options: [
                    "Very fair - burns easily",
                    "Fair - burns sometimes",
                    "Medium - tans gradually",
                    "Olive - tans easily",
                    "Brown - rarely burns",
                    "Dark brown/Black - very rarely burns"
                ],
                required: true
            },
            // Q10: Sun exposure
            {
                id: "sun_exposure",
                question: "How much sun exposure do you typically get?",
                type: "multiple-choice",
                options: [
                    "Minimal - mostly indoors, always use SPF",
                    "Moderate - some outdoor time, regular SPF use",
                    "High - frequent outdoor activities with SPF",
                    "High - frequent outdoor activities without SPF",
                    "Very high - outdoor work/lifestyle"
                ],
                required: true
            },
            // Q11: Current skincare routine
            {
                id: "skincare_routine",
                question: "What describes your current skincare routine?",
                type: "multiple-choice",
                options: [
                    "Comprehensive - medical grade products",
                    "Regular - basic cleansing and moisturizing",
                    "Minimal - occasional care",
                    "None - no routine",
                    "Unsure what I should be doing"
                ],
                required: true
            },
            // Q12: Medications affecting skin/hair
            {
                id: "medications",
                question: "Are you taking any medications that might affect skin or hair?",
                type: "checkbox",
                options: [
                    "Blood thinners",
                    "Chemotherapy or immunosuppressants",
                    "Hormone therapies (birth control, HRT)",
                    "Accutane or isotretinoin",
                    "Corticosteroids",
                    "Antidepressants",
                    "None of the above"
                ],
                required: true
            },
            // Q13: Medical history relevant to aesthetics
            {
                id: "medical_history",
                question: "Do you have any of these conditions?",
                type: "checkbox",
                options: [
                    "Autoimmune disease",
                    "Thyroid disorder",
                    "Diabetes",
                    "Anemia or iron deficiency",
                    "Vitamin D deficiency",
                    "History of keloid scarring",
                    "Active skin infections or conditions",
                    "None of the above"
                ],
                required: true
            },
            // Q14: Treatment goals
            {
                id: "treatment_goals",
                question: "What are your primary aesthetic goals?",
                type: "checkbox",
                options: [
                    "Stop or slow hair loss",
                    "Regrow lost hair",
                    "Reduce wrinkles and fine lines",
                    "Improve skin texture and tone",
                    "Address pigmentation issues",
                    "Prevent further aging",
                    "Improve overall appearance and confidence"
                ],
                required: true
            },
            // Q15: Budget and commitment
            {
                id: "commitment",
                question: "Are you willing to commit to a long-term treatment plan (6-12+ months)?",
                type: "yes-no",
                required: true
            }
        ],
        metabolic: [
            // Q1: Age (required first question)
            {
                id: "age",
                question: "What is your age?",
                type: "age-input",
                required: true,
                label: "Age"
            },
            // Q2: Gender (required second question)
            {
                id: "gender",
                question: "What is your biological sex?",
                type: "multiple-choice",
                options: [
                    "Male",
                    "Female",
                    "Intersex",
                    "Prefer not to say"
                ],
                required: true,
                isGenderQuestion: true
            },
            // Q3: Current height and weight (BMI calculation)
            {
                id: "height_weight",
                question: "Please provide your approximate height and weight:",
                type: "text",
                required: true
            },
            // Q4: Primary metabolic goal
            {
                id: "primary_goal",
                question: "What is your primary metabolic health goal?",
                type: "multiple-choice",
                options: [
                    "Weight loss and fat reduction",
                    "Improve insulin sensitivity/blood sugar",
                    "Reverse or manage metabolic syndrome",
                    "Build lean muscle mass",
                    "Improve energy and metabolism",
                    "Address cholesterol/lipid levels"
                ],
                required: true
            },
            // Q5: Desired weight loss
            {
                id: "weight_loss_goal",
                question: "If weight loss is a goal, how much would you like to lose?",
                type: "multiple-choice",
                options: [
                    "5-15 lbs (2-7 kg)",
                    "15-30 lbs (7-14 kg)",
                    "30-50 lbs (14-23 kg)",
                    "50-100 lbs (23-45 kg)",
                    "More than 100 lbs (45+ kg)",
                    "Not applicable - weight loss not primary goal"
                ],
                required: false
            },
            // Q6: Previous weight loss attempts
            {
                id: "previous_attempts",
                question: "What weight management strategies have you tried?",
                type: "checkbox",
                options: [
                    "Calorie restriction/counting",
                    "Low-carb or ketogenic diet",
                    "Intermittent fasting",
                    "Commercial diet programs (WeightWatchers, etc.)",
                    "GLP-1 medications (Ozempic, Wegovy, etc.)",
                    "Bariatric surgery",
                    "Personal trainer or structured program",
                    "None of the above"
                ],
                required: true
            },
            // Q7: Metabolic conditions
            {
                id: "metabolic_conditions",
                question: "Have you been diagnosed with any of the following?",
                type: "checkbox",
                options: [
                    "Type 2 diabetes",
                    "Prediabetes or insulin resistance",
                    "High blood pressure (hypertension)",
                    "High cholesterol or triglycerides",
                    "Fatty liver disease (NAFLD)",
                    "Sleep apnea",
                    "PCOS (women)",
                    "Metabolic syndrome",
                    "None of the above"
                ],
                required: true
            },
            // Q8: Blood sugar monitoring
            {
                id: "blood_sugar_monitoring",
                question: "Do you currently monitor your blood sugar?",
                type: "multiple-choice",
                options: [
                    "Yes - continuous glucose monitor (CGM)",
                    "Yes - regular finger stick testing",
                    "Yes - periodic lab testing only",
                    "No current monitoring",
                    "Not applicable"
                ],
                required: true
            },
            // Q9: Current medications
            {
                id: "current_medications",
                question: "Are you currently taking any of these medications?",
                type: "checkbox",
                options: [
                    "Metformin or other diabetes medications",
                    "GLP-1 medications (Ozempic, Wegovy, Mounjaro)",
                    "Insulin",
                    "Blood pressure medications",
                    "Statins or cholesterol medications",
                    "Thyroid medications",
                    "None of the above"
                ],
                required: true
            },
            // Q10: Eating patterns
            {
                id: "eating_patterns",
                question: "Which best describes your current eating pattern?",
                type: "multiple-choice",
                options: [
                    "Mediterranean or whole foods based",
                    "High protein, structured meals",
                    "Standard diet with regular eating out",
                    "High carbohydrate, frequent snacking",
                    "Irregular meals, skip breakfast",
                    "Shift work or night eating",
                    "Emotional or stress eating"
                ],
                required: true
            },
            // Q11: Physical activity
            {
                id: "physical_activity",
                question: "What is your current level of physical activity?",
                type: "multiple-choice",
                options: [
                    "Sedentary - mostly sitting, minimal movement",
                    "Light activity - 1-2 days/week",
                    "Moderate - 3-4 days/week of exercise",
                    "Active - 5+ days/week structured exercise",
                    "Very active - daily intensive training"
                ],
                required: true
            },
            // Q12: Female-specific - Hormonal factors
            {
                id: "hormonal_factors",
                question: "Have you experienced any hormonal changes?",
                type: "checkbox",
                options: [
                    "PCOS or irregular cycles",
                    "Recent pregnancy or postpartum",
                    "Perimenopause or menopause",
                    "Thyroid issues",
                    "Hormone therapy use",
                    "Not applicable"
                ],
                required: false,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q13: Recent lab work
            {
                id: "recent_labs",
                question: "Have you had any of these tests in the past 6 months?",
                type: "checkbox",
                options: [
                    "Fasting glucose and insulin",
                    "HbA1c (average blood sugar)",
                    "Lipid panel (cholesterol)",
                    "Thyroid panel",
                    "Liver function tests",
                    "Comprehensive metabolic panel",
                    "None of the above"
                ],
                required: true
            },
            // Q14: Support system
            {
                id: "support_system",
                question: "Do you have support for making metabolic health changes?",
                type: "multiple-choice",
                options: [
                    "Yes - dedicated medical team or coach",
                    "Yes - family and friends support",
                    "Some - limited support network",
                    "No - doing this alone",
                    "Prefer not to say"
                ],
                required: true
            },
            // Q15: Willingness for testing
            {
                id: "lab_willingness",
                question: "Are you willing to complete comprehensive lab testing to guide your treatment?",
                type: "yes-no",
                required: true
            }
        ],
        mental: [
            // Q1: Age (required first question)
            {
                id: "age",
                question: "What is your age?",
                type: "age-input",
                required: true,
                label: "Age"
            },
            // Q2: Gender (required second question)
            {
                id: "gender",
                question: "What is your biological sex?",
                type: "multiple-choice",
                options: [
                    "Male",
                    "Female",
                    "Intersex",
                    "Prefer not to say"
                ],
                required: true,
                isGenderQuestion: true
            },
            // Q3: Primary mental health concerns
            {
                id: "primary_concerns",
                question: "Which mental health areas are you seeking support with?",
                type: "checkbox",
                options: [
                    "Stress management and resilience",
                    "Mood regulation and depression",
                    "Anxiety or panic symptoms",
                    "Focus and concentration",
                    "Memory and cognitive function",
                    "Sleep disturbances",
                    "Burnout or exhaustion"
                ],
                required: true
            },
            // Q4: Symptom duration
            {
                id: "symptom_duration",
                question: "How long have you been experiencing these symptoms?",
                type: "multiple-choice",
                options: [
                    "Less than 3 months",
                    "3-6 months",
                    "6-12 months",
                    "1-3 years",
                    "More than 3 years"
                ],
                required: true
            },
            // Q5: Symptom severity
            {
                id: "symptom_severity",
                question: "On a scale of 1-10, how much do these symptoms impact your daily life?",
                type: "scale",
                options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                ],
                required: true
            },
            // Q6: Current stress level
            {
                id: "stress_level",
                question: "How would you rate your current stress level?",
                type: "scale",
                options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                ],
                required: true
            },
            // Q7: Sleep quality
            {
                id: "sleep_quality",
                question: "How would you describe your sleep?",
                type: "multiple-choice",
                options: [
                    "Very restorative - 7-9 hours, feel refreshed",
                    "Generally good - occasional disruptions",
                    "Fair - frequent issues falling or staying asleep",
                    "Poor - rarely feel rested",
                    "Very poor - chronic insomnia or severe disruption"
                ],
                required: true
            },
            // Q8: Cognitive symptoms
            {
                id: "cognitive_symptoms",
                question: "Which cognitive symptoms do you experience regularly?",
                type: "checkbox",
                options: [
                    "Brain fog or mental fatigue",
                    "Difficulty concentrating",
                    "Memory problems",
                    "Slowed thinking or processing",
                    "Difficulty making decisions",
                    "Word-finding difficulties",
                    "None of the above"
                ],
                required: true
            },
            // Q9: Previous diagnoses
            {
                id: "previous_diagnoses",
                question: "Have you been diagnosed with any mental health conditions?",
                type: "checkbox",
                options: [
                    "Major depressive disorder",
                    "Generalized anxiety disorder",
                    "Panic disorder",
                    "ADHD or ADD",
                    "PTSD",
                    "Bipolar disorder",
                    "OCD",
                    "None of the above",
                    "Prefer not to say"
                ],
                required: true
            },
            // Q10: Current treatments
            {
                id: "current_treatments",
                question: "What treatments or therapies are you currently using?",
                type: "checkbox",
                options: [
                    "Psychotherapy or counseling",
                    "Antidepressants (SSRIs, SNRIs)",
                    "Anti-anxiety medications",
                    "ADHD medications",
                    "Sleep medications",
                    "Natural supplements or nootropics",
                    "Meditation or mindfulness practice",
                    "None currently"
                ],
                required: true
            },
            // Q11: Physical health factors
            {
                id: "physical_health",
                question: "Do you have any of these conditions that might affect mental health?",
                type: "checkbox",
                options: [
                    "Thyroid disorder",
                    "Chronic pain",
                    "Vitamin D deficiency",
                    "Vitamin B12 deficiency",
                    "Chronic illness or autoimmune condition",
                    "Recent major life stress or trauma",
                    "None of the above"
                ],
                required: true
            },
            // Q12: Lifestyle factors
            {
                id: "lifestyle_factors",
                question: "Which lifestyle factors apply to you?",
                type: "checkbox",
                options: [
                    "Regular exercise (3+ times/week)",
                    "Poor diet or irregular eating",
                    "High caffeine consumption",
                    "Alcohol use (>7 drinks/week)",
                    "Tobacco or nicotine use",
                    "High-stress work environment",
                    "Limited social support or isolation",
                    "Good self-care habits"
                ],
                required: true
            },
            // Q13: Female-specific - Hormonal factors
            {
                id: "hormonal_factors",
                question: "Have you noticed mood changes related to:",
                type: "checkbox",
                options: [
                    "Menstrual cycle (PMS/PMDD)",
                    "Pregnancy or postpartum",
                    "Perimenopause or menopause",
                    "Birth control or hormone therapy",
                    "Not applicable"
                ],
                required: false,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q14: Treatment goals
            {
                id: "treatment_goals",
                question: "What are your primary goals for mental health optimization?",
                type: "checkbox",
                options: [
                    "Reduce stress and anxiety",
                    "Improve mood and emotional stability",
                    "Enhance focus and productivity",
                    "Improve memory and cognition",
                    "Better sleep quality",
                    "Increase resilience and coping",
                    "Overall mental wellness"
                ],
                required: true
            },
            // Q15: Previous lab testing
            {
                id: "lab_willingness",
                question: "Are you willing to complete lab testing (thyroid, vitamins, hormones) to identify underlying factors?",
                type: "yes-no",
                required: true
            }
        ],
        longevity: [
            // Q1: Age (required first question)
            {
                id: "age",
                question: "What is your age?",
                type: "age-input",
                required: true,
                label: "Age"
            },
            // Q2: Gender (required second question)
            {
                id: "gender",
                question: "What is your biological sex?",
                type: "multiple-choice",
                options: [
                    "Male",
                    "Female",
                    "Intersex",
                    "Prefer not to say"
                ],
                required: true,
                isGenderQuestion: true
            },
            // Q3: Current health status
            {
                id: "health_status",
                question: "How would you rate your current overall health and vitality?",
                type: "scale",
                options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                ],
                required: true
            },
            // Q4: Primary longevity goals
            {
                id: "longevity_goals",
                question: "Which longevity outcomes are you prioritizing?",
                type: "checkbox",
                options: [
                    "Delay age-related diseases",
                    "Enhance energy and mitochondrial function",
                    "Optimize cognitive function and memory",
                    "Preserve muscle mass and strength",
                    "Improve cardiovascular health",
                    "Enhance immune system resilience",
                    "Optimize metabolic health",
                    "Extend healthspan and quality of life"
                ],
                required: true
            },
            // Q5: Family longevity history
            {
                id: "family_history",
                question: "Select any age-related conditions prevalent in your family:",
                type: "checkbox",
                options: [
                    "Heart disease or stroke (before age 60)",
                    "Type 2 diabetes",
                    "Cancer (any type)",
                    "Alzheimer's or dementia",
                    "Osteoporosis",
                    "Exceptional longevity (90+ years)",
                    "No significant family history",
                    "Prefer not to say"
                ],
                required: true
            },
            // Q6: Current chronic conditions
            {
                id: "chronic_conditions",
                question: "Do you have any of the following conditions?",
                type: "checkbox",
                options: [
                    "High blood pressure",
                    "High cholesterol",
                    "Diabetes or prediabetes",
                    "Cardiovascular disease",
                    "Autoimmune condition",
                    "Chronic inflammation",
                    "Thyroid disorder",
                    "None of the above"
                ],
                required: true
            },
            // Q7: Lifestyle foundations
            {
                id: "lifestyle_foundations",
                question: "How consistent are your foundational health practices?",
                type: "multiple-choice",
                options: [
                    "Excellent - optimized nutrition, exercise, sleep, stress management",
                    "Good - strong in most areas, some room for improvement",
                    "Fair - inconsistent routines, working on building habits",
                    "Poor - just starting to focus on health optimization",
                    "Need guidance on where to start"
                ],
                required: true
            },
            // Q8: Exercise habits
            {
                id: "exercise_habits",
                question: "What is your current exercise routine?",
                type: "multiple-choice",
                options: [
                    "Comprehensive - strength, cardio, flexibility 5+ days/week",
                    "Regular - 3-4 days/week mixed activities",
                    "Moderate - 1-2 days/week",
                    "Minimal - occasional activity only",
                    "Sedentary - little to no structured exercise"
                ],
                required: true
            },
            // Q9: Nutrition approach
            {
                id: "nutrition_approach",
                question: "Which best describes your nutritional approach?",
                type: "multiple-choice",
                options: [
                    "Whole foods, Mediterranean or plant-based",
                    "Balanced diet with some processed foods",
                    "Low-carb or ketogenic",
                    "Intermittent fasting or time-restricted eating",
                    "Standard Western diet",
                    "No specific approach"
                ],
                required: true
            },
            // Q10: Tracking and biometrics
            {
                id: "tracking_tools",
                question: "Which health metrics do you currently track?",
                type: "checkbox",
                options: [
                    "Continuous glucose monitoring",
                    "Heart rate variability (HRV)",
                    "Sleep tracking (Oura, Whoop, etc.)",
                    "Body composition (DEXA, InBody)",
                    "VO2 max or fitness testing",
                    "Blood pressure monitoring",
                    "Regular comprehensive lab testing",
                    "None currently"
                ],
                required: true
            },
            // Q11: Recent advanced testing
            {
                id: "recent_testing",
                question: "Have you completed any of these tests in the last 12 months?",
                type: "checkbox",
                options: [
                    "Comprehensive metabolic panel",
                    "Advanced lipid panel (ApoB, LDL-P)",
                    "Inflammatory markers (hs-CRP, IL-6)",
                    "Hormone panels (testosterone, thyroid, etc.)",
                    "Micronutrient testing",
                    "Genetic testing or epigenetic age",
                    "Coronary calcium score",
                    "None of the above"
                ],
                required: true
            },
            // Q12: Current supplements and interventions
            {
                id: "current_interventions",
                question: "What longevity-focused interventions are you currently using?",
                type: "checkbox",
                options: [
                    "NAD+ precursors (NMN, NR)",
                    "Senolytics (Quercetin, Fisetin)",
                    "Metformin or Rapamycin",
                    "Peptide therapies",
                    "IV nutrient therapy",
                    "Red light therapy",
                    "Cold/heat exposure",
                    "Comprehensive supplement protocol",
                    "None currently"
                ],
                required: true
            },
            // Q13: Female-specific - Reproductive history
            {
                id: "reproductive_history",
                question: "Please indicate your reproductive/hormonal status:",
                type: "multiple-choice",
                options: [
                    "Premenopausal with regular cycles",
                    "Perimenopausal",
                    "Menopausal (natural)",
                    "Surgical menopause",
                    "On hormone replacement therapy",
                    "History of pregnancy complications",
                    "Not applicable"
                ],
                required: false,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q14: Interest in advanced therapies
            {
                id: "therapy_interest",
                question: "Which advanced longevity therapies are you interested in exploring?",
                type: "checkbox",
                options: [
                    "Peptide optimization protocols",
                    "NAD+ IV therapy or optimization",
                    "Hormone replacement or optimization",
                    "Stem cell or exosome therapy",
                    "Genomic and multi-omics testing",
                    "Personalized supplement protocols",
                    "Advanced biomarker tracking"
                ],
                required: true
            },
            // Q15: Commitment and budget
            {
                id: "commitment_level",
                question: "Are you prepared to commit to long-term (multi-year) longevity optimization with regular monitoring?",
                type: "yes-no",
                required: true
            }
        ],
        sexual: [
            // Q1: Age (required first question)
            {
                id: "age",
                question: "What is your age?",
                type: "age-input",
                required: true,
                label: "Age"
            },
            // Q2: Gender (required second question)
            {
                id: "gender",
                question: "What is your biological sex?",
                type: "multiple-choice",
                options: [
                    "Male",
                    "Female",
                    "Intersex",
                    "Prefer not to say"
                ],
                required: true,
                isGenderQuestion: true
            },
            // Q3: Primary sexual health concern
            {
                id: "primary_concern",
                question: "What is your primary sexual health concern?",
                type: "multiple-choice",
                options: [
                    "Low libido or sex drive",
                    "Erectile dysfunction",
                    "Difficulty with arousal",
                    "Difficulty achieving orgasm",
                    "Pain during intercourse",
                    "Performance anxiety",
                    "Premature ejaculation",
                    "Overall sexual satisfaction",
                    "Other"
                ],
                required: true
            },
            // Q4: Symptom duration
            {
                id: "symptom_duration",
                question: "How long have you been experiencing this concern?",
                type: "multiple-choice",
                options: [
                    "Less than 3 months",
                    "3-6 months",
                    "6-12 months",
                    "1-2 years",
                    "More than 2 years"
                ],
                required: true
            },
            // Q5: Symptom severity
            {
                id: "symptom_severity",
                question: "How much does this concern affect your quality of life or relationships?",
                type: "scale",
                options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                ],
                required: true
            },
            // Q6: Male-specific - Erectile function details
            {
                id: "erectile_details",
                question: "Which best describes your erectile function?",
                type: "multiple-choice",
                options: [
                    "No issues - consistent firm erections",
                    "Occasional difficulty achieving erection",
                    "Occasional difficulty maintaining erection",
                    "Frequent difficulty with erections",
                    "Unable to achieve erections suitable for intercourse",
                    "Complete loss of erectile function"
                ],
                required: false,
                visibleForGenders: [
                    "Male",
                    "Intersex"
                ]
            },
            // Q7: Male-specific - Morning erections
            {
                id: "morning_erections",
                question: "Do you experience morning erections?",
                type: "multiple-choice",
                options: [
                    "Yes - regularly",
                    "Yes - occasionally",
                    "Rarely",
                    "Never",
                    "Unsure"
                ],
                required: false,
                visibleForGenders: [
                    "Male",
                    "Intersex"
                ]
            },
            // Q8: Female-specific - Arousal and lubrication
            {
                id: "arousal_lubrication",
                question: "Do you experience issues with arousal or vaginal lubrication?",
                type: "multiple-choice",
                options: [
                    "No issues",
                    "Occasional difficulty with arousal",
                    "Frequent difficulty with arousal",
                    "Insufficient lubrication/dryness",
                    "Pain or discomfort during intercourse",
                    "Combination of the above"
                ],
                required: false,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q9: Female-specific - Hormonal factors
            {
                id: "hormonal_factors",
                question: "Have you noticed changes in sexual function related to:",
                type: "checkbox",
                options: [
                    "Menstrual cycle phases",
                    "Pregnancy or postpartum period",
                    "Breastfeeding",
                    "Perimenopause or menopause",
                    "Birth control use",
                    "Other hormonal changes",
                    "No hormonal correlation noticed"
                ],
                required: false,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q10: Relationship status
            {
                id: "relationship_status",
                question: "What is your current relationship status?",
                type: "multiple-choice",
                options: [
                    "Single - not sexually active",
                    "Single - casually dating",
                    "In a committed relationship",
                    "Married or long-term partnership",
                    "Complicated or transitioning",
                    "Prefer not to say"
                ],
                required: true
            },
            // Q11: Medical history affecting sexual health
            {
                id: "medical_history",
                question: "Do you have any of these conditions?",
                type: "checkbox",
                options: [
                    "Diabetes",
                    "High blood pressure",
                    "Heart disease",
                    "High cholesterol",
                    "Depression or anxiety",
                    "Thyroid disorder",
                    "Low testosterone (diagnosed)",
                    "PCOS or endometriosis",
                    "Prostate issues",
                    "Previous pelvic surgery",
                    "None of the above"
                ],
                required: true
            },
            // Q12: Current medications
            {
                id: "current_medications",
                question: "Are you taking any medications that might affect sexual function?",
                type: "checkbox",
                options: [
                    "Antidepressants (SSRIs, SNRIs)",
                    "Blood pressure medications",
                    "Finasteride or Dutasteride",
                    "Birth control pills or hormones",
                    "ED medications (Viagra, Cialis, etc.)",
                    "Antipsychotics or mood stabilizers",
                    "Opioids or pain medications",
                    "None of the above"
                ],
                required: true
            },
            // Q13: Lifestyle factors
            {
                id: "lifestyle_factors",
                question: "Which lifestyle factors apply to you?",
                type: "checkbox",
                options: [
                    "Regular exercise",
                    "High stress levels",
                    "Poor sleep quality",
                    "Tobacco or nicotine use",
                    "Regular alcohol use (>7 drinks/week)",
                    "Recreational drug use",
                    "Obesity or significant weight concerns",
                    "Healthy lifestyle overall"
                ],
                required: true
            },
            // Q14: Previous treatments
            {
                id: "previous_treatments",
                question: "Have you tried any treatments for sexual health concerns?",
                type: "checkbox",
                options: [
                    "ED medications (Viagra, Cialis, etc.)",
                    "Testosterone therapy",
                    "Other hormone therapy",
                    "Couples or sex therapy",
                    "Pelvic floor therapy",
                    "Supplements or herbal remedies",
                    "None yet"
                ],
                required: true
            },
            // Q15: Lab testing willingness
            {
                id: "lab_willingness",
                question: "Are you willing to complete hormone and health screening labs to identify underlying causes?",
                type: "yes-no",
                required: true
            }
        ],
        performance: [
            // Q1: Age (required first question)
            {
                id: "age",
                question: "What is your age?",
                type: "age-input",
                required: true,
                label: "Age"
            },
            // Q2: Gender (required second question)
            {
                id: "gender",
                question: "What is your biological sex?",
                type: "multiple-choice",
                options: [
                    "Male",
                    "Female",
                    "Intersex",
                    "Prefer not to say"
                ],
                required: true,
                isGenderQuestion: true
            },
            // Q3: Competition level
            {
                id: "competition_level",
                question: "How would you classify your athletic level?",
                type: "multiple-choice",
                options: [
                    "Professional or elite competitor",
                    "Collegiate athlete",
                    "Competitive amateur",
                    "Dedicated recreational athlete",
                    "Fitness enthusiast",
                    "Rehabilitation or return to sport"
                ],
                required: true
            },
            // Q4: Primary sport/training
            {
                id: "primary_sport",
                question: "What is your primary sport or training focus?",
                type: "multiple-choice",
                options: [
                    "Endurance sports (running, cycling, triathlon)",
                    "Strength training or powerlifting",
                    "CrossFit or functional fitness",
                    "Team or field sports",
                    "Combat sports or martial arts",
                    "Aesthetic sports (bodybuilding, physique)",
                    "Multiple disciplines",
                    "General fitness and health"
                ],
                required: true
            },
            // Q5: Training volume
            {
                id: "training_volume",
                question: "What is your average weekly training volume?",
                type: "multiple-choice",
                options: [
                    "Less than 5 hours per week",
                    "5-10 hours per week",
                    "10-15 hours per week",
                    "15-20 hours per week",
                    "More than 20 hours per week"
                ],
                required: true
            },
            // Q6: Performance goals
            {
                id: "performance_goals",
                question: "What are your specific performance objectives?",
                type: "checkbox",
                options: [
                    "Maximize strength and power",
                    "Increase aerobic capacity and VO2 max",
                    "Improve speed and explosiveness",
                    "Enhance endurance performance",
                    "Optimize body composition",
                    "Accelerate recovery between sessions",
                    "Prevent injuries",
                    "Improve focus and mental performance"
                ],
                required: true
            },
            // Q7: Current limiting factors
            {
                id: "limiting_factors",
                question: "What factors are currently limiting your performance?",
                type: "checkbox",
                options: [
                    "Slow recovery or excessive soreness",
                    "Recurrent injuries",
                    "Low energy or fatigue",
                    "Poor sleep quality",
                    "Difficulty gaining or maintaining muscle",
                    "Difficulty losing body fat",
                    "Mental fatigue or burnout",
                    "Plateau in performance gains",
                    "No significant limitations"
                ],
                required: true
            },
            // Q8: Injury history
            {
                id: "injury_history",
                question: "Do you have any current or recent injuries?",
                type: "text",
                required: false
            },
            // Q9: Recovery strategies
            {
                id: "recovery_strategies",
                question: "What recovery modalities do you currently use?",
                type: "checkbox",
                options: [
                    "Prioritized sleep (8+ hours)",
                    "Active recovery sessions",
                    "Cold therapy or ice baths",
                    "Heat therapy or sauna",
                    "Massage or manual therapy",
                    "Compression therapy",
                    "Planned deload weeks",
                    "Minimal recovery focus"
                ],
                required: true
            },
            // Q10: Nutrition approach
            {
                id: "nutrition_approach",
                question: "How would you describe your nutrition strategy?",
                type: "multiple-choice",
                options: [
                    "Scientifically periodized and tracked",
                    "Structured meal plan, mostly consistent",
                    "Generally healthy, some gaps",
                    "Inconsistent or unplanned",
                    "Need guidance on sports nutrition"
                ],
                required: true
            },
            // Q11: Female-specific - Menstrual cycle considerations
            {
                id: "cycle_performance",
                question: "Have you noticed performance changes related to your menstrual cycle?",
                type: "multiple-choice",
                options: [
                    "Yes - significant impact on training",
                    "Yes - moderate variations",
                    "Slight changes noticed",
                    "No noticeable impact",
                    "Irregular or absent cycles",
                    "Not applicable"
                ],
                required: false,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q12: Recent performance testing
            {
                id: "recent_testing",
                question: "Have you completed any of these assessments recently?",
                type: "checkbox",
                options: [
                    "VO2 max or metabolic testing",
                    "Lactate threshold testing",
                    "Body composition (DEXA, InBody)",
                    "Strength testing (1RM, power output)",
                    "Movement screening or biomechanics",
                    "Comprehensive blood work",
                    "Hormone panel",
                    "None recently"
                ],
                required: true
            },
            // Q13: Current supplements
            {
                id: "current_supplements",
                question: "What supplements or ergogenic aids are you currently using?",
                type: "checkbox",
                options: [
                    "Protein powder or amino acids",
                    "Creatine",
                    "Beta-alanine",
                    "Caffeine or pre-workout",
                    "Electrolytes",
                    "Omega-3 fatty acids",
                    "Vitamin D and other vitamins",
                    "Adaptogens or nootropics",
                    "None currently"
                ],
                required: true
            },
            // Q14: Performance tracking
            {
                id: "performance_tracking",
                question: "What data do you currently track?",
                type: "checkbox",
                options: [
                    "Training volume and intensity",
                    "Heart rate and heart rate variability",
                    "Sleep metrics (wearable)",
                    "GPS or power data",
                    "Body weight and composition",
                    "Strength and performance metrics",
                    "Subjective readiness scores",
                    "No systematic tracking"
                ],
                required: true
            },
            // Q15: Lab testing willingness
            {
                id: "lab_willingness",
                question: "Are you willing to complete comprehensive lab testing to optimize your athletic performance?",
                type: "yes-no",
                required: true
            }
        ],
        wellness: [
            // Q1: Age (required first question)
            {
                id: "age",
                question: "What is your age?",
                type: "age-input",
                required: true,
                label: "Age"
            },
            // Q2: Gender (required second question)
            {
                id: "gender",
                question: "What is your biological sex?",
                type: "multiple-choice",
                options: [
                    "Male",
                    "Female",
                    "Intersex",
                    "Prefer not to say"
                ],
                required: true,
                isGenderQuestion: true
            },
            // Q3: Sleep duration
            {
                id: "sleep_duration",
                question: "How many hours of sleep do you typically get per night?",
                type: "multiple-choice",
                options: [
                    "Less than 5 hours",
                    "5-6 hours",
                    "6-7 hours",
                    "7-8 hours",
                    "8-9 hours",
                    "More than 9 hours"
                ],
                required: true
            },
            // Q4: Sleep quality
            {
                id: "sleep_quality",
                question: "How would you describe the quality of your sleep?",
                type: "multiple-choice",
                options: [
                    "Excellent - feel refreshed and energized",
                    "Good - generally restorative",
                    "Fair - variable quality",
                    "Poor - often wake unrefreshed",
                    "Very poor - chronic sleep problems"
                ],
                required: true
            },
            // Q5: Sleep onset time
            {
                id: "sleep_latency",
                question: "How long does it typically take you to fall asleep?",
                type: "multiple-choice",
                options: [
                    "Less than 10 minutes",
                    "10-20 minutes",
                    "20-40 minutes",
                    "40-60 minutes",
                    "More than 60 minutes"
                ],
                required: true
            },
            // Q6: Sleep disruptions
            {
                id: "sleep_disruptions",
                question: "Which sleep issues do you experience regularly?",
                type: "checkbox",
                options: [
                    "Difficulty falling asleep",
                    "Waking up multiple times",
                    "Early morning awakening",
                    "Snoring or sleep apnea symptoms",
                    "Restless legs or limb movements",
                    "Night sweats or temperature issues",
                    "Vivid dreams or nightmares",
                    "None - sleep through the night"
                ],
                required: true
            },
            // Q7: Chronotype
            {
                id: "chronotype",
                question: "What is your natural sleep preference?",
                type: "multiple-choice",
                options: [
                    "Definite morning person (early to bed, early to rise)",
                    "Somewhat morning person",
                    "Neutral - flexible schedule",
                    "Somewhat evening person",
                    "Definite evening person (night owl)",
                    "Unsure or variable"
                ],
                required: true
            },
            // Q8: Pre-sleep routine
            {
                id: "bedtime_routine",
                question: "How structured is your bedtime routine?",
                type: "multiple-choice",
                options: [
                    "Very consistent - same time, same routine",
                    "Generally consistent - minor variations",
                    "Somewhat inconsistent",
                    "No established routine",
                    "Irregular sleep schedule (shift work, etc.)"
                ],
                required: true
            },
            // Q9: Stimulant use
            {
                id: "stimulant_use",
                question: "When do you typically consume caffeine or other stimulants?",
                type: "checkbox",
                options: [
                    "Morning only (before 10 AM)",
                    "Midday (10 AM - 2 PM)",
                    "Afternoon (after 2 PM)",
                    "Evening or night",
                    "Pre-workout supplements",
                    "Energy drinks regularly",
                    "I don't use caffeine or stimulants"
                ],
                required: true
            },
            // Q10: Stress impact on sleep
            {
                id: "stress_impact",
                question: "How much does stress or anxiety affect your sleep?",
                type: "scale",
                options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10"
                ],
                required: true
            },
            // Q11: Daytime energy
            {
                id: "daytime_energy",
                question: "How would you describe your daytime energy levels?",
                type: "multiple-choice",
                options: [
                    "Consistently high throughout the day",
                    "Good with mild afternoon dip",
                    "Moderate with significant afternoon crash",
                    "Low energy most of the day",
                    "Extreme fatigue - need naps",
                    "Highly variable"
                ],
                required: true
            },
            // Q12: Sleep environment
            {
                id: "sleep_environment",
                question: "Which describes your sleep environment?",
                type: "checkbox",
                options: [
                    "Dark room (blackout curtains or mask)",
                    "Cool temperature (65-68°F / 18-20°C)",
                    "Quiet or white noise",
                    "Comfortable mattress and pillows",
                    "Minimal electronics in bedroom",
                    "None of the above - needs improvement"
                ],
                required: true
            },
            // Q13: Female-specific - Cycle-related sleep changes
            {
                id: "cycle_sleep_changes",
                question: "Do you notice sleep changes related to your menstrual cycle or menopause?",
                type: "multiple-choice",
                options: [
                    "Yes - significant changes during cycle",
                    "Yes - insomnia during menopause",
                    "Mild changes noticed",
                    "No noticeable pattern",
                    "Not applicable"
                ],
                required: false,
                visibleForGenders: [
                    "Female",
                    "Intersex"
                ]
            },
            // Q14: Current sleep aids or medications
            {
                id: "sleep_aids",
                question: "Do you currently use any sleep aids?",
                type: "checkbox",
                options: [
                    "Prescription sleep medications",
                    "Over-the-counter sleep aids",
                    "Melatonin",
                    "Magnesium or other supplements",
                    "CBD or cannabis products",
                    "Meditation or relaxation apps",
                    "None currently"
                ],
                required: true
            },
            // Q15: Wellness goals
            {
                id: "wellness_goals",
                question: "What are your primary sleep and wellness goals?",
                type: "checkbox",
                options: [
                    "Fall asleep faster",
                    "Sleep through the night",
                    "Wake feeling refreshed",
                    "Improve energy during the day",
                    "Reduce stress and anxiety",
                    "Optimize recovery",
                    "Better cognitive function"
                ],
                required: true
            }
        ]
    };
    const directionQuestions = selectedDirection ? questionnaireData[selectedDirection] : [];
    const genderQuestion = directionQuestions.find((question)=>question.isGenderQuestion);
    const selectedGenderValue = genderQuestion ? answers[genderQuestion.id] : undefined;
    const currentQuestions = directionQuestions.filter((question)=>{
        if (!question.visibleForGenders) {
            return true;
        }
        if (!selectedGenderValue) {
            return false;
        }
        return question.visibleForGenders.includes(selectedGenderValue);
    });
    const currentQuestion = currentQuestions[currentQuestionIndex];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LonviaLabsQuestionnaire.useEffect": ()=>{
            if (currentQuestionIndex >= currentQuestions.length && currentQuestions.length > 0) {
                setCurrentQuestionIndex(currentQuestions.length - 1);
            }
        }
    }["LonviaLabsQuestionnaire.useEffect"], [
        currentQuestionIndex,
        currentQuestions.length
    ]);
    const getVisibleOptions = (question)=>{
        if (!question.options) {
            return [];
        }
        const shouldFilterByGender = Boolean(selectedGenderValue) && !question.isGenderQuestion;
        return question.options.map((option)=>typeof option === 'string' ? {
                value: option,
                label: option
            } : {
                value: option.value,
                label: option.label,
                genders: option.genders
            }).filter((option)=>{
            if (!shouldFilterByGender || !option.genders) {
                return true;
            }
            return option.genders.includes(selectedGenderValue);
        });
    };
    // Handle Enter key press to advance to next question
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LonviaLabsQuestionnaire.useEffect": ()=>{
            const handleKeyPress = {
                "LonviaLabsQuestionnaire.useEffect.handleKeyPress": (event)=>{
                    if (event.key === 'Enter' && selectedDirection && !isCompleted) {
                        const answer = answers[currentQuestion?.id];
                        const isAnswered = currentQuestion?.required ? currentQuestion.type === 'checkbox' ? answer && answer.length > 0 : answer !== undefined && answer !== '' : true;
                        if (isAnswered) {
                            event.preventDefault();
                            if (currentQuestionIndex < currentQuestions.length - 1) {
                                setCurrentQuestionIndex({
                                    "LonviaLabsQuestionnaire.useEffect.handleKeyPress": (prev)=>prev + 1
                                }["LonviaLabsQuestionnaire.useEffect.handleKeyPress"]);
                            } else {
                                setIsCompleted(true);
                            }
                        }
                    }
                }
            }["LonviaLabsQuestionnaire.useEffect.handleKeyPress"];
            window.addEventListener('keydown', handleKeyPress);
            return ({
                "LonviaLabsQuestionnaire.useEffect": ()=>window.removeEventListener('keydown', handleKeyPress)
            })["LonviaLabsQuestionnaire.useEffect"];
        }
    }["LonviaLabsQuestionnaire.useEffect"], [
        currentQuestionIndex,
        answers,
        selectedDirection,
        isCompleted,
        currentQuestion,
        currentQuestions.length
    ]);
    const handleDirectionSelect = (directionId)=>{
        setSelectedDirection(directionId);
        setCurrentQuestionIndex(0);
        setAnswers({});
    };
    const handleAnswer = (questionId, answer)=>{
        setAnswers((prev)=>({
                ...prev,
                [questionId]: answer
            }));
    };
    const handleNext = ()=>{
        if (currentQuestionIndex < currentQuestions.length - 1) {
            setCurrentQuestionIndex((prev)=>prev + 1);
        } else {
            setIsCompleted(true);
        }
    };
    const handlePrevious = ()=>{
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev)=>prev - 1);
        }
    };
    const handleSubmit = ()=>{
        // Store questionnaire data in localStorage for now
        const questionnaireResult = {
            id: Date.now().toString(),
            direction: selectedDirection,
            directionTitle: directions.find((d)=>d.id === selectedDirection)?.title,
            answers,
            completedAt: new Date().toISOString(),
            status: 'completed'
        };
        const existingQuestionnaires = JSON.parse(localStorage.getItem('lonviaQuestionnaires') || '[]');
        existingQuestionnaires.push(questionnaireResult);
        localStorage.setItem('lonviaQuestionnaires', JSON.stringify(existingQuestionnaires));
        // Navigate to case creation or login
        router.push('/case/create');
    };
    const renderQuestion = ()=>{
        if (!currentQuestion) return null;
        const currentAnswer = answers[currentQuestion.id];
        const visibleOptions = getVisibleOptions(currentQuestion);
        switch(currentQuestion.type){
            case 'multiple-choice':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: visibleOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleAnswer(currentQuestion.id, option.value),
                            className: `w-full p-4 text-left border rounded-lg transition-all duration-200 ${currentAnswer === option.value ? 'border-[#10552E] bg-[#10552E] bg-opacity-10 text-[#10552E]' : 'border-gray-300 hover:border-gray-400'}`,
                            children: option.label
                        }, option.value, false, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 1955,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 1953,
                    columnNumber: 11
                }, this);
            case 'scale':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between text-sm text-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Low"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 1974,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "High"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 1975,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 1973,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex space-x-2",
                            children: visibleOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleAnswer(currentQuestion.id, option.value),
                                    className: `flex-1 p-3 border rounded-lg transition-all duration-200 ${currentAnswer === option.value ? 'border-[#10552E] bg-[#10552E] text-white' : 'border-gray-300 hover:border-gray-400'}`,
                                    children: option.label
                                }, option.value, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 1979,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 1977,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 1972,
                    columnNumber: 11
                }, this);
            case 'yes-no':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex space-x-4",
                    children: [
                        'Yes',
                        'No'
                    ].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>handleAnswer(currentQuestion.id, option),
                            className: `flex-1 p-4 border rounded-lg transition-all duration-200 ${currentAnswer === option ? 'border-[#10552E] bg-[#10552E] text-white' : 'border-gray-300 hover:border-gray-400'}`,
                            children: option
                        }, option, false, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 1999,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 1997,
                    columnNumber: 11
                }, this);
            case 'checkbox':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: visibleOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: currentAnswer?.includes(option.value) || false,
                                    onChange: (e)=>{
                                        const currentAnswers = currentAnswer || [];
                                        if (e.target.checked) {
                                            handleAnswer(currentQuestion.id, [
                                                ...currentAnswers,
                                                option.value
                                            ]);
                                        } else {
                                            handleAnswer(currentQuestion.id, currentAnswers.filter((a)=>a !== option.value));
                                        }
                                    },
                                    className: "mr-3 h-4 w-4 text-[#10552E] focus:ring-[#10552E] border-gray-300 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2022,
                                    columnNumber: 17
                                }, this),
                                option.label
                            ]
                        }, option.value, true, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 2018,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 2016,
                    columnNumber: 11
                }, this);
            case 'text':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    value: currentAnswer || '',
                    onChange: (e)=>handleAnswer(currentQuestion.id, e.target.value),
                    className: "w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10552E] focus:border-transparent",
                    rows: 4,
                    placeholder: "Please provide your answer..."
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 2043,
                    columnNumber: 11
                }, this);
            case 'age-input':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AgeInput, {
                    id: `${currentQuestion.id}-input`,
                    label: currentQuestion.label || 'Age',
                    value: currentAnswer || '',
                    onChange: (value)=>handleAnswer(currentQuestion.id, value)
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 2054,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    const isCurrentQuestionAnswered = ()=>{
        const answer = answers[currentQuestion?.id];
        if (!currentQuestion?.required) return true;
        if (currentQuestion.type === 'checkbox') {
            return answer && answer.length > 0;
        }
        return answer !== undefined && answer !== '';
    };
    if (!selectedDirection) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-background-primary",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "w-full py-16 bg-gradient-to-br from-[#10552E] via-[#0d4426] to-[#0a3520]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto px-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-4xl md:text-5xl font-bold text-white mb-6",
                                children: "Health Optimization Assessment"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                lineNumber: 2082,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl text-green-100 max-w-3xl mx-auto",
                                children: "Choose your area of focus to begin your personalized health optimization journey"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                lineNumber: 2085,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                        lineNumber: 2081,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 2080,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "w-full py-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-6xl mx-auto px-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: directions.map((direction)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2",
                                    onClick: ()=>handleDirectionSelect(direction.id),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-6 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `w-16 h-16 bg-gradient-to-r ${direction.color} rounded-full flex items-center justify-center mx-auto mb-4`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-2xl",
                                                    children: direction.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                    lineNumber: 2102,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                lineNumber: 2101,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-gray-800 mb-2",
                                                children: direction.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                lineNumber: 2104,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: direction.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                lineNumber: 2105,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                        lineNumber: 2100,
                                        columnNumber: 19
                                    }, this)
                                }, direction.id, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2095,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 2093,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                        lineNumber: 2092,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 2091,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
            lineNumber: 2079,
            columnNumber: 7
        }, this);
    }
    if (isCompleted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-background-primary",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full py-16",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto px-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-10 h-10 text-green-600",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M5 13l4 4L19 7"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                            lineNumber: 2124,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                        lineNumber: 2123,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2122,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl font-bold text-gray-800 mb-4",
                                    children: "Assessment Complete!"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-600 mb-8",
                                    children: [
                                        "Thank you for completing your ",
                                        directions.find((d)=>d.id === selectedDirection)?.title,
                                        " assessment. Our medical experts will review your responses and create a personalized optimization plan for you."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2128,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 2121,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "mb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold mb-4",
                                        children: "Next Steps:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                        lineNumber: 2136,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-6 h-6 bg-[#10552E] text-white rounded-full flex items-center justify-center text-sm mr-3",
                                                        children: "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                        lineNumber: 2139,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Complete your case submission"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                        lineNumber: 2140,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                lineNumber: 2138,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-6 h-6 bg-[#10552E] text-white rounded-full flex items-center justify-center text-sm mr-3",
                                                        children: "2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                        lineNumber: 2143,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Schedule a consultation with our specialists"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                        lineNumber: 2144,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                lineNumber: 2142,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-6 h-6 bg-[#10552E] text-white rounded-full flex items-center justify-center text-sm mr-3",
                                                        children: "3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                        lineNumber: 2147,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Receive your personalized optimization plan"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                        lineNumber: 2148,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                                lineNumber: 2146,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                        lineNumber: 2137,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                lineNumber: 2135,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 2134,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row gap-4 justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleSubmit,
                                    className: "bg-[#10552E] hover:bg-[#0d4426] text-white px-8 py-3 text-lg font-semibold",
                                    children: "Continue to Case Creation"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2155,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: ()=>router.push('/lonvia-labs'),
                                    variant: "outline",
                                    className: "border-[#10552E] text-[#10552E] hover:bg-[#10552E] hover:text-white px-8 py-3 text-lg font-semibold",
                                    children: "Back to Lonvia Labs"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2161,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 2154,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                    lineNumber: 2120,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                lineNumber: 2119,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
            lineNumber: 2118,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background-primary",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full py-8 bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-gray-600",
                                        children: [
                                            "Question ",
                                            currentQuestionIndex + 1,
                                            " of ",
                                            currentQuestions.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                        lineNumber: 2182,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-gray-600",
                                        children: [
                                            Math.round((currentQuestionIndex + 1) / currentQuestions.length * 100),
                                            "% Complete"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                        lineNumber: 2185,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                lineNumber: 2181,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-gray-200 rounded-full h-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#10552E] h-2 rounded-full transition-all duration-300",
                                    style: {
                                        width: `${(currentQuestionIndex + 1) / currentQuestions.length * 100}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2190,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                lineNumber: 2189,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                        lineNumber: 2180,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-gray-800 mb-6",
                                    children: currentQuestion?.question
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2199,
                                    columnNumber: 15
                                }, this),
                                renderQuestion(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mt-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handlePrevious,
                                            disabled: currentQuestionIndex === 0,
                                            variant: "outline",
                                            className: "px-6 py-2",
                                            children: "Previous"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                            lineNumber: 2206,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Button$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: handleNext,
                                            disabled: !isCurrentQuestionAnswered(),
                                            className: "bg-[#10552E] hover:bg-[#0d4426] text-white px-6 py-2",
                                            children: currentQuestionIndex === currentQuestions.length - 1 ? 'Complete' : 'Next'
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                            lineNumber: 2215,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                                    lineNumber: 2205,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                            lineNumber: 2198,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                        lineNumber: 2197,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
                lineNumber: 2178,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
            lineNumber: 2177,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/lonvia-labs/questionnaire.tsx",
        lineNumber: 2176,
        columnNumber: 5
    }, this);
}
_s(LonviaLabsQuestionnaire, "1DYeodGJY7qBKfSZZu8eK9GYdRU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = LonviaLabsQuestionnaire;
var _c, _c1;
__turbopack_refresh__.register(_c, "AgeInput");
__turbopack_refresh__.register(_c1, "LonviaLabsQuestionnaire");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/lonvia-labs/questionnaire.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/lonvia-labs/questionnaire";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/lonvia-labs/questionnaire.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/src/pages/lonvia-labs/questionnaire.tsx (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/lonvia-labs/questionnaire.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__69b81b._.js.map