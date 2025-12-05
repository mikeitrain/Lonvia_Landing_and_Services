(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__e057e3._.js", {

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
"[project]/src/types/status.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Status object structure from API response
__turbopack_esm__({
    "CASE_STATUS": (()=>CASE_STATUS)
});
const CASE_STATUS = {
    NEW: 'NEW',
    OFFER_SENT: 'OFFER_SENT',
    ACCEPTED: 'ACCEPTED',
    WAITING_FOR_PAYMENT: 'WAITING_FOR_PAYMENT',
    PAID: 'PAID',
    TIMESLOTS_SENT: 'TIMESLOTS_SENT',
    ARRANGED: 'ARRANGED',
    IN_CONSULTATION: 'IN_CONSULTATION',
    DECLINED: 'DECLINED',
    FINISHED: 'FINISHED'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/statusUtils.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "StatusUtils": (()=>StatusUtils)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/types/status.ts [client] (ecmascript)");
;
class StatusUtils {
    /**
   * Extract CaseStatus from either a string or CaseStatusObject
   */ static extractStatus(status) {
        if (!status) {
            return null;
        }
        if (typeof status === 'string') {
            return this.toCaseStatus(status);
        }
        if (typeof status === 'object' && status.name) {
            return this.toCaseStatus(status.name);
        }
        return null;
    }
    /**
   * Validate if a string is a valid case status
   */ static isValidStatus(status) {
        return Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"]).includes(status);
    }
    /**
   * Normalize status string (convert to uppercase and trim)
   */ static normalizeStatus(status) {
        if (!status || typeof status !== 'string') {
            return null;
        }
        return status.toUpperCase().trim();
    }
    /**
   * Convert any case status string to CaseStatus type
   */ static toCaseStatus(status) {
        const normalized = this.normalizeStatus(status);
        if (normalized && this.isValidStatus(normalized)) {
            return normalized;
        }
        return null;
    }
    /**
   * Get all available status values
   */ static getAllStatuses() {
        return Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"]);
    }
    /**
   * Valid transitions from each status (mirrors backend logic)
   * Note: Backend does not have ACCEPTED status - transitions directly from OFFER_SENT to WAITING_FOR_PAYMENT
   */ static VALID_TRANSITIONS = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].NEW]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].OFFER_SENT
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].OFFER_SENT]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].WAITING_FOR_PAYMENT,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].DECLINED
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].ACCEPTED]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].WAITING_FOR_PAYMENT
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].WAITING_FOR_PAYMENT]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].PAID
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].PAID]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].TIMESLOTS_SENT
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].TIMESLOTS_SENT]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].ARRANGED,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].PAID
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].ARRANGED]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].IN_CONSULTATION
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].IN_CONSULTATION]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].NEW,
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].FINISHED
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].DECLINED]: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].OFFER_SENT
        ],
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].FINISHED]: []
    };
    /**
   * Get valid transitions for a given status
   */ static getValidTransitions(status) {
        return this.VALID_TRANSITIONS[status] || [];
    }
    /**
   * Check whether a transition is allowed
   */ static isValidTransition(from, to) {
        return this.getValidTransitions(from).includes(to);
    }
    /**
   * Check if a status is terminal (cannot be changed)
   */ static isTerminalStatus(status) {
        return status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].FINISHED;
    }
    /**
   * Check if a status is active (not terminal)
   */ static isActiveStatus(status) {
        return !this.isTerminalStatus(status);
    }
    /**
   * Get status display properties
   */ static getStatusInfo(status) {
        const statusMap = {
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].NEW]: {
                color: 'blue',
                icon: '📋',
                description: 'New case created and waiting for offer'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].OFFER_SENT]: {
                color: 'yellow',
                icon: '📤',
                description: 'Offer has been sent to customer'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].ACCEPTED]: {
                color: 'green',
                icon: '✅',
                description: 'Customer has accepted the offer'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].WAITING_FOR_PAYMENT]: {
                color: 'yellow',
                icon: '💰',
                description: 'Waiting for customer payment'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].PAID]: {
                color: 'green',
                icon: '💳',
                description: 'Payment has been received'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].TIMESLOTS_SENT]: {
                color: 'yellow',
                icon: '📅',
                description: 'Available time slots sent to customer'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].ARRANGED]: {
                color: 'green',
                icon: '📞',
                description: 'Customer has selected a time slot'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].IN_CONSULTATION]: {
                color: 'yellow',
                icon: '👨‍⚕️',
                description: 'Consultation is currently taking place'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].DECLINED]: {
                color: 'red',
                icon: '❌',
                description: 'Customer has declined the offer'
            },
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].FINISHED]: {
                color: 'gray',
                icon: '🏁',
                description: 'Consultation is complete'
            }
        };
        return statusMap[status] || {
            color: 'gray',
            icon: '❓',
            description: 'Unknown status'
        };
    }
    /**
   * Get CSS classes for status colors using custom CSS classes
   */ static getStatusColorClasses(status) {
        const colorMap = {
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].NEW]: 'status-new',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].OFFER_SENT]: 'status-pending',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].ACCEPTED]: 'status-active',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].WAITING_FOR_PAYMENT]: 'status-pending',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].PAID]: 'status-active',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].TIMESLOTS_SENT]: 'status-pending',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].ARRANGED]: 'status-active',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].IN_CONSULTATION]: 'status-pending',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].DECLINED]: 'status-error',
            [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$status$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CASE_STATUS"].FINISHED]: 'status-neutral'
        };
        return colorMap[status] || 'status-neutral';
    }
    /**
   * Parse status from API response
   */ static parseStatusFromApi(status) {
        return this.toCaseStatus(status);
    }
    /**
   * Validate API response status
   */ static validateApiStatus(status) {
        if (typeof status === 'string') {
            return this.toCaseStatus(status);
        }
        if (typeof status === 'object' && status !== null && 'name' in status) {
            const statusObj = status;
            if (typeof statusObj.name === 'string') {
                return this.toCaseStatus(statusObj.name);
            }
        }
        return null;
    }
    /**
   * Convert status enum to translation key
   */ static statusToTranslationKey(status) {
        return `status.${status.toLowerCase()}`;
    }
    /**
   * Get status name from either string or object format
   */ static getStatusName(status) {
        if (!status) {
            return null;
        }
        if (typeof status === 'string') {
            return status;
        }
        if (typeof status === 'object' && status.name) {
            return status.name;
        }
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/symptomUtils.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SymptomUtils": (()=>SymptomUtils)
});
class SymptomUtils {
    /**
   * Convert symptom severity to translation key
   */ static severityToTranslationKey(severity) {
        const keyMap = {
            mild: 'symptoms.mild',
            moderate: 'symptoms.moderate',
            severe: 'symptoms.severe'
        };
        return keyMap[severity] || severity;
    }
    /**
   * Convert symptom duration to translation key
   */ static durationToTranslationKey(duration) {
        const keyMap = {
            less_than_24h: 'symptoms.lessThan24h',
            '1_to_3_days': 'symptoms.1to3Days',
            '3_to_7_days': 'symptoms.3to7Days',
            '1_to_2_weeks': 'symptoms.1to2Weeks',
            more_than_2_weeks: 'symptoms.moreThan2Weeks'
        };
        return keyMap[duration] || duration;
    }
    /**
   * Get all severity options
   */ static getAllSeverities() {
        return [
            'mild',
            'moderate',
            'severe'
        ];
    }
    /**
   * Get all duration options
   */ static getAllDurations() {
        return [
            'less_than_24h',
            '1_to_3_days',
            '3_to_7_days',
            '1_to_2_weeks',
            'more_than_2_weeks'
        ];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/genderUtils.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "GenderUtils": (()=>GenderUtils)
});
class GenderUtils {
    /**
   * Convert gender to translation key
   */ static genderToTranslationKey(gender) {
        const keyMap = {
            male: 'demographic.male',
            female: 'demographic.female',
            other: 'demographic.other'
        };
        return keyMap[gender] || gender;
    }
    /**
   * Get all gender options
   */ static getAllGenders() {
        return [
            'male',
            'female',
            'other'
        ];
    }
    /**
   * Validate if a string is a valid gender
   */ static isValidGender(gender) {
        return [
            'male',
            'female',
            'other'
        ].includes(gender);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/contexts/LanguageContext.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "LanguageProvider": (()=>LanguageProvider),
    "useLanguage": (()=>useLanguage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$statusUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/statusUtils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$symptomUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/symptomUtils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$genderUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/genderUtils.ts [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
// Country to language mapping
const countryToLanguage = {
    // German-speaking countries
    'DE': 'de',
    'AT': 'de',
    'CH': 'de',
    'LI': 'de',
    'LU': 'de',
    // Romanian-speaking countries
    'RO': 'ro',
    'MD': 'ro',
    // Default to English for all other countries
    'DEFAULT': 'en'
};
// Function to detect user's country and set appropriate language
const detectUserLanguage = async ()=>{
    // Try multiple IP geolocation services for better reliability
    const services = [
        'https://ipapi.co/json/',
        'https://ipinfo.io/json',
        'https://api.ipify.org?format=json'
    ];
    for (const service of services){
        try {
            const response = await fetch(service, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) continue;
            const data = await response.json();
            // Different services return country code in different fields
            const countryCode = data.country_code || data.country || data.countryCode;
            if (countryCode) {
                const detectedLanguage = countryToLanguage[countryCode] || countryToLanguage['DEFAULT'];
                return detectedLanguage;
            }
        } catch  {
            continue;
        }
    }
    return detectBrowserLanguage();
};
// Fallback function to detect language from browser settings
const detectBrowserLanguage = ()=>{
    try {
        // Get browser language
        const browserLang = navigator.language || navigator.languages?.[0] || 'en';
        // Extract language code (e.g., 'de-DE' -> 'de')
        const langCode = browserLang.split('-')[0].toLowerCase();
        // Map browser language to our supported languages
        if (langCode === 'de') return 'de';
        if (langCode === 'ro') return 'ro';
        // Default to English for all other languages
        return 'en';
    } catch  {
        return 'en';
    }
};
// Translation keys
const translations = {
    en: {
        // Navigation
        'nav.login': 'Login',
        'nav.register': 'Register',
        'nav.logout': 'Logout',
        'nav.language': 'Language',
        'nav.newCase': 'New Case',
        'nav.services': 'Services',
        'nav.ourTeam': 'Our Team',
        'nav.contact': 'Contact',
        'nav.lonviaLabs': 'Lonvia Labs',
        'nav.about': 'About',
        'nav.signIn': 'Sign In',
        'nav.profile': 'Profile',
        'nav.adminPanel': 'Working Panel',
        'nav.doctorPanel': 'Doctor Panel',
        'nav.getStarted': 'Get Started',
        // Auth
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirmPassword': 'Confirm Password',
        'auth.firstName': 'First Name',
        'auth.lastName': 'Last Name',
        'auth.confirmCode': 'Confirmation Code',
        'auth.newPassword': 'New Password',
        'auth.forgotPassword': 'Forgot Password?',
        'auth.resetPassword': 'Reset Password',
        'auth.forceChangePasswordTitle': 'Update your password',
        'auth.forceChangePasswordSubtitle': 'You need to set a new password before continuing.',
        'auth.setNewPassword': 'Set a new password',
        'auth.updatingPassword': 'Updating password...',
        'auth.updatePassword': 'Update Password',
        'auth.confirmRegistration': 'Confirm Registration',
        'auth.alreadyHaveAccount': 'Already have an account?',
        'auth.dontHaveAccount': "Don't have an account?",
        'auth.loginHere': 'Login here',
        'auth.registerHere': 'Register here',
        'auth.backToLogin': 'Back to Login',
        'auth.sendCode': 'Send Code',
        'auth.confirm': 'Confirm',
        'auth.submit': 'Submit',
        'auth.notAuthorizedNotConfirmed': 'Error logging in. Wrong password or the user does not exist or is not confirmed.',
        'auth.login': 'Login',
        'auth.loginRequired': 'Login Required',
        'auth.loginToCreateCase': 'Please log in to create a medical case.',
        // Password Validation
        'password.requirements': 'Password Requirements:',
        'password.minLength': 'At least 8 characters',
        'password.uppercase': 'At least one uppercase letter',
        'password.lowercase': 'At least one lowercase letter',
        'password.number': 'At least one number',
        'password.symbol': 'At least one special character',
        // Form Validation Messages
        'validation.firstNameRequired': 'First name is required',
        'validation.firstNameMinLength': 'First name must be at least 2 characters',
        'validation.lastNameRequired': 'Last name is required',
        'validation.lastNameMinLength': 'Last name must be at least 2 characters',
        'validation.emailRequired': 'Email is required',
        'validation.emailInvalid': 'Invalid email address',
        'validation.passwordRequired': 'Password is required',
        'validation.passwordMinLength': 'Password must be at least 8 characters',
        'validation.passwordComplexity': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'validation.confirmPasswordRequired': 'Confirm password is required',
        'validation.passwordsDoNotMatch': 'Passwords do not match',
        'validation.codeRequired': 'Verification code is required',
        'validation.codeMustBe6Digits': 'Code must be 6 digits',
        'validation.cnpRequired': 'CNP is required',
        'validation.cnpInvalid': 'Invalid CNP format',
        // Login Page
        'login.title': 'Welcome Back',
        'login.subtitle': 'Sign in to access your account',
        'login.signIn': 'Sign In',
        'login.enterCredentials': 'Enter your credentials to continue',
        'login.rememberMe': 'Remember me',
        'login.signingIn': 'Signing in...',
        'message.loggedIn': 'Logged in successfully',
        'message.registrationSuccess': 'Registration successful! Please check your email for confirmation.',
        'message.registrationFailed': 'Registration failed. Please try again.',
        'message.userAlreadyExists': 'An account with this email already exists. Please try logging in instead.',
        'message.confirmationSuccess': 'Email confirmed successfully! You can now log in.',
        // Register Page
        'register.title': 'Join Lonvia Healthcare',
        'register.subtitle': 'Register today to access our comprehensive medical services and connect with experienced healthcare professionals.',
        'register.createAccount': 'Create Your Account',
        'register.fillDetails': 'Please fill in your information to get started',
        'register.creatingAccount': 'Creating Account...',
        'register.createAccountBtn': 'Create Account',
        'register.firstName': 'First Name',
        'register.lastName': 'Last Name',
        'register.email': 'Email Address',
        'register.password': 'Password',
        'register.repeatPassword': 'Confirm Password',
        'register.firstNameRequired': 'First name is required',
        'register.lastNameRequired': 'Last name is required',
        'register.emailRequired': 'Email is required',
        'register.emailInvalid': 'Invalid email address',
        'register.passwordRequired': 'Password is required',
        'register.repeatPasswordRequired': 'Please confirm your password',
        'register.passwordMismatch': 'Passwords do not match',
        // Confirm Register Page
        'confirmRegister.title': 'Confirm Your Email',
        'confirmRegister.subtitle': 'Please verify your email address to complete registration',
        'confirmRegister.confirmEmail': 'Confirm Email',
        'confirmRegister.enterCode': 'Please enter your email and the confirmation code you received',
        'confirmRegister.email': 'Email Address',
        'confirmRegister.confirmationCode': 'Confirmation Code',
        'confirmRegister.emailRequired': 'Email is required',
        'confirmRegister.emailInvalid': 'Invalid email address',
        'confirmRegister.codeRequired': 'Confirmation code is required',
        'confirmRegister.codeLength': 'Confirmation code must be 6 characters',
        'confirmRegister.confirming': 'Confirming...',
        'confirmRegister.verifying': 'Verifying...',
        'confirmRegister.confirm': 'Confirm',
        'confirmRegister.noCode': "Didn't receive the code?",
        'confirmRegister.tryAgain': 'Try again',
        'message.registrationConfirmed': 'Registration confirmed! Please sign in.',
        // Forgot Password Page
        'forgotPassword.title': 'Reset Your Password',
        'forgotPassword.subtitle': 'Enter your email to receive a password reset code',
        'forgotPassword.forgotPassword': 'Forgot Password?',
        'forgotPassword.requestCode': 'Request Reset Code',
        'forgotPassword.resetPassword': 'Reset Password',
        'forgotPassword.enterEmail': 'Enter your email address to receive a password reset code',
        'forgotPassword.enterCode': 'Enter the code you received and your new password',
        'forgotPassword.email': 'Email Address',
        'forgotPassword.resetCode': 'Reset Code',
        'forgotPassword.newPassword': 'New Password',
        'forgotPassword.confirmPassword': 'Confirm New Password',
        'forgotPassword.emailRequired': 'Email is required',
        'forgotPassword.emailInvalid': 'Invalid email address',
        'forgotPassword.codeRequired': 'Reset code is required',
        'forgotPassword.codeLength': 'Reset code must be 6 characters',
        'forgotPassword.newPasswordRequired': 'New password is required',
        'forgotPassword.passwordLength': 'Password must be at least 8 characters',
        'forgotPassword.confirmPasswordRequired': 'Please confirm your new password',
        'forgotPassword.passwordMismatch': 'Passwords do not match',
        'forgotPassword.sendingCode': 'Sending code...',
        'forgotPassword.sendCode': 'Send reset code',
        'forgotPassword.resetting': 'Resetting password...',
        'forgotPassword.resetPasswordBtn': 'Reset password',
        'forgotPassword.rememberPassword': 'Remember your password?',
        'forgotPassword.signIn': 'Sign in',
        'forgotPassword.sendCodeFailed': 'Failed to send reset code',
        'forgotPassword.resetFailed': 'Failed to reset password',
        'forgotPassword.existingResetCode': 'Do you have already a reset code?',
        'message.passwordResetSuccess': 'Password reset successful! Please sign in.',
        // Additional Forgot Password keys
        'forgotPassword.checkEmail': 'Check Your Email',
        'forgotPassword.resetLinkSent': 'We\'ve sent you a password reset link',
        'forgotPassword.emailSent': 'Email Sent Successfully',
        'forgotPassword.checkInbox': 'Please check your email inbox and follow the instructions to reset your password.',
        'forgotPassword.orUseCode': 'Or if you have a reset code, you can use it directly:',
        'forgotPassword.backToLogin': 'Back to Login',
        'forgotPassword.useResetCode': 'Use Reset Code',
        'forgotPassword.tryDifferentEmail': 'Try a different email',
        'forgotPassword.sending': 'Sending...',
        'forgotPassword.sendResetLink': 'Send Reset Link',
        'auth.rememberPassword': 'Remember your password?',
        'message.resetEmailSent': 'Password reset email sent successfully',
        // Reset Password Page
        'resetPassword.chooseOption': 'Do you already have a reset code?',
        'resetPassword.yesHaveCode': 'Yes, I have a reset code',
        'resetPassword.noNeedCode': 'No, I need to request a code',
        'resetPassword.back': 'Back',
        'resetPassword.success': 'Password Reset Successful',
        'resetPassword.passwordUpdated': 'Your password has been successfully updated',
        'resetPassword.resetComplete': 'Reset Complete',
        'resetPassword.canLoginNow': 'You can now log in with your new password.',
        'resetPassword.loginNow': 'Login Now',
        'resetPassword.title': 'Reset Password',
        'resetPassword.subtitle': 'Enter your email, reset code, and new password',
        'resetPassword.resetPassword': 'Reset Password',
        'resetPassword.enterDetails': 'Please enter your email, the reset code you received, and your new password.',
        'resetPassword.resetCode': 'Reset Code',
        'resetPassword.newPassword': 'New Password',
        'resetPassword.confirmPassword': 'Confirm New Password',
        'resetPassword.resetting': 'Resetting password...',
        'resetPassword.needResetCode': 'Need a reset code?',
        'resetPassword.requestCode': 'Request one here',
        'validation.resetCodeRequired': 'Reset code is required',
        'validation.resetCodeMinLength': 'Reset code must be at least 6 characters',
        'validation.newPasswordRequired': 'New password is required',
        // Messages
        'message.loggedOut': 'Logged out successfully',
        'message.registrationPending': 'Please check your email for confirmation code',
        'message.passwordResetSent': 'Password reset code sent to your email',
        'message.loginToSubmit': 'Please log in or create an account to submit your case',
        'message.passwordChanged': 'Password changed successfully',
        'message.passwordChangeFailed': 'Failed to change password',
        'message.formDataRestored': 'Your form data has been restored',
        'message.formDataExpired': 'Your saved form data has expired. Please fill out the form again.',
        'message.failedToOpenAttachment': 'Failed to open attachment',
        'message.failedToRefreshAttachments': 'Failed to refresh attachments',
        // HTTP Error Messages
        'error.http.400': 'A user input error occurred: {message}',
        'error.http.401': 'You are not logged in. Please log in again.',
        'error.http.403': 'You are not authorized to perform this action: {message}',
        'error.http.404': 'The requested resource was not found.',
        'error.http.500': 'A server error occurred. Please try again. If this error persists, please contact support.',
        'error.http.generic': 'An unexpected error occurred. Please try again.',
        // Form Data Management
        'formData.expiryWarning': 'Form Data Expiring Soon',
        'formData.expiryMessage': 'Your saved form data will expire in {hours} hours.',
        'formData.submitNow': 'Submit Now',
        'formData.dismiss': 'Dismiss',
        // Profile
        'profile.title': 'User Profile',
        'profile.subtitle': 'Manage your account',
        'profile.personalInfo': 'Personal Information',
        'profile.personalInformation': 'Personal Information',
        'profile.security': 'Security Settings',
        'profile.preferences': 'Preferences',
        'profile.notifications': 'Notifications',
        'profile.securityComingSoon': 'Security settings will be available soon',
        'profile.preferencesComingSoon': 'Preferences will be available soon',
        'profile.notificationsComingSoon': 'Notification settings will be available soon',
        'profile.edit': 'Edit',
        'profile.save': 'Save',
        'profile.cancel': 'Cancel',
        'profile.userDataSaved': 'User data saved successfully',
        'profile.failedToSave': 'Failed to save user data',
        'profile.userNotFound': 'User not found',
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.warning': 'Warning',
        'common.info': 'Information',
        'common.backToHome': 'Back to Home',
        'common.cancel': 'Cancel',
        'common.close': 'Close',
        'common.retry': 'Retry',
        'common.submit': 'Submit',
        'common.working': 'Working...',
        'common.chooseFile': 'Choose file',
        'common.noFileChosen': 'No file chosen',
        'common.selectedFile': 'Selected',
        'common.select': 'Select',
        // Language names
        'language.german': 'German',
        'language.english': 'English',
        'language.romanian': 'Romanian',
        // Symptoms
        'symptoms.title': 'Symptom Questionnaire',
        'symptoms.description': 'Please describe your symptoms in detail',
        'symptoms.required': 'Please describe your symptoms',
        'symptoms.placeholder': 'Describe your symptoms here...',
        'symptoms.duration': 'How long have you been experiencing these symptoms?',
        'symptoms.durationRequired': 'Please select duration',
        'symptoms.selectDuration': 'Select duration...',
        'symptoms.lessThan24h': 'Less than 24 hours',
        'symptoms.1to3Days': '1-3 days',
        'symptoms.3to7Days': '3-7 days',
        'symptoms.1to2Weeks': '1-2 weeks',
        'symptoms.moreThan2Weeks': 'More than 2 weeks',
        'symptoms.severity': 'How severe are your symptoms?',
        'symptoms.severityRequired': 'Please select severity',
        'symptoms.selectSeverity': 'Select severity...',
        'symptoms.mild': 'Mild',
        'symptoms.moderate': 'Moderate',
        'symptoms.severe': 'Severe',
        'symptoms.additionalNotes': 'Additional Notes',
        'symptoms.additionalNotesPlaceholder': 'Any additional information you would like to share...',
        'symptoms.customNotes': 'Custom Notes',
        'symptoms.customNotesPlaceholder': 'Any additional notes or comments...',
        'symptoms.submit': 'Submit Symptoms',
        'symptoms.reset': 'Reset Form',
        'symptoms.submitted': 'Symptoms submitted successfully',
        'symptoms.error': 'Failed to submit symptoms',
        'symptoms.maxLengthExceeded': 'Maximum 2000 characters allowed',
        // Footer
        'footer.description': 'Your trusted partner for comprehensive healthcare solutions and medical expertise.',
        // Address
        'address.completeAddress': 'Complete Your Address',
        'address.completeAddressMessage': 'To create a medical case, we need your complete address information. Please fill in the required fields below.',
        'address.addressInformation': 'Address Information',
        'address.saveAndContinue': 'Save & Continue',
        'address.county': 'County',
        'address.countyRequired': 'County is required',
        'address.countyTooltip': 'Please enter your county name',
        'address.city': 'City',
        'address.cityRequired': 'City is required',
        'address.cityTooltip': 'Enter the city name',
        'address.postalCode': 'Postal Code',
        'address.postalCodeRequired': 'Postal code is required',
        'address.postalCodeTooltip': 'Enter a 6-digit postal code',
        'address.postalCodeInvalid': 'Please enter a valid 6-digit postal code',
        'address.street': 'Street',
        'address.streetRequired': 'Street is required',
        'address.streetTooltip': 'Enter the street name',
        'address.houseNumber': 'House Number',
        'address.houseNumberRequired': 'House number is required',
        'address.houseNumberTooltip': 'Enter the house number',
        'address.houseNumberInvalid': 'Please enter a valid house number (1-9 digits)',
        'address.block': 'Block',
        'address.blockTooltip': 'Enter the block number',
        'address.blockInvalid': 'Please enter a valid block number (0-9 digits)',
        'address.entrance': 'Entrance',
        'address.entranceTooltip': 'Enter the entrance number',
        'address.entranceInvalid': 'Please enter a valid entrance number (0-9 digits)',
        'address.floor': 'Floor',
        'address.floorTooltip': 'Enter the floor number',
        'address.floorInvalid': 'Please enter a valid floor number (0-9 digits)',
        'address.apartment': 'Apartment',
        'address.apartmentTooltip': 'Enter the apartment number',
        'address.apartmentInvalid': 'Please enter a valid apartment number (0-9 digits)',
        'footer.services': 'Our Services',
        'footer.contact': 'Contact Information',
        'footer.hours': 'Operating Hours',
        'footer.monFri': 'Monday - Friday: 8:00 AM - 6:00 PM',
        'footer.saturday': 'Saturday: 9:00 AM - 4:00 PM',
        'footer.sunday': 'Sunday: Closed',
        'footer.emergency': 'Emergency: 24/7 Available',
        'footer.copyright': '© 2024 Lonvia. All rights reserved.',
        // Services
        'services.urology': 'Urology',
        'services.orthopedics': 'Orthopedics',
        'services.plasticSurgery': 'Plastic Surgery',
        'services.internalMedicine': 'Internal Medicine',
        'services.surgery': 'Surgery',
        'services.oncology': 'Oncology',
        'services.ent': 'ENT (Ear, Nose & Throat)',
        'services.ophthalmology': 'Ophthalmology',
        'services.dermatology': 'Dermatology',
        'services.neurology': 'Neurology',
        'services.pediatrics': 'Pediatrics',
        'services.geriatrics': 'Geriatrics',
        'services.otherMedicalDomains': 'Other Medical Domains',
        // Landing Page
        'landing.hero.title': 'Live longer, live well.',
        'landing.hero.subtitle': 'Connect with world-class medical professionals for personalized healthcare solutions',
        'landing.hero.bookAppointment': 'Book Appointment',
        'landing.hero.learnMore': 'Learn More',
        'landing.welcome.title': 'Welcome to Lonvia',
        'landing.welcome.description': 'We are committed to providing exceptional healthcare services with a focus on patient comfort, advanced medical technology, and personalized care.',
        'landing.welcome.expertCare': 'Expert Care',
        'landing.welcome.expertCareDesc': 'Our team of experienced specialists provides comprehensive medical care with the latest treatments.',
        'landing.welcome.easyAccess': 'Easy Access',
        'landing.welcome.easyAccessDesc': 'Simple and convenient access to healthcare services through our user-friendly platform.',
        'landing.welcome.securePlatform': 'Secure Platform',
        'landing.welcome.securePlatformDesc': 'Your health information is protected with state-of-the-art security measures.',
        'landing.doctors.title': 'Meet Our Expert Doctors',
        'landing.doctors.subtitle': 'Our team of board-certified physicians brings decades of combined experience in providing exceptional healthcare.',
        'landing.services.title': 'Our Medical Services',
        'landing.services.subtitle': 'Comprehensive healthcare solutions tailored to your needs',
        'landing.services.learnMore': 'Learn More',
        'landing.cta.title': 'Ready to Get Started?',
        'landing.cta.subtitle': 'Take the first step towards better health. Contact us today to schedule your consultation.',
        'landing.cta.getStarted': 'Get Started',
        'landing.cta.contactUs': 'Contact Us',
        // Reviews Section
        'landing.reviews.title': 'What Our Patients Say',
        'landing.reviews.subtitle': 'Real experiences from patients who trust Lonvia Healthcare with their medical needs',
        // Stats
        'stats.happyPatients': 'Happy Patients',
        'stats.medicalSpecialists': 'Medical Specialists',
        'stats.yearsExcellence': 'Years of Excellence',
        'stats.emergencyCare': 'Emergency Care',
        // Reviews
        'reviews.exceptional.title': 'Exceptional Care',
        'reviews.exceptional.body': 'The medical team at Lonvia provided outstanding care during my treatment. Professional, compassionate, and thorough.',
        'reviews.recommended.title': 'Highly Recommended',
        'reviews.recommended.body': 'From scheduling to treatment, everything was seamless. The doctors took time to explain everything clearly.',
        'reviews.outstanding.title': 'Outstanding Service',
        'reviews.outstanding.body': 'The entire staff was incredibly helpful and professional. I felt comfortable and well-cared for throughout my visit.',
        // Benefits
        'benefits.whyChoose': 'Why Choose Lonvia Healthcare?',
        'benefits.expertCare': 'Expert Medical Care',
        'benefits.expertCareDesc': 'Access to board-certified specialists across multiple medical disciplines.',
        'benefits.convenientScheduling': 'Convenient Scheduling',
        'benefits.convenientSchedulingDesc': 'Easy online appointment booking with flexible scheduling options.',
        'benefits.comprehensiveServices': 'Comprehensive Services',
        'benefits.comprehensiveServicesDesc': 'Full range of medical services from preventive care to specialized treatments.',
        // Service Descriptions
        'services.urology.desc': 'Specialized care for urinary tract and male reproductive health issues.',
        'services.orthopedics.desc': 'Comprehensive treatment for bone, joint, and muscle conditions.',
        'services.plasticSurgery.desc': 'Aesthetic and reconstructive surgical procedures.',
        'services.internalMedicine.desc': 'Diagnosis and treatment of adult diseases and conditions.',
        'services.surgery.desc': 'Advanced surgical procedures across various medical specialties.',
        'services.oncology.desc': 'Comprehensive cancer care and treatment services.',
        'services.ent.desc': 'Expert treatment for ear, nose, throat, and related head and neck conditions.',
        'services.ophthalmology.desc': 'Comprehensive eye care and vision treatment services.',
        'services.dermatology.desc': 'Specialized care for skin, hair, and nail conditions.',
        'services.neurology.desc': 'Expert diagnosis and treatment of nervous system disorders.',
        'services.pediatrics.desc': 'Comprehensive healthcare for infants, children, and adolescents.',
        'services.geriatrics.desc': 'Specialized medical care focused on older adults.',
        'services.otherMedicalDomains.desc': 'Specialized care across rare diseases and additional medical specialties.',
        // Contact Page
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Get in touch with our healthcare team',
        'contact.info.title': 'Contact Information',
        'contact.form.title': 'Send us a Message',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.address': 'Address',
        'contact.form.name': 'Name',
        'contact.form.namePlaceholder': 'Your name',
        'contact.form.email': 'Email',
        'contact.form.emailPlaceholder': 'your.email@example.com',
        'contact.form.subject': 'Subject',
        'contact.form.subjectPlaceholder': 'Message subject',
        'contact.form.message': 'Message',
        'contact.form.messagePlaceholder': 'Your message here...',
        'contact.form.send': 'Send Message',
        // Case
        'case.fetchError': 'Failed to load cases',
        'case.errorTitle': 'Error loading cases',
        'case.overview.title': 'My Cases',
        'case.overview.description': 'View and manage your medical cases',
        'case.create': 'Create New Case',
        'case.stats.total': 'Total Cases',
        'case.stats.active': 'Active Cases',
        'case.stats.recent': 'Recent Cases',
        'case.maxRetriesReached': 'Maximum retry attempts reached',
        'case.retryAttempts': 'Retry attempts',
        'case.maxRetriesMessage': 'Maximum retry attempts reached. Please try again later.',
        // Status translations
        'status.new': 'New',
        'status.offer_sent': 'Offer Sent',
        'status.accepted': 'Accepted',
        'status.waiting_for_payment': 'Waiting for Payment',
        'status.paid': 'Paid',
        'status.timeslots_sent': 'Timeslots Sent',
        'status.arranged': 'Appointment Arranged',
        'status.in_consultation': 'In Consultation',
        'status.declined': 'Declined',
        'status.finished': 'Finished',
        'status.unknown': 'Unknown',
        'status.moreInfo': 'Click here for more information',
        'status.flowTitle': 'Status flow',
        'status.flowOverview': 'Overview of statuses and their meaning:',
        'status.allowedNext': 'Allowed next statuses',
        'status.noNext': 'No further transitions allowed.',
        'status.setByAdmin': 'Statuses are set by the administrator.',
        'status.next': 'Next status',
        'status.set': 'Set status',
        'status.flow.new': 'Admin will send an offer to the user',
        'status.flow.offer_sent': 'User has to accept or decline the offer. And invoice will be automatically sent by email if the offer is accepted',
        'status.flow.waiting_for_payment': 'User has to pay the invoice',
        'status.flow.paid': 'Admin will propose a time slot for the meeting with the doctor',
        'status.flow.timeslots_sent': 'User has to accept or decline the time slot at least 1 week before the meeting',
        'status.flow.arranged': 'Appointment with the doctor is set; user must join the online meeting in this portal',
        'status.flow.in_consultation': 'Doctor will decide if further treatment is necessary',
        'status.flow.declined': 'The user declined the offer',
        'status.flow.finished': 'No further treatment is necessary; the case is finished',
        // Case translations
        'case.noCases': 'No cases found',
        'case.noCasesDescription': 'Get started by creating your first case.',
        'case.noDescription': 'No description',
        'case.duration': 'Duration',
        'case.severity': 'Severity',
        'case.created': 'Created',
        'case.loadingDescription': 'Please wait while we fetch your cases.',
        'case.details.setAppointment': 'Set appointment',
        'case.details.suggestAppointments': 'Suggest appointments',
        'case.details.timezoneInfo.title': 'Note:',
        'case.details.timezoneInfo.message': 'The entered time is always in German time. Appointments must be at least 2 days in advance.',
        'case.details.appointmentError': 'Please fill in at least one appointment date.',
        'case.details.doctorError': 'Please select a doctor.',
        'case.details.doctor': 'Doctor',
        'case.details.selectDoctor': 'Select doctor',
        'case.details.duration': 'Duration',
        'case.details.durationOptions.10min': '10 min',
        'case.details.durationOptions.15min': '15 min',
        'case.details.durationOptions.20min': '20 min',
        'case.details.durationOptions.30min': '30 min',
        'case.details.durationOptions.45min': '45 min',
        'case.details.durationOptions.60min': '60 min',
        'case.details.durationOptions.90min': '90 min',
        'case.details.durationOptions.120min': '120 min',
        'case.details.suggestedTimeslots': 'Suggested Timeslots',
        'case.details.acceptTimeslot': 'Accept Timeslot',
        'case.details.declineTimeslot': 'Decline',
        'case.details.appointmentArranged.title': 'Appointment Scheduled',
        'case.details.appointmentArranged.message': 'The appointment with the doctor is arranged to given details. Come here 15 minutes before the appointment starts to get the link to the meeting. If the link is not shown up refresh the page or look into you emails.',
        'case.details.appointmentArranged.date': 'Date',
        'case.details.appointmentArranged.time': 'Time',
        'case.details.appointmentArranged.duration': 'Duration',
        'case.details.existingAppointments': 'Existing Appointments',
        'case.details.paymentWarning.title': 'Payment Required',
        'case.details.paymentWarning.message': 'Please pay the invoice to continue with your case. You received the invoice via email. You can also download the invoice below.',
        'case.details.paymentWarning.downloadInvoice': 'Download Invoice',
        'case.details.paymentWarning.alreadyPaid': 'Already paid? This info will disappear once payment is confirmed.',
        'case.details.offerInfo.title': 'Offer Received',
        'case.details.offerInfo.message': 'Please read the offer carefully. You received it via email or you can download it below. You need to accept it to continue.',
        'case.details.offerInfo.validity': 'The offer is valid for 2 weeks.',
        'case.details.offerInfo.downloadOffer': 'Download Offer',
        'case.details.timeslotsInfo.title': 'Choose Your Appointment',
        'case.details.timeslotsInfo.message': 'Please select one of the suggested appointment times below to continue with your case.',
        'case.details.noSymptoms': 'No symptoms recorded',
        'case.details.withExistingDiagnosis': 'With an existing diagnosis',
        'case.details.diagnosis': 'Diagnosis',
        // Admin Panel
        'admin.panel.title': 'Working Panel',
        'admin.panel.workInProcess': 'Worklist',
        'admin.panel.waitingForUser': 'Waiting for user',
        'admin.panel.arranged': 'Appointment arranged',
        'admin.panel.inConsultation': 'In consultation',
        'admin.panel.declined': 'Declined',
        'admin.panel.finished': 'Finished',
        'admin.panel.loadCases': 'Load cases',
        'admin.status.manualChangeWarning': 'This action should only be used in special cases. Normally, the status changes automatically.',
        // Administration
        'admin.administration.title': 'Administration',
        'admin.administration.subtitle': 'Manage system settings and configurations',
        'admin.administration.doctors': 'Doctor Management',
        'admin.administration.specialties': 'Specialty Management',
        'admin.administration.users': 'User Management',
        'admin.administration.settings': 'System Settings',
        'admin.administration.reports': 'Reports & Analytics',
        // Specialty Management
        'specialty.title': 'Specialties',
        'specialty.subspecialties': 'Subspecialties',
        'specialty.add': 'Add Specialty',
        'specialty.addNew': 'Add New Specialty',
        'specialty.edit': 'Edit Specialty',
        'specialty.name': 'Name',
        'specialty.nameRequired': 'Name is required',
        'specialty.namePlaceholder': 'Enter specialty name',
        'specialty.description': 'Description',
        'specialty.descriptionPlaceholder': 'Enter specialty description',
        'specialty.active': 'Active',
        'specialty.inactive': 'Inactive',
        'specialty.save': 'Save',
        'specialty.saving': 'Saving...',
        'specialty.cancel': 'Cancel',
        'specialty.delete': 'Delete',
        'specialty.deleteConfirm': 'Are you sure you want to delete this specialty? This action cannot be undone.',
        'specialty.deleteTitle': 'Delete specialty',
        'specialty.editTitle': 'Edit specialty',
        'specialty.noSpecialties': 'No specialties found. Add your first specialty above.',
        'specialty.subspecialtiesCount': 'subspecialties',
        'specialty.failedToSave': 'Failed to save specialty. Please try again.',
        'specialty.failedToDelete': 'Failed to delete specialty. Please try again.',
        // Subspecialty Management
        'subspecialty.title': 'Subspecialties',
        'subspecialty.add': 'Add Subspecialty',
        'subspecialty.addNew': 'Add New Subspecialty',
        'subspecialty.edit': 'Edit Subspecialty',
        'subspecialty.name': 'Name',
        'subspecialty.nameRequired': 'Name is required',
        'subspecialty.namePlaceholder': 'Enter subspecialty name',
        'subspecialty.description': 'Description',
        'subspecialty.descriptionPlaceholder': 'Enter subspecialty description',
        'subspecialty.active': 'Active',
        'subspecialty.inactive': 'Inactive',
        'subspecialty.save': 'Save',
        'subspecialty.saving': 'Saving...',
        'subspecialty.cancel': 'Cancel',
        'subspecialty.delete': 'Delete',
        'subspecialty.deleteConfirm': 'Are you sure you want to delete this subspecialty? This action cannot be undone.',
        'subspecialty.deleteTitle': 'Delete subspecialty',
        'subspecialty.editTitle': 'Edit subspecialty',
        'subspecialty.noSubspecialties': 'No subspecialties found. Add your first subspecialty above.',
        'subspecialty.selectSpecialtyFirst': 'Please select a specialty first',
        'subspecialty.failedToSave': 'Failed to save subspecialty. Please try again.',
        'subspecialty.failedToDelete': 'Failed to delete subspecialty. Please try again.',
        // Specialty Container
        'specialtyContainer.title': 'Manage Specialties & Subspecialties',
        'specialtyContainer.subtitle': 'Create and manage medical specialties and their subspecialties',
        'specialtyContainer.loading': 'Loading Specialties',
        'specialtyContainer.loadingMessage': 'Please wait while we load the specialties...',
        'specialtyContainer.failedToLoad': 'Failed to load specialties. Please try again.',
        'specialtyContainer.tryAgain': 'Try Again',
        'specialtyContainer.refresh': 'Refresh',
        'specialtyContainer.selectSpecialty': 'Select a Specialty',
        'specialtyContainer.selectSpecialtyMessage': 'Choose a specialty from the list to view and manage its subspecialties.',
        'specialtyContainer.selectedSpecialty': 'Selected Specialty:',
        'specialtyContainer.status': 'Status:',
        'specialtyContainer.subspecialties': 'Subspecialties:',
        'specialtyContainer.created': 'Created:',
        'specialtyContainer.description': 'Description:',
        'specialtyContainer.howToUse': 'How to use:',
        'specialtyContainer.leftPanel': 'Left Panel:',
        'specialtyContainer.leftPanelDesc': 'Manage specialties - add, edit, delete, and select specialties',
        'specialtyContainer.rightPanel': 'Right Panel:',
        'specialtyContainer.rightPanelDesc': 'Manage subspecialties for the selected specialty',
        'specialtyContainer.selectSpecialtyDesc': 'Select a specialty from the left panel to view and manage its subspecialties',
        'specialtyContainer.individualItems': 'Each item',
        'specialtyContainer.individualItemsDesc': 'has individual save and delete buttons for granular control',
        'specialtyContainer.changesSaved': 'Changes are saved immediately',
        'specialtyContainer.changesSavedDesc': 'when you click save on any item',
        // Doctor Management
        'doctor.overview.title': 'Doctor Management',
        'doctor.overview.add': 'Add Doctor',
        'doctor.overview.delete': 'Delete Doctor',
        'doctor.overview.noDoctors': 'No doctors found',
        'doctor.overview.noDoctorsDescription': 'Get started by adding your first doctor.',
        'doctor.overview.loading': 'Loading doctors...',
        'doctor.overview.selectDoctor': 'Select a doctor to delete',
        'doctor.details.title': 'Doctor Details',
        'doctor.details.create': 'Create Doctor',
        'doctor.details.edit': 'Edit Doctor',
        'doctor.details.save': 'Save',
        'doctor.details.cancel': 'Cancel',
        'doctor.details.firstName': 'First Name',
        'doctor.details.lastName': 'Last Name',
        'doctor.details.titleField': 'Title',
        'doctor.details.licenseNumber': 'License Number',
        'doctor.details.licenseExpiry': 'License Expiry Date',
        'doctor.details.bio': 'Biography',
        'doctor.details.consultationFee': 'Consultation Fee',
        'doctor.details.isActive': 'Active',
        'doctor.details.specialties': 'Specialties',
        'doctor.details.subspecialties': 'Subspecialties',
        'doctor.details.addSpecialty': 'Add Specialty',
        'doctor.details.removeSpecialty': 'Remove',
        'doctor.details.language': 'Language',
        'doctor.profile.title': 'Doctor Profile',
        'doctor.profile.subtitle': 'Manage your professional profile',
        'doctor.delete.title': 'Delete Doctor',
        'doctor.delete.message': 'Are you sure you want to delete this doctor? This action cannot be undone.',
        'doctor.delete.confirm': 'Delete',
        'doctor.delete.cancel': 'Cancel',
        // Invoice
        'invoice.send': 'Send invoice',
        'invoice.paid': 'Paid',
        // Documents
        'documents.offer': 'Offer',
        'documents.invoice': 'Invoice',
        // Case create - diagnosis
        'case.create.diagnosisUploadInfo': 'Upload your diagnosis files now. They will be linked to your case after creation.',
        // Offer
        'offer.send': 'Send offer',
        'offer.amount': 'Amount',
        'offer.text': 'Offer text',
        'case.create.hasDiagnosis': 'I already have a diagnosis',
        // Demographic translations
        'demographic.title': 'Demographic Information',
        'demographic.gender': 'Gender',
        'demographic.genderRequired': 'Gender is required',
        'demographic.selectGender': 'Select gender',
        'demographic.male': 'Male',
        'demographic.female': 'Female',
        'demographic.other': 'Other',
        'demographic.preferNotToSay': 'Prefer not to say',
        'demographic.dateOfBirth': 'Date of Birth',
        'demographic.selectDay': 'Select day',
        'demographic.selectMonth': 'Select month',
        'demographic.selectYear': 'Select year',
        'demographic.dayRequired': 'Day is required',
        'demographic.dayMin': 'Day must be at least 1',
        'demographic.dayMax': 'Day must be at most 31',
        'demographic.monthRequired': 'Month is required',
        'demographic.monthMin': 'Month must be at least 1',
        'demographic.monthMax': 'Month must be at most 12',
        'demographic.yearRequired': 'Year is required',
        'demographic.yearMin': 'Year must be at least 1900',
        'demographic.yearMax': 'Year cannot be in the future',
        'demographic.height': 'Height (cm)',
        'demographic.heightMin': 'Height must be at least 50 cm',
        'demographic.heightMax': 'Height must be at most 250 cm',
        'demographic.weight': 'Weight (kg)',
        'demographic.weightMin': 'Weight must be at least 20 kg',
        'demographic.weightMax': 'Weight must be at most 500 kg',
        'demographic.notProvided': 'Not provided',
        'demographic.userNotFound': 'User not found',
        // Wizard translations
        'wizard.completeProfile': 'Complete Your Profile',
        'wizard.completeProfileMessage': 'To get better treatment, it would be helpful to provide the following information.',
        'wizard.personalInfo': 'Personal Info',
        'wizard.demographic': 'Demographic',
        'wizard.saveAndContinue': 'Save & Continue',
        'wizard.createCase': 'Create Medical Case',
        'wizard.createCaseDescription': 'Please provide your symptoms and complete your profile to create a medical case.',
        'wizard.saveAndSubmit': 'Save & Submit Case',
        // Common additional translations
        'common.next': 'Next',
        'common.back': 'Back',
        'common.edit': 'Edit',
        'common.saving': 'Saving...',
        'common.save': 'Save',
        // Case details translations
        'case.details.medicalForm': 'Medical Form',
        'case.details.receipts': 'Receipts',
        'case.details.documents': 'Documents',
        'case.details.notes': 'Notes',
        'case.details.infos': 'Infos',
        'case.details.customerName': 'Customer name:',
        'case.details.appointmentDate': 'Appointment date:',
        'case.details.gender': 'Gender:',
        'case.details.height': 'Height:',
        'case.details.weight': 'Weight:',
        'case.details.dateOfBirth': 'Date of birth:',
        'case.details.notesPlaceholder': 'Notes from doctors. (This is a text field which could be seen by everyone).',
        'case.details.upload': 'Upload',
        'case.details.download': 'Download',
        'case.details.open': 'Open',
        'case.details.view': 'View',
        'case.details.noDocuments': 'No documents uploaded yet',
        'case.details.delete': 'Delete',
        'case.details.deleteConfirm': 'Are you sure you want to delete this document?',
        'case.details.deleteConfirmTitle': 'Delete Document',
        'case.details.cancel': 'Cancel',
        'case.details.symptom': 'Symptom',
        'case.details.answerOfUser': 'Answer of User',
        'case.details.acceptOffer': 'Accept offer',
        'case.details.acceptOfferTitle': 'Accept offer',
        'case.details.acceptOfferMessage': 'Do you want to accept the offer? By accepting, you confirm that you have read and understood the offer.',
        // Upload wizard additions
        'case.details.uploadFileHint': 'Upload PNG, JPG, JPEG, PDF, DICOM, NIfTI, etc.',
        'case.details.linkPlaceholder': 'https://example.com/resource',
        'case.details.linkHint': 'Accepts http(s), mailto:, tel:, or domain names. Will be validated.',
        'case.details.modeFile': 'File',
        'case.details.modeLink': 'Link',
        'case.details.modeQr': 'QR',
        'case.details.qrHint': 'Upload an image (PNG/JPG/JPEG/SVG) containing a QR code. We will read it and store the link.',
        'case.details.descriptionPlaceholder': 'Short description (required)',
        'validation.fileTypeNotAllowed': 'This file type is not allowed',
        'case.details.qrPdfNotSupported': 'QR decoding from PDF is not supported',
        // Calendar
        'calendar.title': 'Calendar',
        'calendar.legend.selected': 'Selected Date',
        'calendar.legend.today': 'Today',
        'calendar.legend.hasAppointments': 'Has Appointments',
        'calendar.noAppointments': 'No appointments scheduled for'
    },
    de: {
        // Navigation
        'nav.login': 'Anmelden',
        'nav.register': 'Registrieren',
        'nav.logout': 'Abmelden',
        'nav.language': 'Sprache',
        'nav.newCase': 'Neuer Fall',
        'nav.services': 'Dienstleistungen',
        'nav.ourTeam': 'Unser Team',
        'nav.contact': 'Kontakt',
        'nav.lonviaLabs': 'Lonvia Labs',
        'nav.about': 'Über uns',
        'nav.profile': 'Profil',
        'nav.adminPanel': 'Arbeitsbereich',
        'nav.doctorPanel': 'Arzt-Panel',
        'nav.signIn': 'Anmelden',
        'nav.getStarted': 'Loslegen',
        // Auth
        'auth.email': 'E-Mail',
        'auth.password': 'Passwort',
        'auth.confirmPassword': 'Passwort bestätigen',
        'auth.firstName': 'Vorname',
        'auth.lastName': 'Nachname',
        'auth.confirmCode': 'Bestätigungscode',
        'auth.newPassword': 'Neues Passwort',
        'auth.forgotPassword': 'Passwort vergessen?',
        'auth.resetPassword': 'Passwort zurücksetzen',
        'auth.forceChangePasswordTitle': 'Aktualisieren Sie Ihr Passwort',
        'auth.forceChangePasswordSubtitle': 'Sie müssen ein neues Passwort festlegen, bevor Sie fortfahren.',
        'auth.setNewPassword': 'Neues Passwort festlegen',
        'auth.updatingPassword': 'Passwort wird aktualisiert...',
        'auth.updatePassword': 'Passwort aktualisieren',
        'auth.confirmRegistration': 'Registrierung bestätigen',
        'auth.alreadyHaveAccount': 'Haben Sie bereits ein Konto?',
        'auth.dontHaveAccount': 'Haben Sie noch kein Konto?',
        'auth.loginHere': 'Hier anmelden',
        'auth.registerHere': 'Hier registrieren',
        'auth.backToLogin': 'Zurück zur Anmeldung',
        'auth.sendCode': 'Code senden',
        'auth.confirm': 'Bestätigen',
        'auth.submit': 'Absenden',
        'auth.notAuthorizedNotConfirmed': 'Fehler beim Anmelden. Falsches Passwort oder der Benutzer existiert nicht oder ist noch nicht bestätigt.',
        'auth.login': 'Anmelden',
        'auth.loginRequired': 'Anmeldung erforderlich',
        'auth.loginToCreateCase': 'Bitte melden Sie sich an, um einen medizinischen Fall zu erstellen.',
        // Password Validation
        'password.requirements': 'Passwort-Anforderungen:',
        'password.minLength': 'Mindestens 8 Zeichen',
        'password.uppercase': 'Mindestens ein Großbuchstabe',
        'password.lowercase': 'Mindestens ein Kleinbuchstabe',
        'password.number': 'Mindestens eine Zahl',
        'password.symbol': 'Mindestens ein Sonderzeichen',
        // Form Validation Messages
        'validation.firstNameRequired': 'Vorname ist erforderlich',
        'validation.firstNameMinLength': 'Vorname muss mindestens 2 Zeichen lang sein',
        'validation.lastNameRequired': 'Nachname ist erforderlich',
        'validation.lastNameMinLength': 'Nachname muss mindestens 2 Zeichen lang sein',
        'validation.emailRequired': 'E-Mail ist erforderlich',
        'validation.emailInvalid': 'Ungültige E-Mail-Adresse',
        'validation.passwordRequired': 'Passwort ist erforderlich',
        'validation.passwordMinLength': 'Passwort muss mindestens 8 Zeichen lang sein',
        'validation.passwordComplexity': 'Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten',
        'validation.confirmPasswordRequired': 'Passwort bestätigen ist erforderlich',
        'validation.passwordsDoNotMatch': 'Passwörter stimmen nicht überein',
        'validation.codeRequired': 'Bestätigungscode ist erforderlich',
        'validation.codeMustBe6Digits': 'Code muss 6 Ziffern haben',
        'validation.cnpRequired': 'CNP ist erforderlich',
        'validation.cnpInvalid': 'Ungültiges CNP-Format',
        // Login Page
        'login.title': 'Willkommen zurück',
        'login.subtitle': 'Melden Sie sich an, um auf Ihr Konto zuzugreifen',
        'login.signIn': 'Anmelden',
        'login.enterCredentials': 'Geben Sie Ihre Anmeldedaten ein, um fortzufahren',
        'login.rememberMe': 'Angemeldet bleiben',
        'login.signingIn': 'Anmeldung läuft...',
        'message.loggedIn': 'Erfolgreich angemeldet',
        'message.registrationSuccess': 'Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mail zur Bestätigung.',
        'message.registrationFailed': 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
        'message.userAlreadyExists': 'Ein Konto mit dieser E-Mail existiert bereits. Bitte versuchen Sie sich stattdessen anzumelden.',
        'message.confirmationSuccess': 'E-Mail erfolgreich bestätigt! Sie können sich jetzt anmelden.',
        // Register Page
        'register.title': 'Lonvia Healthcare beitreten',
        'register.subtitle': 'Registrieren Sie sich heute, um auf unsere umfassenden medizinischen Dienstleistungen zuzugreifen und sich mit erfahrenen Gesundheitsfachkräften zu verbinden.',
        'register.createAccount': 'Ihr Konto erstellen',
        'register.fillDetails': 'Bitte füllen Sie Ihre Informationen aus, um zu beginnen',
        'register.creatingAccount': 'Konto wird erstellt...',
        'register.createAccountBtn': 'Konto erstellen',
        'register.firstName': 'Vorname',
        'register.lastName': 'Nachname',
        'register.email': 'E-Mail-Adresse',
        'register.password': 'Passwort',
        'register.repeatPassword': 'Passwort bestätigen',
        'register.firstNameRequired': 'Vorname ist erforderlich',
        'register.lastNameRequired': 'Nachname ist erforderlich',
        'register.emailRequired': 'E-Mail ist erforderlich',
        'register.emailInvalid': 'Ungültige E-Mail-Adresse',
        'register.passwordRequired': 'Passwort ist erforderlich',
        'register.repeatPasswordRequired': 'Bitte bestätigen Sie Ihr Passwort',
        'register.passwordMismatch': 'Passwörter stimmen nicht überein',
        // Confirm Register Page
        'confirmRegister.title': 'Bestätigen Sie Ihre E-Mail',
        'confirmRegister.subtitle': 'Bitte bestätigen Sie Ihre E-Mail-Adresse, um die Registrierung abzuschließen',
        'confirmRegister.confirmEmail': 'E-Mail bestätigen',
        'confirmRegister.enterCode': 'Bitte geben Sie Ihre E-Mail und den erhaltenen Bestätigungscode ein',
        'confirmRegister.email': 'E-Mail-Adresse',
        'confirmRegister.confirmationCode': 'Bestätigungscode',
        'confirmRegister.emailRequired': 'E-Mail ist erforderlich',
        'confirmRegister.emailInvalid': 'Ungültige E-Mail-Adresse',
        'confirmRegister.codeRequired': 'Bestätigungscode ist erforderlich',
        'confirmRegister.codeLength': 'Bestätigungscode muss 6 Zeichen lang sein',
        'confirmRegister.confirming': 'Wird bestätigt...',
        'confirmRegister.verifying': 'Wird verifiziert...',
        'confirmRegister.confirm': 'Bestätigen',
        'confirmRegister.noCode': 'Code nicht erhalten?',
        'confirmRegister.tryAgain': 'Erneut versuchen',
        'message.registrationConfirmed': 'Registrierung bestätigt! Bitte melden Sie sich an.',
        // Forgot Password Page
        'forgotPassword.title': 'Passwort zurücksetzen',
        'forgotPassword.subtitle': 'Geben Sie Ihre E-Mail ein, um einen Passwort-Reset-Code zu erhalten',
        'forgotPassword.forgotPassword': 'Passwort vergessen?',
        'forgotPassword.requestCode': 'Reset-Code anfordern',
        'forgotPassword.resetPassword': 'Passwort zurücksetzen',
        'forgotPassword.enterEmail': 'Geben Sie Ihre E-Mail-Adresse ein, um einen Passwort-Reset-Code zu erhalten',
        'forgotPassword.enterCode': 'Geben Sie den erhaltenen Code und Ihr neues Passwort ein',
        'forgotPassword.email': 'E-Mail-Adresse',
        'forgotPassword.resetCode': 'Reset-Code',
        'forgotPassword.newPassword': 'Neues Passwort',
        'forgotPassword.confirmPassword': 'Neues Passwort bestätigen',
        'forgotPassword.emailRequired': 'E-Mail ist erforderlich',
        'forgotPassword.emailInvalid': 'Ungültige E-Mail-Adresse',
        'forgotPassword.codeRequired': 'Reset-Code ist erforderlich',
        'forgotPassword.codeLength': 'Reset-Code muss 6 Zeichen lang sein',
        'forgotPassword.newPasswordRequired': 'Neues Passwort ist erforderlich',
        'forgotPassword.passwordLength': 'Passwort muss mindestens 8 Zeichen lang sein',
        'forgotPassword.confirmPasswordRequired': 'Bitte bestätigen Sie Ihr neues Passwort',
        'forgotPassword.passwordMismatch': 'Passwörter stimmen nicht überein',
        'forgotPassword.sendingCode': 'Code wird gesendet...',
        'forgotPassword.sendCode': 'Reset-Code senden',
        'forgotPassword.resetting': 'Passwort wird zurückgesetzt...',
        'forgotPassword.resetPasswordBtn': 'Passwort zurücksetzen',
        'forgotPassword.rememberPassword': 'Passwort wieder eingefallen?',
        'forgotPassword.signIn': 'Anmelden',
        'forgotPassword.sendCodeFailed': 'Fehler beim Senden des Reset-Codes',
        'forgotPassword.resetFailed': 'Fehler beim Zurücksetzen des Passworts',
        'forgotPassword.existingResetCode': 'Haben Sie bereits einen Reset-Code?',
        'message.passwordResetSuccess': 'Passwort erfolgreich zurückgesetzt! Bitte melden Sie sich an.',
        // Additional Forgot Password keys
        'forgotPassword.checkEmail': 'Überprüfen Sie Ihre E-Mail',
        'forgotPassword.resetLinkSent': 'Wir haben Ihnen einen Passwort-Reset-Link gesendet',
        'forgotPassword.emailSent': 'E-Mail erfolgreich gesendet',
        'forgotPassword.checkInbox': 'Bitte überprüfen Sie Ihren E-Mail-Posteingang und folgen Sie den Anweisungen zum Zurücksetzen Ihres Passworts.',
        'forgotPassword.orUseCode': 'Oder wenn Sie einen Reset-Code haben, können Sie ihn direkt verwenden:',
        'forgotPassword.backToLogin': 'Zurück zur Anmeldung',
        'forgotPassword.useResetCode': 'Reset-Code verwenden',
        'forgotPassword.tryDifferentEmail': 'Verschiedene E-Mail versuchen',
        'forgotPassword.sending': 'Wird gesendet...',
        'forgotPassword.sendResetLink': 'Reset-Link senden',
        'auth.rememberPassword': 'Passwort wieder eingefallen?',
        'message.resetEmailSent': 'Passwort-Reset-E-Mail erfolgreich gesendet',
        // Reset Password Page
        'resetPassword.chooseOption': 'Haben Sie bereits einen Reset-Code?',
        'resetPassword.yesHaveCode': 'Ja, ich habe einen Reset-Code',
        'resetPassword.noNeedCode': 'Nein, ich muss einen Code anfordern',
        'resetPassword.back': 'Zurück',
        'resetPassword.success': 'Passwort erfolgreich zurückgesetzt',
        'resetPassword.passwordUpdated': 'Ihr Passwort wurde erfolgreich aktualisiert',
        'resetPassword.resetComplete': 'Reset abgeschlossen',
        'resetPassword.canLoginNow': 'Sie können sich jetzt mit Ihrem neuen Passwort anmelden.',
        'resetPassword.loginNow': 'Jetzt anmelden',
        'resetPassword.title': 'Passwort zurücksetzen',
        'resetPassword.subtitle': 'Geben Sie Ihre E-Mail, den Reset-Code und das neue Passwort ein',
        'resetPassword.resetPassword': 'Passwort zurücksetzen',
        'resetPassword.enterDetails': 'Bitte geben Sie Ihre E-Mail, den erhaltenen Reset-Code und Ihr neues Passwort ein.',
        'resetPassword.resetCode': 'Reset-Code',
        'resetPassword.newPassword': 'Neues Passwort',
        'resetPassword.confirmPassword': 'Neues Passwort bestätigen',
        'resetPassword.resetting': 'Passwort wird zurückgesetzt...',
        'resetPassword.needResetCode': 'Benötigen Sie einen Reset-Code?',
        'resetPassword.requestCode': 'Hier anfordern',
        'validation.resetCodeRequired': 'Reset-Code ist erforderlich',
        'validation.resetCodeMinLength': 'Reset-Code muss mindestens 6 Zeichen lang sein',
        'validation.newPasswordRequired': 'Neues Passwort ist erforderlich',
        // Messages
        'message.loggedOut': 'Erfolgreich abgemeldet',
        'message.registrationPending': 'Bitte überprüfen Sie Ihre E-Mail für den Bestätigungscode',
        'message.passwordResetSent': 'Passwort-Reset-Code an Ihre E-Mail gesendet',
        'message.loginToSubmit': 'Bitte melden Sie sich an oder erstellen Sie ein Konto, um Ihren Fall einzureichen',
        'message.passwordChanged': 'Passwort erfolgreich geändert',
        'message.passwordChangeFailed': 'Passwortänderung fehlgeschlagen',
        'message.formDataRestored': 'Ihre Formulardaten wurden wiederhergestellt',
        'message.formDataExpired': 'Ihre gespeicherten Formulardaten sind abgelaufen. Bitte füllen Sie das Formular erneut aus.',
        'message.failedToOpenAttachment': 'Anhang konnte nicht geöffnet werden',
        'message.failedToRefreshAttachments': 'Anhänge konnten nicht aktualisiert werden',
        // HTTP Error Messages
        'error.http.400': 'Bei der Benutzereingabe ist ein Fehler aufgetreten: {message}',
        'error.http.401': 'Sie sind nicht eingeloggt. Bitte melden Sie sich erneut an.',
        'error.http.403': 'Sie sind nicht berechtigt, diese Aktion auszuführen: {message}',
        'error.http.404': 'Die angeforderte Ressource wurde nicht gefunden.',
        'error.http.500': 'Es ist ein serverseitiger Fehler aufgetreten. Bitte versuchen Sie es erneut. Sollte dieser Fehler weiterhin auftreten, wenden Sie sich bitte an den Support.',
        'error.http.generic': 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        // Form Data Management
        'formData.expiryWarning': 'Formulardaten laufen bald ab',
        'formData.expiryMessage': 'Ihre gespeicherten Formulardaten laufen in {hours} Stunden ab.',
        'formData.submitNow': 'Jetzt einreichen',
        'formData.dismiss': 'Verwerfen',
        // Profile
        'profile.title': 'Benutzerprofil',
        'profile.subtitle': 'Verwalten Sie Ihr Konto',
        'profile.personalInfo': 'Persönliche Informationen',
        'profile.personalInformation': 'Persönliche Informationen',
        'profile.security': 'Sicherheitseinstellungen',
        'profile.preferences': 'Einstellungen',
        'profile.notifications': 'Benachrichtigungen',
        'profile.securityComingSoon': 'Sicherheitseinstellungen werden bald verfügbar sein',
        'profile.preferencesComingSoon': 'Einstellungen werden bald verfügbar sein',
        'profile.notificationsComingSoon': 'Benachrichtigungseinstellungen werden bald verfügbar sein',
        'profile.edit': 'Bearbeiten',
        'profile.save': 'Speichern',
        'profile.cancel': 'Abbrechen',
        'profile.userDataSaved': 'Benutzerdaten erfolgreich gespeichert',
        'profile.failedToSave': 'Fehler beim Speichern der Benutzerdaten',
        'profile.userNotFound': 'Benutzer nicht gefunden',
        // Common
        'common.loading': 'Lädt...',
        'common.error': 'Fehler',
        'common.success': 'Erfolg',
        'common.warning': 'Warnung',
        'common.info': 'Information',
        'common.backToHome': 'Zurück zur Startseite',
        'common.cancel': 'Abbrechen',
        'common.retry': 'Wiederholen',
        'common.submit': 'Absenden',
        'common.working': 'Wird verarbeitet...',
        'common.chooseFile': 'Datei auswählen',
        'common.noFileChosen': 'Keine Datei ausgewählt',
        'common.selectedFile': 'Ausgewählt',
        'common.select': 'Auswählen',
        // Language names
        'language.german': 'Deutsch',
        'language.english': 'Englisch',
        'language.romanian': 'Rumänisch',
        // Symptoms
        'symptoms.title': 'Symptom-Fragebogen',
        'symptoms.description': 'Bitte beschreiben Sie Ihre Symptome im Detail',
        'symptoms.required': 'Bitte beschreiben Sie Ihre Symptome',
        'symptoms.placeholder': 'Beschreiben Sie Ihre Symptome hier...',
        'symptoms.duration': 'Wie lange haben Sie diese Symptome bereits?',
        'symptoms.durationRequired': 'Bitte wählen Sie die Dauer',
        'symptoms.selectDuration': 'Dauer auswählen...',
        'symptoms.lessThan24h': 'Weniger als 24 Stunden',
        'symptoms.1to3Days': '1-3 Tage',
        'symptoms.3to7Days': '3-7 Tage',
        'symptoms.1to2Weeks': '1-2 Wochen',
        'symptoms.moreThan2Weeks': 'Mehr als 2 Wochen',
        'symptoms.severity': 'Wie schwerwiegend sind Ihre Symptome?',
        'symptoms.severityRequired': 'Bitte wählen Sie die Schwere',
        'symptoms.selectSeverity': 'Schwere auswählen...',
        'symptoms.mild': 'Leicht',
        'symptoms.moderate': 'Mittel',
        'symptoms.severe': 'Schwer',
        'symptoms.additionalNotes': 'Zusätzliche Notizen',
        'symptoms.additionalNotesPlaceholder': 'Weitere Informationen, die Sie teilen möchten...',
        'symptoms.customNotes': 'Benutzerdefinierte Notizen',
        'symptoms.customNotesPlaceholder': 'Zusätzliche Notizen oder Kommentare...',
        'symptoms.submit': 'Symptome einreichen',
        'symptoms.reset': 'Formular zurücksetzen',
        'symptoms.submitted': 'Symptome erfolgreich eingereicht',
        'symptoms.error': 'Fehler beim Einreichen der Symptome',
        'symptoms.maxLengthExceeded': 'Maximal 2000 Zeichen erlaubt',
        // Footer
        'footer.description': 'Ihr vertrauensvoller Partner für umfassende Gesundheitslösungen und medizinische Expertise.',
        // Address
        'address.completeAddress': 'Adresse vervollständigen',
        'address.completeAddressMessage': 'Um einen medizinischen Fall zu erstellen, benötigen wir Ihre vollständigen Adressdaten. Bitte füllen Sie die erforderlichen Felder unten aus.',
        'address.addressInformation': 'Adressinformationen',
        'address.saveAndContinue': 'Speichern & Fortfahren',
        'address.county': 'Kreis',
        'address.countyRequired': 'Kreis ist erforderlich',
        'address.countyTooltip': 'Bitte geben Sie Ihren Kreisnamen ein',
        'address.city': 'Stadt',
        'address.cityRequired': 'Stadt ist erforderlich',
        'address.cityTooltip': 'Geben Sie den Stadtnamen ein',
        'address.postalCode': 'Postleitzahl',
        'address.postalCodeRequired': 'Postleitzahl ist erforderlich',
        'address.postalCodeTooltip': 'Geben Sie eine 6-stellige Postleitzahl ein',
        'address.postalCodeInvalid': 'Bitte geben Sie eine gültige 6-stellige Postleitzahl ein',
        'address.street': 'Straße',
        'address.streetRequired': 'Straße ist erforderlich',
        'address.streetTooltip': 'Geben Sie den Straßennamen ein',
        'address.houseNumber': 'Hausnummer',
        'address.houseNumberRequired': 'Hausnummer ist erforderlich',
        'address.houseNumberTooltip': 'Geben Sie die Hausnummer ein',
        'address.houseNumberInvalid': 'Bitte geben Sie eine gültige Hausnummer ein (1-9 Ziffern)',
        'address.block': 'Block',
        'address.blockTooltip': 'Geben Sie die Blocknummer ein',
        'address.blockInvalid': 'Bitte geben Sie eine gültige Blocknummer ein (0-9 Ziffern)',
        'address.entrance': 'Eingang',
        'address.entranceTooltip': 'Geben Sie die Eingangsnummer ein',
        'address.entranceInvalid': 'Bitte geben Sie eine gültige Eingangsnummer ein (0-9 Ziffern)',
        'address.floor': 'Etage',
        'address.floorTooltip': 'Geben Sie die Etagennummer ein',
        'address.floorInvalid': 'Bitte geben Sie eine gültige Etagennummer ein (0-9 Ziffern)',
        'address.apartment': 'Wohnung',
        'address.apartmentTooltip': 'Geben Sie die Wohnungsnummer ein',
        'address.apartmentInvalid': 'Bitte geben Sie eine gültige Wohnungsnummer ein (0-9 Ziffern)',
        'footer.services': 'Unsere Dienstleistungen',
        'footer.contact': 'Kontaktinformationen',
        'footer.hours': 'Öffnungszeiten',
        'footer.monFri': 'Montag - Freitag: 8:00 - 18:00 Uhr',
        'footer.saturday': 'Samstag: 9:00 - 16:00 Uhr',
        'footer.sunday': 'Sonntag: Geschlossen',
        'footer.emergency': 'Notfall: 24/7 verfügbar',
        'footer.copyright': '© 2024 Lonvia. Alle Rechte vorbehalten.',
        // Services
        'services.urology': 'Urologie',
        'services.orthopedics': 'Orthopädie',
        'services.plasticSurgery': 'Plastische Chirurgie',
        'services.internalMedicine': 'Innere Medizin',
        'services.surgery': 'Chirurgie',
        'services.oncology': 'Onkologie',
        // Landing Page
        'landing.hero.title': 'Live longer, live well.',
        'landing.hero.subtitle': 'Verbinden Sie sich mit erstklassigen medizinischen Fachkräften für personalisierte Gesundheitslösungen',
        'landing.hero.bookAppointment': 'Termin Buchen',
        'landing.hero.learnMore': 'Mehr Erfahren',
        'landing.welcome.title': 'Willkommen bei Lonvia',
        'landing.welcome.description': 'Wir sind bestrebt, außergewöhnliche Gesundheitsdienstleistungen mit Fokus auf Patientenkomfort, fortschrittliche Medizintechnik und personalisierte Pflege anzubieten.',
        'landing.welcome.expertCare': 'Expertenpflege',
        'landing.welcome.expertCareDesc': 'Unser Team erfahrener Spezialisten bietet umfassende medizinische Versorgung mit den neuesten Behandlungen.',
        'landing.welcome.easyAccess': 'Einfacher Zugang',
        'landing.welcome.easyAccessDesc': 'Einfacher und bequemer Zugang zu Gesundheitsdienstleistungen über unsere benutzerfreundliche Plattform.',
        'landing.welcome.securePlatform': 'Sichere Plattform',
        'landing.welcome.securePlatformDesc': 'Ihre Gesundheitsinformationen werden mit modernsten Sicherheitsmaßnahmen geschützt.',
        'landing.doctors.title': 'Lernen Sie Unsere Expertenärzte Kennen',
        'landing.doctors.subtitle': 'Unser Team von zertifizierten Ärzten bringt Jahrzehnte kombinierter Erfahrung in der Bereitstellung außergewöhnlicher Gesundheitsversorgung mit.',
        'landing.services.title': 'Unsere Medizinischen Dienstleistungen',
        'landing.services.subtitle': 'Umfassende Gesundheitslösungen, die auf Ihre Bedürfnisse zugeschnitten sind',
        'landing.services.learnMore': 'Mehr Erfahren',
        'landing.cta.title': 'Bereit Loszulegen?',
        'landing.cta.subtitle': 'Machen Sie den ersten Schritt zu besserer Gesundheit. Kontaktieren Sie uns heute, um Ihre Beratung zu planen.',
        'landing.cta.getStarted': 'Loslegen',
        'landing.cta.contactUs': 'Kontaktieren Sie Uns',
        // Reviews Section
        'landing.reviews.title': 'Was Unsere Patienten Sagen',
        'landing.reviews.subtitle': 'Echte Erfahrungen von Patienten, die Lonvia Healthcare mit ihren medizinischen Bedürfnissen vertrauen',
        // Stats
        'stats.happyPatients': 'Zufriedene Patienten',
        'stats.medicalSpecialists': 'Medizinische Spezialisten',
        'stats.yearsExcellence': 'Jahre Exzellenz',
        'stats.emergencyCare': 'Notfallversorgung',
        // Reviews
        'reviews.exceptional.title': 'Außergewöhnliche Pflege',
        'reviews.exceptional.body': 'Das medizinische Team bei Lonvia bot während meiner Behandlung hervorragende Pflege. Professionell, mitfühlend und gründlich.',
        'reviews.recommended.title': 'Sehr Empfohlen',
        'reviews.recommended.body': 'Von der Terminplanung bis zur Behandlung war alles nahtlos. Die Ärzte nahmen sich Zeit, alles klar zu erklären.',
        'reviews.outstanding.title': 'Hervorragender Service',
        'reviews.outstanding.body': 'Das gesamte Personal war unglaublich hilfsbereit und professionell. Ich fühlte mich während meines Besuchs wohl und gut versorgt.',
        // Benefits
        'benefits.whyChoose': 'Warum Lonvia Healthcare Wählen?',
        'benefits.expertCare': 'Expertenmedizinische Versorgung',
        'benefits.expertCareDesc': 'Zugang zu zertifizierten Spezialisten in mehreren medizinischen Disziplinen.',
        'benefits.convenientScheduling': 'Bequeme Terminplanung',
        'benefits.convenientSchedulingDesc': 'Einfache Online-Terminbuchung mit flexiblen Terminoptionen.',
        'benefits.comprehensiveServices': 'Umfassende Dienstleistungen',
        'benefits.comprehensiveServicesDesc': 'Vollständige Palette medizinischer Dienstleistungen von der Präventivmedizin bis zu spezialisierten Behandlungen.',
        // Service Descriptions
        'services.urology.desc': 'Spezialisierte Versorgung für Harnwegs- und männliche Fortpflanzungsgesundheitsprobleme.',
        'services.orthopedics.desc': 'Umfassende Behandlung von Knochen-, Gelenk- und Muskelbeschwerden.',
        'services.plasticSurgery.desc': 'Ästhetische und rekonstruktive chirurgische Eingriffe.',
        'services.internalMedicine.desc': 'Diagnose und Behandlung von Erwachsenenerkrankungen und -zuständen.',
        'services.surgery.desc': 'Fortschrittliche chirurgische Eingriffe in verschiedenen medizinischen Fachgebieten.',
        'services.oncology.desc': 'Umfassende Krebsversorgung und Behandlungsdienste.',
        // Contact Page
        'contact.title': 'Kontakt',
        'contact.subtitle': 'Treten Sie in Kontakt mit unserem Gesundheitsteam',
        'contact.info.title': 'Kontaktinformationen',
        'contact.form.title': 'Senden Sie uns eine Nachricht',
        'contact.phone': 'Telefon',
        'contact.email': 'E-mail',
        'contact.address': 'Adresse',
        'contact.form.name': 'Name',
        'contact.form.namePlaceholder': 'Ihr Name',
        'contact.form.email': 'E-mail',
        'contact.form.emailPlaceholder': 'ihre.email@beispiel.com',
        'contact.form.subject': 'Betreff',
        'contact.form.subjectPlaceholder': 'Nachrichtenbetreff',
        'contact.form.message': 'Nachricht',
        'contact.form.messagePlaceholder': 'Ihre Nachricht hier...',
        'contact.form.send': 'Nachricht Senden',
        // Case
        'case.fetchError': 'Fehler beim Laden der Fälle',
        'case.errorTitle': 'Fehler beim Laden der Fälle',
        'case.overview.title': 'Meine Fälle',
        'case.overview.description': 'Anzeigen und verwalten Sie Ihre medizinischen Fälle',
        'case.create': 'Neuen Fall erstellen',
        'case.stats.total': 'Gesamte Fälle',
        'case.stats.active': 'Aktive Fälle',
        'case.stats.recent': 'Neue Fälle',
        'case.maxRetriesReached': 'Maximale Anzahl an Wiederholungsversuchen erreicht',
        'case.retryAttempts': 'Wiederholungsversuche',
        'case.maxRetriesMessage': 'Maximale Anzahl an Wiederholungsversuchen erreicht. Bitte versuchen Sie es später erneut.',
        // Status translations
        'status.new': 'Neu',
        'status.offer_sent': 'Angebot Gesendet',
        'status.accepted': 'Akzeptiert',
        'status.waiting_for_payment': 'Warten auf Zahlung',
        'status.paid': 'Bezahlt',
        'status.timeslots_sent': 'Zeitslots Gesendet',
        'status.arranged': 'Termin vereinbart',
        'status.in_consultation': 'In Beratung',
        'status.declined': 'Abgelehnt',
        'status.finished': 'Abgeschlossen',
        'status.unknown': 'Unbekannt',
        'status.moreInfo': 'Hier klicken für mehr Informationen',
        'status.flowTitle': 'Statusablauf',
        'status.flowOverview': 'Überblick über Status und deren Bedeutung:',
        'status.allowedNext': 'Erlaubte nächste Status',
        'status.noNext': 'Keine weiteren Übergänge erlaubt.',
        'status.setByAdmin': 'Status werden vom Administrator gesetzt.',
        'status.set': 'Status setzen',
        'status.next': 'Nächster Status',
        'status.flow.new': 'Admin sendet dem Nutzer ein Angebot',
        'status.flow.offer_sent': 'Nutzer muss das Angebot annehmen oder ablehnen. Eine Rechnung wird automatisch per E-Mail gesendet, wenn das Angebot akzeptiert wird.',
        'status.flow.waiting_for_payment': 'Nutzer muss die Rechnung bezahlen',
        'status.flow.paid': 'Admin schlägt einen Termin mit dem Arzt vor',
        'status.flow.timeslots_sent': 'Nutzer muss den Termin mindestens 1 Woche vor dem Treffen annehmen oder ablehnen',
        'status.flow.arranged': 'Termin mit dem Arzt ist vereinbart; Nutzer nimmt im Portal am Online-Termin teil',
        'status.flow.in_consultation': 'Arzt entscheidet, ob weitere Behandlung notwendig ist',
        'status.flow.declined': 'Der Nutzer hat das Angebot abgelehnt',
        'status.flow.finished': 'Keine weitere Behandlung nötig; der Fall ist beendet',
        // Case translations
        'case.noCases': 'Keine Fälle gefunden',
        'case.noCasesDescription': 'Erstellen Sie Ihren ersten Fall, um zu beginnen.',
        'case.noDescription': 'Keine Beschreibung',
        'case.duration': 'Dauer',
        'case.severity': 'Schweregrad',
        'case.created': 'Erstellt',
        'case.loadingDescription': 'Bitte warten Sie, während wir Ihre Fälle abrufen.',
        'case.details.setAppointment': 'Termin festlegen',
        'case.details.suggestAppointments': 'Termine vorschlagen',
        'case.details.timezoneInfo.title': 'Hinweis:',
        'case.details.timezoneInfo.message': 'Die eingegebene Zeit ist immer in deutscher Zeit (GMT+2). Termine müssen mindestens 2 Tage im Voraus sein.',
        'case.details.appointmentError': 'Bitte füllen Sie mindestens ein Termin-Datum aus.',
        'case.details.doctorError': 'Bitte wählen Sie einen Arzt aus.',
        'case.details.doctor': 'Arzt',
        'case.details.selectDoctor': 'Arzt auswählen',
        'case.details.duration': 'Dauer',
        'case.details.durationOptions.10min': '10 Min.',
        'case.details.durationOptions.15min': '15 Min.',
        'case.details.durationOptions.20min': '20 Min.',
        'case.details.durationOptions.30min': '30 Min.',
        'case.details.durationOptions.45min': '45 Min.',
        'case.details.durationOptions.60min': '60 Min.',
        'case.details.durationOptions.90min': '90 Min.',
        'case.details.durationOptions.120min': '120 Min.',
        'case.details.suggestedTimeslots': 'Vorgeschlagene Termine',
        'case.details.acceptTimeslot': 'Termin annehmen',
        'case.details.declineTimeslot': 'Ablehnen',
        'case.details.appointmentArranged.title': 'Termin vereinbart',
        'case.details.appointmentArranged.message': 'Der Termin mit dem Arzt ist zu den angegebenen Details vereinbart. Kommen Sie hier 15 Minuten vor dem Termin, um den Link zum Meeting zu erhalten. Falls der Link nicht angezeigt wird, aktualisieren Sie die Seite oder schauen Sie in Ihre E-Mails.',
        'case.details.appointmentArranged.date': 'Datum',
        'case.details.appointmentArranged.time': 'Uhrzeit',
        'case.details.appointmentArranged.duration': 'Dauer',
        'case.details.existingAppointments': 'Bestehende Termine',
        'case.details.paymentWarning.title': 'Zahlung erforderlich',
        'case.details.paymentWarning.message': 'Bitte bezahlen Sie die Rechnung, um mit Ihrem Fall fortzufahren. Sie haben die Rechnung per Email erhalten oder Sie können die Rechnung auch unterhalb herunterladen.',
        'case.details.paymentWarning.downloadInvoice': 'Rechnung herunterladen',
        'case.details.paymentWarning.alreadyPaid': 'Bereits bezahlt? Diese Information verschwindet, sobald die Zahlung bestätigt wird.',
        'case.details.offerInfo.title': 'Angebot erhalten',
        'case.details.offerInfo.message': 'Bitte lesen Sie das Angebot sorgfältig durch. Sie haben es per E-Mail erhalten oder können es unten herunterladen. Sie müssen es annehmen, um fortzufahren.',
        'case.details.offerInfo.validity': 'Das Angebot ist 2 Wochen gültig.',
        'case.details.offerInfo.downloadOffer': 'Angebot herunterladen',
        'case.details.timeslotsInfo.title': 'Wählen Sie Ihren Termin',
        'case.details.timeslotsInfo.message': 'Bitte wählen Sie einen der vorgeschlagenen Termine unten aus, um mit Ihrem Fall fortzufahren.',
        'case.details.noSymptoms': 'Keine Symptome erfasst',
        'case.details.withExistingDiagnosis': 'Mit einer bestehenden Diagnose',
        'case.details.diagnosis': 'Diagnose',
        // Admin Panel
        'admin.panel.title': 'Arbeitsbereich',
        'admin.panel.workInProcess': 'Arbeitsvorrat',
        'admin.panel.waitingForUser': 'Auf Nutzer warten',
        'admin.panel.arranged': 'Termin vereinbart',
        'admin.panel.inConsultation': 'In Beratung',
        'admin.panel.declined': 'Abgelehnt',
        'admin.panel.finished': 'Beendet',
        'admin.panel.loadCases': 'Fälle laden',
        'admin.status.manualChangeWarning': 'Diese Aktion sollte nur in besonderen Fällen verwendet werden. Normalerweise ändert sich der Status automatisch.',
        // Administration
        'admin.administration.title': 'Administration',
        'admin.administration.subtitle': 'Systemeinstellungen und Konfigurationen verwalten',
        'admin.administration.doctors': 'Arztverwaltung',
        'admin.administration.specialties': 'Fachbereichsverwaltung',
        'admin.administration.users': 'Benutzerverwaltung',
        'admin.administration.settings': 'Systemeinstellungen',
        'admin.administration.reports': 'Berichte & Analysen',
        // Specialty Management
        'specialty.title': 'Fachbereiche',
        'specialty.subspecialties': 'Unterfachbereiche',
        'specialty.add': 'Fachbereich hinzufügen',
        'specialty.addNew': 'Neuen Fachbereich hinzufügen',
        'specialty.edit': 'Fachbereich bearbeiten',
        'specialty.name': 'Name',
        'specialty.nameRequired': 'Name ist erforderlich',
        'specialty.namePlaceholder': 'Fachbereichsname eingeben',
        'specialty.description': 'Beschreibung',
        'specialty.descriptionPlaceholder': 'Fachbereichsbeschreibung eingeben',
        'specialty.active': 'Aktiv',
        'specialty.inactive': 'Inaktiv',
        'specialty.save': 'Speichern',
        'specialty.saving': 'Speichern...',
        'specialty.cancel': 'Abbrechen',
        'specialty.delete': 'Löschen',
        'specialty.deleteConfirm': 'Sind Sie sicher, dass Sie diesen Fachbereich löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
        'specialty.deleteTitle': 'Fachbereich löschen',
        'specialty.editTitle': 'Fachbereich bearbeiten',
        'specialty.noSpecialties': 'Keine Fachbereiche gefunden. Fügen Sie Ihren ersten Fachbereich oben hinzu.',
        'specialty.subspecialtiesCount': 'Unterfachbereiche',
        'specialty.failedToSave': 'Fehler beim Speichern des Fachbereichs. Bitte versuchen Sie es erneut.',
        'specialty.failedToDelete': 'Fehler beim Löschen des Fachbereichs. Bitte versuchen Sie es erneut.',
        // Subspecialty Management
        'subspecialty.title': 'Unterfachbereiche',
        'subspecialty.add': 'Unterfachbereich hinzufügen',
        'subspecialty.addNew': 'Neuen Unterfachbereich hinzufügen',
        'subspecialty.edit': 'Unterfachbereich bearbeiten',
        'subspecialty.name': 'Name',
        'subspecialty.nameRequired': 'Name ist erforderlich',
        'subspecialty.namePlaceholder': 'Unterfachbereichsname eingeben',
        'subspecialty.description': 'Beschreibung',
        'subspecialty.descriptionPlaceholder': 'Unterfachbereichsbeschreibung eingeben',
        'subspecialty.active': 'Aktiv',
        'subspecialty.inactive': 'Inaktiv',
        'subspecialty.save': 'Speichern',
        'subspecialty.saving': 'Speichern...',
        'subspecialty.cancel': 'Abbrechen',
        'subspecialty.delete': 'Löschen',
        'subspecialty.deleteConfirm': 'Sind Sie sicher, dass Sie diesen Unterfachbereich löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
        'subspecialty.deleteTitle': 'Unterfachbereich löschen',
        'subspecialty.editTitle': 'Unterfachbereich bearbeiten',
        'subspecialty.noSubspecialties': 'Keine Unterfachbereiche gefunden. Fügen Sie Ihren ersten Unterfachbereich oben hinzu.',
        'subspecialty.selectSpecialtyFirst': 'Bitte wählen Sie zuerst einen Fachbereich aus',
        'subspecialty.failedToSave': 'Fehler beim Speichern des Unterfachbereichs. Bitte versuchen Sie es erneut.',
        'subspecialty.failedToDelete': 'Fehler beim Löschen des Unterfachbereichs. Bitte versuchen Sie es erneut.',
        // Specialty Container
        'specialtyContainer.title': 'Fachbereiche & Unterfachbereiche verwalten',
        'specialtyContainer.subtitle': 'Erstellen und verwalten Sie medizinische Fachbereiche und ihre Unterfachbereiche',
        'specialtyContainer.loading': 'Fachbereiche werden geladen',
        'specialtyContainer.loadingMessage': 'Bitte warten Sie, während wir die Fachbereiche laden...',
        'specialtyContainer.failedToLoad': 'Fehler beim Laden der Fachbereiche. Bitte versuchen Sie es erneut.',
        'specialtyContainer.tryAgain': 'Erneut versuchen',
        'specialtyContainer.refresh': 'Aktualisieren',
        'specialtyContainer.selectSpecialty': 'Wählen Sie einen Fachbereich aus',
        'specialtyContainer.selectSpecialtyMessage': 'Wählen Sie einen Fachbereich aus der Liste aus, um seine Unterfachbereiche anzuzeigen und zu verwalten.',
        'specialtyContainer.selectedSpecialty': 'Ausgewählter Fachbereich:',
        'specialtyContainer.status': 'Status:',
        'specialtyContainer.subspecialties': 'Unterfachbereiche:',
        'specialtyContainer.created': 'Erstellt:',
        'specialtyContainer.description': 'Beschreibung:',
        'specialtyContainer.howToUse': 'So verwenden Sie es:',
        'specialtyContainer.leftPanel': 'Linkes Panel:',
        'specialtyContainer.leftPanelDesc': 'Fachbereiche verwalten - hinzufügen, bearbeiten, löschen und auswählen',
        'specialtyContainer.rightPanel': 'Rechtes Panel:',
        'specialtyContainer.rightPanelDesc': 'Unterfachbereiche für den ausgewählten Fachbereich verwalten',
        'specialtyContainer.selectSpecialtyDesc': 'Wählen Sie einen Fachbereich aus dem linken Panel aus, um seine Unterfachbereiche anzuzeigen und zu verwalten',
        'specialtyContainer.individualItems': 'Jedes Element',
        'specialtyContainer.individualItemsDesc': 'hat individuelle Speichern- und Löschen-Schaltflächen für granulare Kontrolle',
        'specialtyContainer.changesSaved': 'Änderungen werden sofort gespeichert',
        'specialtyContainer.changesSavedDesc': 'wenn Sie auf einem beliebigen Element auf Speichern klicken',
        // Doctor Management
        'doctor.overview.title': 'Arztverwaltung',
        'doctor.overview.add': 'Arzt hinzufügen',
        'doctor.overview.delete': 'Arzt löschen',
        'doctor.overview.noDoctors': 'Keine Ärzte gefunden',
        'doctor.overview.noDoctorsDescription': 'Beginnen Sie mit dem Hinzufügen Ihres ersten Arztes.',
        'doctor.overview.loading': 'Ärzte werden geladen...',
        'doctor.overview.selectDoctor': 'Wählen Sie einen Arzt zum Löschen aus',
        'doctor.details.title': 'Arztdetails',
        'doctor.details.create': 'Arzt erstellen',
        'doctor.details.edit': 'Arzt bearbeiten',
        'doctor.details.save': 'Speichern',
        'doctor.details.cancel': 'Abbrechen',
        'doctor.details.firstName': 'Vorname',
        'doctor.details.lastName': 'Nachname',
        'doctor.details.titleField': 'Titel',
        'doctor.details.licenseNumber': 'Lizenznummer',
        'doctor.details.licenseExpiry': 'Lizenzablaufdatum',
        'doctor.details.bio': 'Biografie',
        'doctor.details.consultationFee': 'Beratungsgebühr',
        'doctor.details.isActive': 'Aktiv',
        'doctor.details.specialties': 'Fachbereiche',
        'doctor.details.subspecialties': 'Unterfachbereiche',
        'doctor.details.addSpecialty': 'Fachbereich hinzufügen',
        'doctor.details.removeSpecialty': 'Entfernen',
        'doctor.details.language': 'Sprache',
        'doctor.profile.title': 'Arztprofil',
        'doctor.profile.subtitle': 'Ihr professionelles Profil verwalten',
        'doctor.delete.title': 'Arzt löschen',
        'doctor.delete.message': 'Sind Sie sicher, dass Sie diesen Arzt löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
        'doctor.delete.confirm': 'Löschen',
        'doctor.delete.cancel': 'Abbrechen',
        // Invoice
        'invoice.send': 'Rechnung senden',
        'invoice.paid': 'Rechnung bezahlt',
        // Documents
        'documents.offer': 'Angebot',
        'documents.invoice': 'Rechnung',
        // Case create - diagnosis
        'case.create.diagnosisUploadInfo': 'Laden Sie Ihre Diagnosedateien jetzt hoch. Sie werden nach der Erstellung mit Ihrem Fall verknüpft.',
        // Over
        'offer.send': 'Angebot senden',
        'offer.amount': 'Betrag',
        'offer.text': 'Angebotstext',
        'case.create.hasDiagnosis': 'Ich habe bereits eine Diagnose',
        // Demographic translations
        'demographic.title': 'Demografische Informationen',
        'demographic.gender': 'Geschlecht',
        'demographic.genderRequired': 'Geschlecht ist erforderlich',
        'demographic.selectGender': 'Geschlecht auswählen',
        'demographic.male': 'Männlich',
        'demographic.female': 'Weiblich',
        'demographic.other': 'Andere',
        'demographic.preferNotToSay': 'Möchte nicht angeben',
        'demographic.dateOfBirth': 'Geburtsdatum',
        'demographic.selectDay': 'Wähle Tag',
        'demographic.selectMonth': 'Wähle Monat',
        'demographic.selectYear': 'Wähle Jahr',
        'demographic.dayRequired': 'Tag ist erforderlich',
        'demographic.dayMin': 'Tag muss mindestens 1 sein',
        'demographic.dayMax': 'Tag muss höchstens 31 sein',
        'demographic.monthRequired': 'Monat ist erforderlich',
        'demographic.monthMin': 'Monat muss mindestens 1 sein',
        'demographic.monthMax': 'Monat muss höchstens 12 sein',
        'demographic.yearRequired': 'Jahr ist erforderlich',
        'demographic.yearMin': 'Jahr muss mindestens 1900 sein',
        'demographic.yearMax': 'Jahr kann nicht in der Zukunft liegen',
        'demographic.height': 'Größe (cm)',
        'demographic.heightMin': 'Größe muss mindestens 50 cm sein',
        'demographic.heightMax': 'Größe muss höchstens 250 cm sein',
        'demographic.weight': 'Gewicht (kg)',
        'demographic.weightMin': 'Gewicht muss mindestens 20 kg sein',
        'demographic.weightMax': 'Gewicht muss höchstens 500 kg sein',
        'demographic.notProvided': 'Nicht angegeben',
        'demographic.userNotFound': 'Benutzer nicht gefunden',
        // Wizard translations
        'wizard.completeProfile': 'Profil vervollständigen',
        'wizard.completeProfileMessage': 'Um eine bessere Behandlung zu erhalten, wäre es hilfreich, die folgenden Informationen bereitzustellen.',
        'wizard.personalInfo': 'Persönliche Info',
        'wizard.demographic': 'Demografisch',
        'wizard.saveAndContinue': 'Speichern & Fortfahren',
        'wizard.createCase': 'Medizinischen Fall erstellen',
        'wizard.createCaseDescription': 'Bitte beschreiben Sie Ihre Symptome und vervollständigen Sie Ihr Profil, um einen medizinischen Fall zu erstellen.',
        'wizard.saveAndSubmit': 'Speichern & Fall einreichen',
        // Common additional translations
        'common.next': 'Weiter',
        'common.back': 'Zurück',
        'common.edit': 'Bearbeiten',
        'common.saving': 'Speichern...',
        'common.save': 'Speichern',
        // Case details translations
        'case.details.medicalForm': 'Medizinischer Fragebogen',
        'case.details.receipts': 'Belege',
        'case.details.documents': 'Dokumente',
        'case.details.notes': 'Notizen',
        'case.details.infos': 'Informationen',
        'case.details.customerName': 'Kundenname:',
        'case.details.appointmentDate': 'Termin:',
        'case.details.gender': 'Geschlecht:',
        'case.details.height': 'Größe:',
        'case.details.weight': 'Gewicht:',
        'case.details.dateOfBirth': 'Geburtsdatum:',
        'case.details.notesPlaceholder': 'Notizen von Ärzten. (Dies ist ein Textfeld, das von allen gesehen werden kann).',
        'case.details.upload': 'Hochladen',
        'case.details.download': 'Herunterladen',
        'case.details.open': 'Öffnen',
        'case.details.view': 'Anzeigen',
        'case.details.noDocuments': 'Noch keine Dokumente hochgeladen',
        'case.details.delete': 'Löschen',
        'case.details.deleteConfirm': 'Sind Sie sicher, dass Sie dieses Dokument löschen möchten?',
        'case.details.deleteConfirmTitle': 'Dokument löschen',
        'case.details.cancel': 'Abbrechen',
        'case.details.symptom': 'Symptom',
        'case.details.answerOfUser': 'Antwort des Benutzers',
        'case.details.acceptOffer': 'Angebot annehmen',
        'case.details.acceptOfferTitle': 'Angebot annehmen',
        'case.details.acceptOfferMessage': 'Möchten Sie das Angebot annehmen? Mit der Annahme bestätigen Sie, dass Sie das Angebot gelesen und verstanden haben.',
        // Upload wizard additions
        'case.details.uploadFileHint': 'Laden Sie PNG, JPG, JPEG, PDF, DICOM, NIfTI usw. hoch.',
        'case.details.linkPlaceholder': 'https://beispiel.de/ressource',
        'case.details.linkHint': 'Akzeptiert http(s), mailto:, tel: oder Domainnamen. Wird validiert.',
        'case.details.modeFile': 'Datei',
        'case.details.modeLink': 'Link',
        'case.details.modeQr': 'QR',
        'case.details.qrHint': 'Laden Sie ein Bild (PNG/JPG/JPEG/SVG) mit einem QR-Code hoch. Wir lesen es aus und speichern den Link.',
        'case.details.descriptionPlaceholder': 'Kurzbeschreibung (erforderlich)',
        'validation.fileTypeNotAllowed': 'Dieser Dateityp ist nicht erlaubt',
        'case.details.qrPdfNotSupported': 'QR aus PDF wird nicht unterstützt',
        // Calendar
        'calendar.title': 'Kalender',
        'calendar.legend.selected': 'Ausgewähltes Datum',
        'calendar.legend.today': 'Heute',
        'calendar.legend.hasAppointments': 'Hat Termine',
        'calendar.noAppointments': 'Keine Termine geplant für'
    },
    ro: {
        // Navigation
        'nav.login': 'Autentificare',
        'nav.register': 'Înregistrare',
        'nav.logout': 'Deconectare',
        'nav.language': 'Limbă',
        'nav.newCase': 'Caz Nou',
        'nav.services': 'Servicii',
        'nav.ourTeam': 'Echipa Noastră',
        'nav.contact': 'Contact',
        'nav.lonviaLabs': 'Lonvia Labs',
        'nav.about': 'Despre noi',
        'nav.profile': 'Profilul',
        'nav.adminPanel': 'Panou de Lucru',
        'nav.doctorPanel': 'Panou Doctor',
        'nav.signIn': 'Autentificare',
        'nav.getStarted': 'Începe',
        // Auth
        'auth.email': 'E-mail',
        'auth.password': 'Parolă',
        'auth.confirmPassword': 'Confirmă parola',
        'auth.firstName': 'Prenume',
        'auth.lastName': 'Nume',
        'auth.confirmCode': 'Cod de confirmare',
        'auth.newPassword': 'Parolă nouă',
        'auth.forgotPassword': 'Ai uitat parola?',
        'auth.resetPassword': 'Resetează parola',
        'auth.forceChangePasswordTitle': 'Actualizează parola',
        'auth.forceChangePasswordSubtitle': 'Trebuie să setezi o parolă nouă înainte de a continua.',
        'auth.setNewPassword': 'Setează o parolă nouă',
        'auth.updatingPassword': 'Se actualizează parola...',
        'auth.updatePassword': 'Actualizează parola',
        'auth.confirmRegistration': 'Confirmă înregistrarea',
        'auth.alreadyHaveAccount': 'Ai deja un cont?',
        'auth.dontHaveAccount': 'Nu ai un cont?',
        'auth.loginHere': 'Autentifică-te aici',
        'auth.registerHere': 'Înregistrează-te aici',
        'auth.backToLogin': 'Înapoi la autentificare',
        'auth.sendCode': 'Trimite codul',
        'auth.confirm': 'Confirmă',
        'auth.submit': 'Trimite',
        'auth.notAuthorizedNotConfirmed': 'Eroare la autentificare. Parola sau utilizatorul nu există sau nu este confirmat.',
        // Password Validation
        'password.requirements': 'Cerințe pentru parolă:',
        'password.minLength': 'Cel puțin 8 caractere',
        'password.uppercase': 'Cel puțin o literă mare',
        'password.lowercase': 'Cel puțin o literă mică',
        'password.number': 'Cel puțin un număr',
        'password.symbol': 'Cel puțin un caracter special',
        // Form Validation Messages
        'validation.firstNameRequired': 'Prenumele este obligatoriu',
        'validation.firstNameMinLength': 'Prenumele trebuie să aibă cel puțin 2 caractere',
        'validation.lastNameRequired': 'Numele este obligatoriu',
        'validation.lastNameMinLength': 'Numele trebuie să aibă cel puțin 2 caractere',
        'validation.emailRequired': 'E-mailul este obligatoriu',
        'validation.emailInvalid': 'Adresă de e-mail invalidă',
        'validation.passwordRequired': 'Parola este obligatorie',
        'validation.passwordMinLength': 'Parola trebuie să aibă cel puțin 8 caractere',
        'validation.passwordComplexity': 'Parola trebuie să conțină cel puțin o literă mare, o literă mică, un număr și un caracter special',
        'validation.confirmPasswordRequired': 'Confirmarea parolei este obligatorie',
        'validation.passwordsDoNotMatch': 'Parolele nu se potrivesc',
        'validation.codeRequired': 'Codul de verificare este obligatoriu',
        'validation.codeMustBe6Digits': 'Codul trebuie să aibă 6 cifre',
        'validation.cnpRequired': 'CNP este obligatoriu',
        'validation.cnpInvalid': 'Format CNP invalid',
        // Login Page
        'login.title': 'Bun venit înapoi',
        'login.subtitle': 'Conectează-te pentru a accesa contul tău',
        'login.signIn': 'Conectare',
        'login.enterCredentials': 'Introdu credențialele pentru a continua',
        'login.rememberMe': 'Ține-mă minte',
        'login.signingIn': 'Se conectează...',
        'message.loggedIn': 'Conectat cu succes',
        'message.registrationSuccess': 'Înregistrarea reușită! Vă rugăm să verificați e-mailul pentru confirmare.',
        'message.registrationFailed': 'Înregistrarea a eșuat. Vă rugăm să încercați din nou.',
        'message.userAlreadyExists': 'Un cont cu această adresă de e-mail există deja. Vă rugăm să încercați să vă conectați în schimb.',
        'message.confirmationSuccess': 'E-mail confirmat cu succes! Acum vă puteți conecta.',
        // Register Page
        'register.title': 'Alătură-te Lonvia Healthcare',
        'register.subtitle': 'Înregistrează-te astăzi pentru a accesa serviciile noastre medicale complete și pentru a te conecta cu profesioniști de sănătate experimentați.',
        'register.createAccount': 'Creează-ți contul',
        'register.fillDetails': 'Te rugăm să completezi informațiile pentru a începe',
        'register.creatingAccount': 'Se creează contul...',
        'register.createAccountBtn': 'Creează contul',
        'register.firstName': 'Prenume',
        'register.lastName': 'Nume',
        'register.email': 'Adresă de e-mail',
        'register.password': 'Parolă',
        'register.repeatPassword': 'Confirmă parola',
        'register.firstNameRequired': 'Prenumele este obligatoriu',
        'register.lastNameRequired': 'Numele este obligatoriu',
        'register.emailRequired': 'E-mailul este obligatoriu',
        'register.emailInvalid': 'Adresă de e-mail invalidă',
        'register.passwordRequired': 'Parola este obligatorie',
        'register.repeatPasswordRequired': 'Te rugăm să confirmi parola',
        'register.passwordMismatch': 'Parolele nu se potrivesc',
        // Confirm Register Page
        'confirmRegister.title': 'Confirmă-ți e-mailul',
        'confirmRegister.subtitle': 'Te rugăm să-ți verifici adresa de e-mail pentru a finaliza înregistrarea',
        'confirmRegister.confirmEmail': 'Confirmă e-mailul',
        'confirmRegister.enterCode': 'Te rugăm să introduci e-mailul și codul de confirmare pe care l-ai primit',
        'confirmRegister.email': 'Adresă de e-mail',
        'confirmRegister.confirmationCode': 'Cod de confirmare',
        'confirmRegister.emailRequired': 'E-mailul este obligatoriu',
        'confirmRegister.emailInvalid': 'Adresă de e-mail invalidă',
        'confirmRegister.codeRequired': 'Codul de confirmare este obligatoriu',
        'confirmRegister.codeLength': 'Codul de confirmare trebuie să aibă 6 caractere',
        'confirmRegister.confirming': 'Se confirmă...',
        'confirmRegister.verifying': 'Se verifică...',
        'confirmRegister.confirm': 'Confirmă',
        'confirmRegister.noCode': 'Nu ai primit codul?',
        'confirmRegister.tryAgain': 'Încearcă din nou',
        'message.registrationConfirmed': 'Înregistrarea confirmată! Te rugăm să te conectezi.',
        // Forgot Password Page
        'forgotPassword.title': 'Resetează-ți parola',
        'forgotPassword.subtitle': 'Introdu e-mailul pentru a primi un cod de resetare a parolei',
        'forgotPassword.forgotPassword': 'Ai uitat parola?',
        'forgotPassword.requestCode': 'Solicită codul de resetare',
        'forgotPassword.resetPassword': 'Resetează parola',
        'forgotPassword.enterEmail': 'Introdu adresa de e-mail pentru a primi un cod de resetare a parolei',
        'forgotPassword.enterCode': 'Introdu codul primit și noua ta parolă',
        'forgotPassword.email': 'Adresă de e-mail',
        'forgotPassword.resetCode': 'Cod de resetare',
        'forgotPassword.newPassword': 'Parolă nouă',
        'forgotPassword.confirmPassword': 'Confirmă parola nouă',
        'forgotPassword.emailRequired': 'E-mailul este obligatoriu',
        'forgotPassword.emailInvalid': 'Adresă de e-mail invalidă',
        'forgotPassword.codeRequired': 'Codul de resetare este obligatoriu',
        'forgotPassword.codeLength': 'Codul de resetare trebuie să aibă 6 caractere',
        'forgotPassword.newPasswordRequired': 'Parola nouă este obligatorie',
        'forgotPassword.passwordLength': 'Parola trebuie să aibă cel puțin 8 caractere',
        'forgotPassword.confirmPasswordRequired': 'Te rugăm să confirmi noua ta parolă',
        'forgotPassword.passwordMismatch': 'Parolele nu se potrivesc',
        'forgotPassword.sendingCode': 'Se trimite codul...',
        'forgotPassword.sendCode': 'Trimite codul de resetare',
        'forgotPassword.resetting': 'Se resetează parola...',
        'forgotPassword.resetPasswordBtn': 'Resetează parola',
        'forgotPassword.rememberPassword': 'Ți-ai amintit parola?',
        'forgotPassword.signIn': 'Conectare',
        'forgotPassword.sendCodeFailed': 'Eșec la trimiterea codului de resetare',
        'forgotPassword.resetFailed': 'Eșec la resetarea parolei',
        'forgotPassword.existingResetCode': 'Ai deja un cod de resetare?',
        'message.passwordResetSuccess': 'Parola resetată cu succes! Te rugăm să te conectezi.',
        // Additional Forgot Password keys
        'forgotPassword.checkEmail': 'Verifică-ți E-mailul',
        'forgotPassword.resetLinkSent': 'Ți-am trimis un link pentru resetarea parolei',
        'forgotPassword.emailSent': 'E-mail trimis cu succes',
        'forgotPassword.checkInbox': 'Te rugăm să verifici căsuța de e-mail și să urmezi instrucțiunile pentru resetarea parolei.',
        'forgotPassword.orUseCode': 'Sau dacă ai un cod de resetare, îl poți folosi direct:',
        'forgotPassword.backToLogin': 'Înapoi la autentificare',
        'forgotPassword.useResetCode': 'Folosește codul de resetare',
        'forgotPassword.tryDifferentEmail': 'Încearcă o adresă de e-mail diferită',
        'forgotPassword.sending': 'Se trimite...',
        'forgotPassword.sendResetLink': 'Trimite link-ul de resetare',
        'auth.rememberPassword': 'Ți-ai amintit parola?',
        'message.resetEmailSent': 'E-mailul de resetare a parolei a fost trimis cu succes',
        // Reset Password Page
        'resetPassword.chooseOption': 'Ai deja un cod de resetare?',
        'resetPassword.yesHaveCode': 'Da, am un cod de resetare',
        'resetPassword.noNeedCode': 'Nu, trebuie să solicit un cod',
        'resetPassword.back': 'Înapoi',
        'resetPassword.success': 'Parola resetată cu succes',
        'resetPassword.passwordUpdated': 'Parola ta a fost actualizată cu succes',
        'resetPassword.resetComplete': 'Resetare completă',
        'resetPassword.canLoginNow': 'Acum te poți conecta cu noua ta parolă.',
        'resetPassword.loginNow': 'Conectează-te acum',
        'resetPassword.title': 'Resetează parola',
        'resetPassword.subtitle': 'Introdu e-mailul, codul de resetare și noua parolă',
        'resetPassword.resetPassword': 'Resetează parola',
        'resetPassword.enterDetails': 'Te rugăm să introduci e-mailul, codul de resetare pe care l-ai primit și noua ta parolă.',
        'resetPassword.resetCode': 'Cod de resetare',
        'resetPassword.newPassword': 'Parolă nouă',
        'resetPassword.confirmPassword': 'Confirmă parola nouă',
        'resetPassword.resetting': 'Se resetează parola...',
        'resetPassword.needResetCode': 'Ai nevoie de un cod de resetare?',
        'resetPassword.requestCode': 'Solicită unul aici',
        'validation.resetCodeRequired': 'Codul de resetare este obligatoriu',
        'validation.resetCodeMinLength': 'Codul de resetare trebuie să aibă cel puțin 6 caractere',
        'validation.newPasswordRequired': 'Parola nouă este obligatorie',
        // Messages
        'message.loggedOut': 'Deconectat cu succes',
        'message.registrationPending': 'Te rugăm să verifici e-mailul pentru codul de confirmare',
        'message.passwordResetSent': 'Codul de resetare a parolei a fost trimis pe e-mail',
        'message.loginToSubmit': 'Vă rugăm să vă conectați sau să creați un cont pentru a trimite cazul dvs.',
        'message.passwordChanged': 'Parola a fost schimbată cu succes',
        'message.passwordChangeFailed': 'Schimbarea parolei a eșuat',
        'message.formDataRestored': 'Datele dvs. de formular au fost restaurate',
        'message.formDataExpired': 'Datele dvs. salvate de formular au expirat. Vă rugăm să completați din nou formularul.',
        'message.failedToOpenAttachment': 'Deschiderea atașamentului a eșuat',
        'message.failedToRefreshAttachments': 'Actualizarea atașamentelor a eșuat',
        // HTTP Error Messages
        'error.http.400': 'A apărut o eroare la introducerea utilizatorului: {message}',
        'error.http.401': 'Nu sunteți conectat. Vă rugăm să vă conectați din nou.',
        'error.http.403': 'Nu aveți autorizația să efectuați această acțiune: {message}',
        'error.http.404': 'Resursa solicitată nu a fost găsită.',
        'error.http.500': 'A apărut o eroare de server. Vă rugăm să încercați din nou. Dacă această eroare persistă, vă rugăm să contactați suportul.',
        'error.http.generic': 'A apărut o eroare neașteptată. Vă rugăm să încercați din nou.',
        // Form Data Management
        'formData.expiryWarning': 'Datele de formular expiră în curând',
        'formData.expiryMessage': 'Datele dvs. salvate de formular vor expira în {hours} ore.',
        'formData.submitNow': 'Trimite acum',
        'formData.dismiss': 'Respinge',
        // Profile
        'profile.title': 'Profil utilizator',
        'profile.subtitle': 'Gestionează-ți contul',
        'profile.personalInfo': 'Informații personale',
        'profile.personalInformation': 'Informații personale',
        'profile.security': 'Setări de securitate',
        'profile.preferences': 'Preferințe',
        'profile.notifications': 'Notificări',
        'profile.securityComingSoon': 'Setările de securitate vor fi disponibile în curând',
        'profile.preferencesComingSoon': 'Preferințele vor fi disponibile în curând',
        'profile.notificationsComingSoon': 'Setările de notificări vor fi disponibile în curând',
        'profile.edit': 'Editează',
        'profile.save': 'Salvează',
        'profile.cancel': 'Anulează',
        'profile.userDataSaved': 'Datele utilizatorului au fost salvate cu succes',
        'profile.failedToSave': 'Eșec la salvarea datelor utilizatorului',
        'profile.userNotFound': 'Utilizatorul nu a fost găsit',
        // Common
        'common.loading': 'Se încarcă...',
        'common.error': 'Eroare',
        'common.success': 'Succes',
        'common.warning': 'Avertisment',
        'common.info': 'Informații',
        'common.backToHome': 'Înapoi la Pagina Principală',
        'common.cancel': 'Anulează',
        'common.retry': 'Reîncearcă',
        'common.submit': 'Trimite',
        'common.working': 'Se procesează...',
        'common.chooseFile': 'Selectează fișier',
        'common.noFileChosen': 'Niciun fișier selectat',
        'common.selectedFile': 'Selectat',
        'common.select': 'Selectează',
        // Language names
        'language.german': 'Germană',
        'language.english': 'Engleză',
        'language.romanian': 'Română',
        // Symptoms
        'symptoms.title': 'Chestionar de Simptome',
        'symptoms.description': 'Vă rugăm să descrieți simptomele în detaliu',
        'symptoms.required': 'Vă rugăm să descrieți simptomele',
        'symptoms.placeholder': 'Descrieți simptomele aici...',
        'symptoms.duration': 'De cât timp aveți aceste simptome?',
        'symptoms.durationRequired': 'Vă rugăm să selectați durata',
        'symptoms.selectDuration': 'Selectați durata...',
        'symptoms.lessThan24h': 'Mai puțin de 24 de ore',
        'symptoms.1to3Days': '1-3 zile',
        'symptoms.3to7Days': '3-7 zile',
        'symptoms.1to2Weeks': '1-2 săptămâni',
        'symptoms.moreThan2Weeks': 'Mai mult de 2 săptămâni',
        'symptoms.severity': 'Cât de severe sunt simptomele?',
        'symptoms.severityRequired': 'Vă rugăm să selectați severitatea',
        'symptoms.selectSeverity': 'Selectați severitatea...',
        'symptoms.mild': 'Ușoare',
        'symptoms.moderate': 'Moderate',
        'symptoms.severe': 'Severe',
        'symptoms.additionalNotes': 'Note suplimentare',
        'symptoms.additionalNotesPlaceholder': 'Orice informații suplimentare pe care doriți să le împărtășiți...',
        'symptoms.customNotes': 'Note personalizate',
        'symptoms.customNotesPlaceholder': 'Note suplimentare sau comentarii...',
        'symptoms.submit': 'Trimite Simptomele',
        'symptoms.reset': 'Resetează Formularul',
        'symptoms.submitted': 'Simptomele au fost trimise cu succes',
        'symptoms.error': 'Eșec la trimiterea simptomelor',
        'symptoms.maxLengthExceeded': 'Maxim 2000 de caractere permise',
        // Footer
        'footer.description': 'Partenerul tău de încredere pentru soluții complete de sănătate și expertiză medicală.',
        // Address
        'address.completeAddress': 'Completează-ți adresa',
        'address.completeAddressMessage': 'Pentru a crea un caz medical, avem nevoie de informațiile complete despre adresa ta. Te rugăm să completezi câmpurile obligatorii de mai jos.',
        'address.addressInformation': 'Informații despre adresă',
        'address.saveAndContinue': 'Salvează & Continuă',
        'address.county': 'Județ',
        'address.countyRequired': 'Județul este obligatoriu',
        'address.countyTooltip': 'Te rugăm să introduci numele județului',
        'address.city': 'Oraș',
        'address.cityRequired': 'Orașul este obligatoriu',
        'address.cityTooltip': 'Introdu numele orașului',
        'address.postalCode': 'Cod Poștal',
        'address.postalCodeRequired': 'Codul poștal este obligatoriu',
        'address.postalCodeTooltip': 'Introdu un cod poștal cu 6 cifre',
        'address.postalCodeInvalid': 'Te rugăm să introduci un cod poștal valid cu 6 cifre',
        'address.street': 'Stradă',
        'address.streetRequired': 'Strada este obligatorie',
        'address.streetTooltip': 'Introdu numele străzii',
        'address.houseNumber': 'Numărul Casei',
        'address.houseNumberRequired': 'Numărul casei este obligatoriu',
        'address.houseNumberTooltip': 'Introdu numărul casei',
        'address.houseNumberInvalid': 'Te rugăm să introduci un număr valid al casei (1-9 cifre)',
        'address.block': 'Bloc',
        'address.blockTooltip': 'Introdu numărul blocului',
        'address.blockInvalid': 'Te rugăm să introduci un număr valid al blocului (0-9 cifre)',
        'address.entrance': 'Intrare',
        'address.entranceTooltip': 'Introdu numărul intrării',
        'address.entranceInvalid': 'Te rugăm să introduci un număr valid al intrării (0-9 cifre)',
        'address.floor': 'Etaj',
        'address.floorTooltip': 'Introdu numărul etajului',
        'address.floorInvalid': 'Te rugăm să introduci un număr valid al etajului (0-9 cifre)',
        'address.apartment': 'Apartament',
        'address.apartmentTooltip': 'Introdu numărul apartamentului',
        'address.apartmentInvalid': 'Te rugăm să introduci un număr valid al apartamentului (0-9 cifre)',
        'footer.services': 'Serviciile Noastre',
        'footer.contact': 'Informații de Contact',
        'footer.hours': 'Program de Funcționare',
        'footer.monFri': 'Luni - Vineri: 8:00 - 18:00',
        'footer.saturday': 'Sâmbătă: 9:00 - 16:00',
        'footer.sunday': 'Duminică: Închis',
        'footer.emergency': 'Urgențe: Disponibil 24/7',
        'footer.copyright': '© 2024 Lonvia. Toate drepturile rezervate.',
        // Services
        'services.urology': 'Urologie',
        'services.orthopedics': 'Ortopedie',
        'services.plasticSurgery': 'Chirurgie Plastică',
        'services.internalMedicine': 'Medicină Internă',
        'services.surgery': 'Chirurgie',
        'services.oncology': 'Oncologie',
        // Landing Page
        'landing.hero.title': 'Live longer, live well.',
        'landing.hero.subtitle': 'Conectează-te cu profesioniști medicali de clasă mondială pentru soluții personalizate de sănătate',
        'landing.hero.bookAppointment': 'Programează Consultația',
        'landing.hero.learnMore': 'Află Mai Multe',
        'landing.welcome.title': 'Bun Venit la Lonvia',
        'landing.welcome.description': 'Suntem dedicați să oferim servicii excepționale de sănătate cu accent pe confortul pacientului, tehnologia medicală avansată și îngrijirea personalizată.',
        'landing.welcome.expertCare': 'Îngrijire Expertă',
        'landing.welcome.expertCareDesc': 'Echipa noastră de specialiști experimentați oferă îngrijire medicală comprehensivă cu cele mai noi tratamente.',
        'landing.welcome.easyAccess': 'Acces Ușor',
        'landing.welcome.easyAccessDesc': 'Acces simplu și convenabil la serviciile de sănătate prin platforma noastră prietenoasă.',
        'landing.welcome.securePlatform': 'Platformă Sigură',
        'landing.welcome.securePlatformDesc': 'Informațiile tale de sănătate sunt protejate cu măsuri de securitate de ultimă generație.',
        'landing.doctors.title': 'Cunoaște Medicii Noștri Experți',
        'landing.doctors.subtitle': 'Echipa noastră de medici certificați aduce decenii de experiență combinată în oferirea de îngrijire medicală excepțională.',
        'landing.services.title': 'Serviciile Noastre Medicale',
        'landing.services.subtitle': 'Soluții complete de sănătate adaptate nevoilor tale',
        'landing.services.learnMore': 'Află Mai Multe',
        'landing.cta.title': 'Gata să Începi?',
        'landing.cta.subtitle': 'Fă primul pas către o sănătate mai bună. Contactează-ne astăzi pentru a-ți programa consultația.',
        'landing.cta.getStarted': 'Începe',
        'landing.cta.contactUs': 'Contactează-ne',
        // Reviews Section
        'landing.reviews.title': 'Ce Spun Pacienții Noștri',
        'landing.reviews.subtitle': 'Experiențe reale de la pacienți care au încredere în Lonvia Healthcare pentru nevoile lor medicale',
        // Stats
        'stats.happyPatients': 'Pacienți Mulțumiți',
        'stats.medicalSpecialists': 'Specialiști Medicali',
        'stats.yearsExcellence': 'Ani de Excelență',
        'stats.emergencyCare': 'Îngrijire de Urgență',
        // Reviews
        'reviews.exceptional.title': 'Îngrijire Excepțională',
        'reviews.exceptional.body': 'Echipa medicală de la Lonvia a oferit îngrijire excepțională în timpul tratamentului meu. Profesional, compasiune și minuțios.',
        'reviews.recommended.title': 'Foarte Recomandat',
        'reviews.recommended.body': 'De la programare până la tratament, totul a fost fără probleme. Medicii și-au luat timpul să explice totul clar.',
        'reviews.outstanding.title': 'Serviciu Remarcabil',
        'reviews.outstanding.body': 'Întregul personal a fost incredibil de ajutător și profesional. M-am simțit confortabil și bine îngrijit pe tot parcursul vizitei.',
        // Benefits
        'benefits.whyChoose': 'De Ce Să Alegi Lonvia Healthcare?',
        'benefits.expertCare': 'Îngrijire Medicală Expertă',
        'benefits.expertCareDesc': 'Acces la specialiști certificați în multiple discipline medicale.',
        'benefits.convenientScheduling': 'Programare Convenabilă',
        'benefits.convenientSchedulingDesc': 'Programare ușoară online cu opțiuni flexibile de programare.',
        'benefits.comprehensiveServices': 'Servicii Complete',
        'benefits.comprehensiveServicesDesc': 'Gamă completă de servicii medicale de la îngrijire preventivă până la tratamente specializate.',
        // Service Descriptions
        'services.urology.desc': 'Îngrijire specializată pentru problemele tractului urinar și sănătății reproductive masculine.',
        'services.orthopedics.desc': 'Tratament comprehensiv pentru afecțiuni ale oaselor, articulațiilor și mușchilor.',
        'services.plasticSurgery.desc': 'Proceduri chirurgicale estetice și reconstructice.',
        'services.internalMedicine.desc': 'Diagnostic și tratament pentru boli și afecțiuni adulte.',
        'services.surgery.desc': 'Proceduri chirurgicale avansate în diverse specialități medicale.',
        'services.oncology.desc': 'Servicii complete de îngrijire și tratament oncologic.',
        // Contact Page
        'contact.title': 'Contact',
        'contact.subtitle': 'Ia legătura cu echipa noastră de sănătate',
        'contact.info.title': 'Informații de Contact',
        'contact.form.title': 'Trimite-ne un Mesaj',
        'contact.phone': 'Telefon',
        'contact.email': 'E-mail',
        'contact.address': 'Adresă',
        'contact.form.name': 'Nume',
        'contact.form.namePlaceholder': 'Numele tău',
        'contact.form.email': 'E-mail',
        'contact.form.emailPlaceholder': 'emailul.tau@exemplu.com',
        'contact.form.subject': 'Subiect',
        'contact.form.subjectPlaceholder': 'Subiectul mesajului',
        'contact.form.message': 'Mesaj',
        'contact.form.messagePlaceholder': 'Mesajul tău aici...',
        'contact.form.send': 'Trimite Mesajul',
        // Case
        'case.fetchError': 'Eșec la încărcarea cazurilor',
        'case.errorTitle': 'Eroare la încărcarea cazurilor',
        'case.overview.title': 'Cazurile Mele',
        'case.overview.description': 'Vizualizează și gestionează cazurile tale medicale',
        'case.create': 'Creează Caz Nou',
        'case.stats.total': 'Total Cazuri',
        'case.stats.active': 'Cazuri Active',
        'case.stats.recent': 'Cazuri Recente',
        'case.maxRetriesReached': 'S-a atins numărul maxim de încercări',
        'case.retryAttempts': 'Încercări',
        'case.maxRetriesMessage': 'S-a atins numărul maxim de încercări. Te rugăm să încerci din nou mai târziu.',
        // Status translations
        'status.new': 'Nou',
        'status.offer_sent': 'Ofertă Trimisă',
        'status.accepted': 'Acceptat',
        'status.waiting_for_payment': 'Așteptând Plata',
        'status.paid': 'Plătit',
        'status.timeslots_sent': 'Sloturi Trimise',
        'status.arranged': 'Termen programat',
        'status.in_consultation': 'În Consultație',
        'status.declined': 'Respins',
        'status.finished': 'Finalizat',
        'status.unknown': 'Necunoscut',
        'status.moreInfo': 'Apasă aici pentru mai multe informații',
        'status.flowTitle': 'Fluxul statusurilor',
        'status.flowOverview': 'Prezentare generală a statusurilor și semnificației lor:',
        'status.allowedNext': 'Statusuri permise următoare',
        'status.noNext': 'Nu sunt permise tranziții suplimentare.',
        'status.setByAdmin': 'Statusurile sunt setate de administrator.',
        'status.next': 'Status următor',
        'status.set': 'Setează status',
        'status.flow.new': 'Administratorul va trimite o ofertă utilizatorului',
        'status.flow.offer_sent': 'Utilizatorul trebuie să accepte sau să refuze oferta. O factură va fi trimisă automat prin e-mail dacă oferta este acceptată',
        'status.flow.waiting_for_payment': 'Utilizatorul trebuie să plătească factura',
        'status.flow.paid': 'Administratorul va propune un interval orar pentru întâlnirea cu doctorul',
        'status.flow.timeslots_sent': 'Utilizatorul trebuie să accepte sau să refuze intervalul cu cel puțin 1 săptămână înainte de întâlnire',
        'status.flow.arranged': 'Întâlnirea cu doctorul este stabilită; utilizatorul trebuie să participe la întâlnirea online în acest portal',
        'status.flow.in_consultation': 'Doctorul va decide dacă este necesar tratament suplimentar',
        'status.flow.declined': 'Utilizatorul a refuzat oferta',
        'status.flow.finished': 'Nu este necesar tratament suplimentar; cazul este închis',
        // Case translations
        'case.noCases': 'Nu s-au găsit cazuri',
        'case.noCasesDescription': 'Începe prin crearea primului tău caz.',
        'case.noDescription': 'Fără descriere',
        'case.duration': 'Durată',
        'case.severity': 'Severitate',
        'case.created': 'Creat',
        'case.loadingDescription': 'Vă rugăm să așteptați în timp ce vă preluăm cazurile.',
        'case.details.setAppointment': 'Setează programarea',
        'case.details.suggestAppointments': 'Sugerează programări',
        'case.details.timezoneInfo.title': 'Notă:',
        'case.details.timezoneInfo.message': 'Timpul introdus este întotdeauna în timpul german (GMT+2). Programările trebuie să fie cu cel puțin 2 zile înainte.',
        'case.details.appointmentError': 'Vă rugăm să completați cel puțin o dată de programare.',
        'case.details.doctorError': 'Vă rugăm să selectați un doctor.',
        'case.details.doctor': 'Doctor',
        'case.details.selectDoctor': 'Selectați doctor',
        'case.details.duration': 'Durată',
        'case.details.durationOptions.10min': '10 min',
        'case.details.durationOptions.15min': '15 min',
        'case.details.durationOptions.20min': '20 min',
        'case.details.durationOptions.30min': '30 min',
        'case.details.durationOptions.45min': '45 min',
        'case.details.durationOptions.60min': '60 min',
        'case.details.durationOptions.90min': '90 min',
        'case.details.durationOptions.120min': '120 min',
        'case.details.suggestedTimeslots': 'Programări Sugerate',
        'case.details.acceptTimeslot': 'Acceptă Programarea',
        'case.details.declineTimeslot': 'Refuză',
        'case.details.appointmentArranged.title': 'Programare stabilită',
        'case.details.appointmentArranged.message': 'Programarea cu medicul este stabilită conform detaliilor date. Veniți aici cu 15 minute înainte de începerea programării pentru a obține link-ul către întâlnire. Dacă link-ul nu apare, actualizați pagina sau verificați emailurile.',
        'case.details.appointmentArranged.date': 'Data',
        'case.details.appointmentArranged.time': 'Ora',
        'case.details.appointmentArranged.duration': 'Durata',
        'case.details.existingAppointments': 'Programări Existente',
        'case.details.paymentWarning.title': 'Plată Necesară',
        'case.details.paymentWarning.message': 'Vă rugăm să plătiți factura pentru a continua cu cazul dvs. Ați primit factura prin e-mail. O puteți descărca și de mai jos.',
        'case.details.paymentWarning.downloadInvoice': 'Descarcă Factura',
        'case.details.paymentWarning.alreadyPaid': 'Deja plătit? Această informație va dispărea odată ce plata este confirmată.',
        'case.details.offerInfo.title': 'Ofertă Primită',
        'case.details.offerInfo.message': 'Vă rugăm să citiți cu atenție oferta. Ați primit-o prin e-mail sau o puteți descărca mai jos. Trebuie să o acceptați pentru a continua.',
        'case.details.offerInfo.validity': 'Oferta este valabilă 2 săptămâni.',
        'case.details.offerInfo.downloadOffer': 'Descarcă Oferta',
        'case.details.timeslotsInfo.title': 'Alegeți Programarea',
        'case.details.timeslotsInfo.message': 'Vă rugăm să selectați una dintre orele de programare sugerate mai jos pentru a continua cu cazul dvs.',
        'case.details.noSymptoms': 'Nu au fost înregistrate simptome',
        'case.details.withExistingDiagnosis': 'Cu un diagnostic existent',
        'case.details.diagnosis': 'Diagnostic',
        // Admin Panel
        'admin.panel.title': 'Panou de Lucru',
        'admin.panel.workInProcess': 'Listă de lucru',
        'admin.panel.waitingForUser': 'În așteptarea utilizatorului',
        'admin.panel.arranged': 'Programare făcută',
        'admin.panel.inConsultation': 'În consultație',
        'admin.panel.declined': 'Respins',
        'admin.panel.finished': 'Finalizat',
        'admin.panel.loadCases': 'Încarcă cazurile',
        'admin.status.manualChangeWarning': 'Această acțiune ar trebui utilizată doar în cazuri speciale. În mod normal, starea se schimbă automat.',
        // Administration
        'admin.administration.title': 'Administrare',
        'admin.administration.subtitle': 'Gestionează setările și configurațiile sistemului',
        'admin.administration.doctors': 'Gestionarea Doctorilor',
        'admin.administration.specialties': 'Gestionarea Specialităților',
        'admin.administration.users': 'Gestionarea Utilizatorilor',
        'admin.administration.settings': 'Setări Sistem',
        'admin.administration.reports': 'Rapoarte și Analize',
        // Specialty Management
        'specialty.title': 'Specialități',
        'specialty.subspecialties': 'Subspecialități',
        'specialty.add': 'Adaugă Specialitate',
        'specialty.addNew': 'Adaugă Specialitate Nouă',
        'specialty.edit': 'Editează Specialitatea',
        'specialty.name': 'Nume',
        'specialty.nameRequired': 'Numele este obligatoriu',
        'specialty.namePlaceholder': 'Introdu numele specialității',
        'specialty.description': 'Descriere',
        'specialty.descriptionPlaceholder': 'Introdu descrierea specialității',
        'specialty.active': 'Activ',
        'specialty.inactive': 'Inactiv',
        'specialty.save': 'Salvează',
        'specialty.saving': 'Se salvează...',
        'specialty.cancel': 'Anulează',
        'specialty.delete': 'Șterge',
        'specialty.deleteConfirm': 'Sigur doriți să ștergeți această specialitate? Această acțiune nu poate fi anulată.',
        'specialty.deleteTitle': 'Șterge specialitatea',
        'specialty.editTitle': 'Editează specialitatea',
        'specialty.noSpecialties': 'Nu s-au găsit specialități. Adaugă prima ta specialitate mai sus.',
        'specialty.subspecialtiesCount': 'subspecialități',
        'specialty.failedToSave': 'Eșec la salvarea specialității. Te rugăm să încerci din nou.',
        'specialty.failedToDelete': 'Eșec la ștergerea specialității. Te rugăm să încerci din nou.',
        // Subspecialty Management
        'subspecialty.title': 'Subspecialități',
        'subspecialty.add': 'Adaugă Subspecialitate',
        'subspecialty.addNew': 'Adaugă Subspecialitate Nouă',
        'subspecialty.edit': 'Editează Subspecialitatea',
        'subspecialty.name': 'Nume',
        'subspecialty.nameRequired': 'Numele este obligatoriu',
        'subspecialty.namePlaceholder': 'Introdu numele subspecialității',
        'subspecialty.description': 'Descriere',
        'subspecialty.descriptionPlaceholder': 'Introdu descrierea subspecialității',
        'subspecialty.active': 'Activ',
        'subspecialty.inactive': 'Inactiv',
        'subspecialty.save': 'Salvează',
        'subspecialty.saving': 'Se salvează...',
        'subspecialty.cancel': 'Anulează',
        'subspecialty.delete': 'Șterge',
        'subspecialty.deleteConfirm': 'Sigur doriți să ștergeți această subspecialitate? Această acțiune nu poate fi anulată.',
        'subspecialty.deleteTitle': 'Șterge subspecialitatea',
        'subspecialty.editTitle': 'Editează subspecialitatea',
        'subspecialty.noSubspecialties': 'Nu s-au găsit subspecialități. Adaugă prima ta subspecialitate mai sus.',
        'subspecialty.selectSpecialtyFirst': 'Te rugăm să selectezi mai întâi o specialitate',
        'subspecialty.failedToSave': 'Eșec la salvarea subspecialității. Te rugăm să încerci din nou.',
        'subspecialty.failedToDelete': 'Eșec la ștergerea subspecialității. Te rugăm să încerci din nou.',
        // Specialty Container
        'specialtyContainer.title': 'Gestionează Specialitățile & Subspecialitățile',
        'specialtyContainer.subtitle': 'Creează și gestionează specialitățile medicale și subspecialitățile lor',
        'specialtyContainer.loading': 'Se încarcă Specialitățile',
        'specialtyContainer.loadingMessage': 'Te rugăm să aștepți în timp ce încărcăm specialitățile...',
        'specialtyContainer.failedToLoad': 'Eșec la încărcarea specialităților. Te rugăm să încerci din nou.',
        'specialtyContainer.tryAgain': 'Încearcă din nou',
        'specialtyContainer.refresh': 'Actualizează',
        'specialtyContainer.selectSpecialty': 'Selectează o Specialitate',
        'specialtyContainer.selectSpecialtyMessage': 'Alege o specialitate din listă pentru a vizualiza și gestiona subspecialitățile sale.',
        'specialtyContainer.selectedSpecialty': 'Specialitatea Selectată:',
        'specialtyContainer.status': 'Status:',
        'specialtyContainer.subspecialties': 'Subspecialități:',
        'specialtyContainer.created': 'Creat:',
        'specialtyContainer.description': 'Descriere:',
        'specialtyContainer.howToUse': 'Cum să folosești:',
        'specialtyContainer.leftPanel': 'Panoul Stâng:',
        'specialtyContainer.leftPanelDesc': 'Gestionează specialitățile - adaugă, editează, șterge și selectează specialități',
        'specialtyContainer.rightPanel': 'Panoul Drept:',
        'specialtyContainer.rightPanelDesc': 'Gestionează subspecialitățile pentru specialitatea selectată',
        'specialtyContainer.selectSpecialtyDesc': 'Selectează o specialitate din panoul stâng pentru a vizualiza și gestiona subspecialitățile sale',
        'specialtyContainer.individualItems': 'Fiecare element',
        'specialtyContainer.individualItemsDesc': 'are butoane individuale de salvare și ștergere pentru control granular',
        'specialtyContainer.changesSaved': 'Modificările sunt salvate imediat',
        'specialtyContainer.changesSavedDesc': 'când dai click pe Salvează pe orice element',
        // Doctor Management
        'doctor.overview.title': 'Gestionarea Doctorilor',
        'doctor.overview.add': 'Adaugă Doctor',
        'doctor.overview.delete': 'Șterge Doctor',
        'doctor.overview.noDoctors': 'Nu s-au găsit doctori',
        'doctor.overview.noDoctorsDescription': 'Începe prin adăugarea primului tău doctor.',
        'doctor.overview.loading': 'Se încarcă doctorii...',
        'doctor.overview.selectDoctor': 'Selectează un doctor pentru ștergere',
        'doctor.details.title': 'Detalii Doctor',
        'doctor.details.create': 'Creează Doctor',
        'doctor.details.edit': 'Editează Doctor',
        'doctor.details.save': 'Salvează',
        'doctor.details.cancel': 'Anulează',
        'doctor.details.firstName': 'Prenume',
        'doctor.details.lastName': 'Nume',
        'doctor.details.titleField': 'Titlu',
        'doctor.details.licenseNumber': 'Numărul Licenței',
        'doctor.details.licenseExpiry': 'Data Expirării Licenței',
        'doctor.details.bio': 'Biografie',
        'doctor.details.consultationFee': 'Taxa de Consultație',
        'doctor.details.isActive': 'Activ',
        'doctor.details.specialties': 'Specialități',
        'doctor.details.subspecialties': 'Subspecialități',
        'doctor.details.addSpecialty': 'Adaugă Specialitate',
        'doctor.details.removeSpecialty': 'Elimină',
        'doctor.details.language': 'Limbă',
        'doctor.profile.title': 'Profil Doctor',
        'doctor.profile.subtitle': 'Gestionează-ți profilul profesional',
        'doctor.delete.title': 'Șterge Doctor',
        'doctor.delete.message': 'Sigur doriți să ștergeți acest doctor? Această acțiune nu poate fi anulată.',
        'doctor.delete.confirm': 'Șterge',
        'doctor.delete.cancel': 'Anulează',
        // Invoice
        'invoice.send': 'Trimite factura',
        'invoice.paid': 'Plătit',
        // Documents
        'documents.offer': 'Ofertă',
        'documents.invoice': 'Factură',
        // Case create - diagnosis
        'case.create.diagnosisUploadInfo': 'Încarcă acum fișierele de diagnostic. Vor fi asociate cazului după creare.',
        // Offer
        'offer.send': 'Trimite ofertă',
        'offer.amount': 'Sumă',
        'offer.text': 'Text ofertă',
        'case.create.hasDiagnosis': 'Am deja un diagnostic',
        // Demographic translations
        'demographic.title': 'Informații Demografice',
        'demographic.gender': 'Gen',
        'demographic.genderRequired': 'Genul este obligatoriu',
        'demographic.selectGender': 'Selectează genul',
        'demographic.male': 'Masculin',
        'demographic.female': 'Feminin',
        'demographic.other': 'Altul',
        'demographic.preferNotToSay': 'Prefer să nu spun',
        'demographic.dateOfBirth': 'Data Nașterii',
        'demographic.selectDay': 'Selectați ziua',
        'demographic.selectMonth': 'Selectați luna',
        'demographic.selectYear': 'Selectați anul',
        'demographic.dayRequired': 'Ziua este obligatorie',
        'demographic.dayMin': 'Ziua trebuie să fie cel puțin 1',
        'demographic.dayMax': 'Ziua trebuie să fie cel mult 31',
        'demographic.monthRequired': 'Luna este obligatorie',
        'demographic.monthMin': 'Luna trebuie să fie cel puțin 1',
        'demographic.monthMax': 'Luna trebuie să fie cel mult 12',
        'demographic.yearRequired': 'Anul este obligatoriu',
        'demographic.yearMin': 'Anul trebuie să fie cel puțin 1900',
        'demographic.yearMax': 'Anul nu poate fi în viitor',
        'demographic.height': 'Înălțime (cm)',
        'demographic.heightMin': 'Înălțimea trebuie să fie cel puțin 50 cm',
        'demographic.heightMax': 'Înălțimea trebuie să fie cel mult 250 cm',
        'demographic.weight': 'Greutate (kg)',
        'demographic.weightMin': 'Greutatea trebuie să fie cel puțin 20 kg',
        'demographic.weightMax': 'Greutatea trebuie să fie cel mult 500 kg',
        'demographic.notProvided': 'Nu este furnizat',
        'demographic.userNotFound': 'Utilizatorul nu a fost găsit',
        // Wizard translations
        'wizard.completeProfile': 'Completează-ți Profilul',
        'wizard.completeProfileMessage': 'Pentru a primi o tratare mai bună, ar fi util să furnizezi următoarele informații.',
        'wizard.personalInfo': 'Informații Personale',
        'wizard.demographic': 'Demografice',
        'wizard.saveAndContinue': 'Salvează & Continuă',
        'wizard.createCase': 'Creează Caz Medical',
        'wizard.createCaseDescription': 'Vă rugăm să furnizați simptomele și să vă completați profilul pentru a crea un caz medical.',
        'wizard.saveAndSubmit': 'Salvează & Trimite Cazul',
        // Common additional translations
        'common.next': 'Următorul',
        'common.back': 'Înapoi',
        'common.edit': 'Editează',
        'common.saving': 'Se salvează...',
        'common.save': 'Salvează',
        // Case details translations
        'case.details.medicalForm': 'Formular Medical',
        'case.details.receipts': 'Documente comerciale',
        'case.details.documents': 'Documente',
        'case.details.notes': 'Note',
        'case.details.infos': 'Informații',
        'case.details.customerName': 'Nume client:',
        'case.details.appointmentDate': 'Data programării:',
        'case.details.gender': 'Gen:',
        'case.details.height': 'Înălțime:',
        'case.details.weight': 'Greutate:',
        'case.details.dateOfBirth': 'Data nașterii:',
        'case.details.notesPlaceholder': 'Note de la doctori. (Acesta este un câmp text care ar putea fi văzut de toată lumea).',
        'case.details.upload': 'Încarcă',
        'case.details.download': 'Descarcă',
        'case.details.open': 'Deschide',
        'case.details.view': 'Vizualizează',
        'case.details.noDocuments': 'Nu au fost încărcate documente',
        'case.details.delete': 'Șterge',
        'case.details.deleteConfirm': 'Sigur doriți să ștergeți acest document?',
        'case.details.deleteConfirmTitle': 'Șterge Document',
        'case.details.cancel': 'Anulează',
        'case.details.symptom': 'Simptom',
        'case.details.answerOfUser': 'Răspunsul Utilizatorului',
        'case.details.acceptOffer': 'Acceptă oferta',
        'case.details.acceptOfferTitle': 'Acceptă oferta',
        'case.details.acceptOfferMessage': 'Doriți să acceptați oferta? Prin acceptare, confirmați că ați citit și ați înțeles oferta.',
        // Upload wizard additions
        'case.details.uploadFileHint': 'Încărcați PNG, JPG, JPEG, PDF, DICOM, NIfTI etc.',
        'case.details.linkPlaceholder': 'https://exemplu.ro/resursa',
        'case.details.linkHint': 'Acceptă http(s), mailto:, tel: sau nume de domeniu. Va fi validat.',
        'case.details.modeFile': 'Fișier',
        'case.details.modeLink': 'Link',
        'case.details.modeQr': 'QR',
        'case.details.qrHint': 'Încărcați o imagine (PNG/JPG/JPEG/SVG) care conține un cod QR. Îl vom citi și vom salva linkul.',
        'case.details.descriptionPlaceholder': 'Scurtă descriere (obligatoriu)',
        'validation.fileTypeNotAllowed': 'Acest tip de fișier nu este permis',
        'case.details.qrPdfNotSupported': 'Citirea QR din PDF nu este suportată',
        // Calendar
        'calendar.title': 'Calendar',
        'calendar.legend.selected': 'Data Selectată',
        'calendar.legend.today': 'Astăzi',
        'calendar.legend.hasAppointments': 'Are Programări',
        'calendar.noAppointments': 'Nu sunt programări pentru'
    }
};
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('de');
    // Enhanced setLanguage that also uses localStorage for persistence
    const setLanguage = (newLanguage)=>{
        setLanguageState(newLanguage);
        localStorage.setItem('preferredLanguage', newLanguage);
    };
    // Load language from localStorage or detect from IP on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const initializeLanguage = {
                "LanguageProvider.useEffect.initializeLanguage": async ()=>{
                    // First, check if user has a saved preference
                    const savedLanguage = localStorage.getItem('preferredLanguage');
                    if (savedLanguage && [
                        'en',
                        'de',
                        'ro'
                    ].includes(savedLanguage)) {
                        // User has a saved preference, use it
                        setLanguageState(savedLanguage);
                    } else {
                        // No saved preference, detect from IP location
                        try {
                            const detectedLanguage = await detectUserLanguage();
                            setLanguageState(detectedLanguage);
                            // Save the detected language as preference
                            localStorage.setItem('preferredLanguage', detectedLanguage);
                        } catch  {
                            // Fallback to German if detection fails
                            setLanguageState('de');
                        }
                    }
                }
            }["LanguageProvider.useEffect.initializeLanguage"];
            initializeLanguage();
        }
    }["LanguageProvider.useEffect"], []);
    // Translation function
    const t = (key)=>{
        const currentTranslations = translations[language];
        return currentTranslations[key] || key;
    };
    // Status translation function
    const translateStatus = (status)=>{
        const translationKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$statusUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["StatusUtils"].statusToTranslationKey(status);
        return t(translationKey);
    };
    // Symptom severity translation function
    const translateSymptomSeverity = (severity)=>{
        const translationKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$symptomUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["SymptomUtils"].severityToTranslationKey(severity);
        return t(translationKey);
    };
    // Symptom duration translation function
    const translateSymptomDuration = (duration)=>{
        const translationKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$symptomUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["SymptomUtils"].durationToTranslationKey(duration);
        return t(translationKey);
    };
    // Gender translation function
    const translateGender = (gender)=>{
        const translationKey = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$genderUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["GenderUtils"].genderToTranslationKey(gender);
        return t(translationKey);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            t,
            translateStatus,
            translateSymptomSeverity,
            translateSymptomDuration,
            translateGender
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/LanguageContext.tsx",
        lineNumber: 2430,
        columnNumber: 5
    }, this);
}
_s(LanguageProvider, "+zg8ee5zA961j5Rja2fA/WSNX9A=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_refresh__.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
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
"[project]/src/pages/orthopedics.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>OrthopedicsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LanguageContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/contexts/LanguageContext.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/landing-page/card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BeakerIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BeakerIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/BeakerIcon.js [client] (ecmascript) <export default as BeakerIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$HeartIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/HeartIcon.js [client] (ecmascript) <export default as HeartIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ShieldCheckIcon.js [client] (ecmascript) <export default as ShieldCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$AcademicCapIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AcademicCapIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/AcademicCapIcon.js [client] (ecmascript) <export default as AcademicCapIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/SparklesIcon.js [client] (ecmascript) <export default as SparklesIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserGroupIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/UserGroupIcon.js [client] (ecmascript) <export default as UserGroupIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClipboardDocumentCheckIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardDocumentCheckIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ClipboardDocumentCheckIcon.js [client] (ecmascript) <export default as ClipboardDocumentCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/CheckCircleIcon.js [client] (ecmascript) <export default as CheckCircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChatBubbleBottomCenterTextIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatBubbleBottomCenterTextIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/ChatBubbleBottomCenterTextIcon.js [client] (ecmascript) <export default as ChatBubbleBottomCenterTextIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__ = __turbopack_import__("[project]/node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js [client] (ecmascript) <export default as XMarkIcon>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
function OrthopedicsPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LanguageContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const [isSportsModalOpen, setIsSportsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sportsInjuries = [
        {
            name: 'ACL Tear',
            description: 'Anterior cruciate ligament injury common in sports.',
            prevalence: 'Over 200,000 ACL injuries annually in the US'
        },
        {
            name: 'Rotator Cuff Tear',
            description: 'Damage to the muscles and tendons around the shoulder.',
            prevalence: 'Affects 2 million people in the US each year'
        },
        {
            name: 'Meniscus Tear',
            description: 'Cartilage damage in the knee joint.',
            prevalence: 'One of the most common knee injuries'
        },
        {
            name: 'Tennis Elbow',
            description: 'Overuse injury affecting the elbow tendons.',
            prevalence: 'Affects 1-3% of the population'
        }
    ];
    const services = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$BeakerIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BeakerIcon$3e$__["BeakerIcon"], {
                className: "w-8 h-8 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, this),
            title: 'Diagnostic Services',
            description: 'Advanced imaging and diagnostic procedures',
            details: [
                'X-Ray Imaging',
                'MRI Scans',
                'CT Scans',
                'Bone Density Testing',
                'Joint Arthroscopy'
            ]
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$HeartIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__["HeartIcon"], {
                className: "w-8 h-8 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            title: 'Joint Care',
            description: 'Comprehensive joint treatment and replacement',
            details: [
                'Hip Replacement',
                'Knee Replacement',
                'Shoulder Surgery',
                'Joint Preservation',
                'Arthritis Treatment'
            ]
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                className: "w-8 h-8 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, this),
            title: 'Spine Care',
            description: 'Expert spine treatment and surgery',
            details: [
                'Spinal Fusion',
                'Disc Replacement',
                'Scoliosis Treatment',
                'Minimally Invasive Surgery',
                'Pain Management'
            ]
        }
    ];
    const commonConditions = [
        {
            title: 'Osteoarthritis',
            description: 'Degenerative joint disease affecting cartilage',
            symptoms: [
                'Joint pain and stiffness',
                'Reduced range of motion',
                'Swelling',
                'Bone spurs'
            ]
        },
        {
            title: 'Fractures',
            description: 'Broken bones requiring specialized treatment',
            symptoms: [
                'Severe pain',
                'Swelling and bruising',
                'Deformity',
                'Inability to use the limb'
            ]
        },
        {
            title: 'Back Pain',
            description: 'Chronic or acute spinal discomfort',
            symptoms: [
                'Lower back pain',
                'Muscle spasms',
                'Limited flexibility',
                'Radiating pain'
            ]
        },
        {
            title: 'Carpal Tunnel Syndrome',
            description: 'Nerve compression in the wrist',
            symptoms: [
                'Numbness and tingling',
                'Weakness in hand',
                'Pain in wrist',
                'Difficulty gripping'
            ]
        }
    ];
    const treatmentApproaches = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$AcademicCapIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AcademicCapIcon$3e$__["AcademicCapIcon"], {
                className: "w-12 h-12 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 135,
                columnNumber: 13
            }, this),
            title: 'Conservative Treatment',
            description: 'Non-surgical approaches for optimal recovery',
            benefits: [
                'Physical therapy programs',
                'Pain management techniques',
                'Medication protocols',
                'Lifestyle modifications'
            ]
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"], {
                className: "w-12 h-12 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 146,
                columnNumber: 13
            }, this),
            title: 'Surgical Excellence',
            description: 'State-of-the-art surgical interventions',
            benefits: [
                'Minimally invasive techniques',
                'Robotic-assisted surgery',
                'Joint replacement expertise',
                'Rapid recovery protocols'
            ]
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$UserGroupIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserGroupIcon$3e$__["UserGroupIcon"], {
                className: "w-12 h-12 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 157,
                columnNumber: 13
            }, this),
            title: 'Rehabilitation Focus',
            description: 'Comprehensive post-treatment care',
            benefits: [
                'Customized rehab programs',
                'Sports medicine integration',
                'Progress monitoring',
                'Return to activity planning'
            ]
        }
    ];
    const stats = [
        {
            value: '20+',
            label: 'Years of Experience'
        },
        {
            value: '10,000+',
            label: 'Procedures Performed'
        },
        {
            value: '97%',
            label: 'Patient Satisfaction'
        }
    ];
    const whyChooseReasons = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ClipboardDocumentCheckIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardDocumentCheckIcon$3e$__["ClipboardDocumentCheckIcon"], {
                className: "w-12 h-12 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 177,
                columnNumber: 13
            }, this),
            title: 'Expert Surgeons',
            description: 'Board-certified orthopedic surgeons with subspecialty training in all areas.'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$SparklesIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SparklesIcon$3e$__["SparklesIcon"], {
                className: "w-12 h-12 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 182,
                columnNumber: 13
            }, this),
            title: 'Advanced Techniques',
            description: 'Minimally invasive and robotic-assisted procedures for faster recovery.'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$HeartIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__["HeartIcon"], {
                className: "w-12 h-12 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 187,
                columnNumber: 13
            }, this),
            title: 'Patient-Centered',
            description: 'Individualized treatment plans designed around your lifestyle and goals.'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ShieldCheckIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheckIcon$3e$__["ShieldCheckIcon"], {
                className: "w-12 h-12 text-primary-600"
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 192,
                columnNumber: 13
            }, this),
            title: 'Proven Outcomes',
            description: 'Exceptional surgical results with high success rates and satisfaction.'
        }
    ];
    const patientEducation = [
        {
            title: 'Understanding Your Diagnosis',
            description: 'Detailed information about orthopedic conditions, treatment options, and expected outcomes.'
        },
        {
            title: 'Pre-Surgery Preparation',
            description: 'Comprehensive guidance on preparing for surgery and optimizing your health.'
        },
        {
            title: 'Rehabilitation Journey',
            description: 'What to expect during recovery and how to achieve the best possible results.'
        }
    ];
    const consultationExpectations = [
        'Comprehensive physical examination',
        'Review of medical history and imaging',
        'Discussion of treatment options',
        'Surgical vs. non-surgical approaches',
        'Recovery timeline and expectations',
        'Personalized treatment recommendations'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col bg-background-primary",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full relative",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative overflow-hidden mt-4 md:rounded-5xl md:border md:border-border-primary md:max-w-[95%] md:mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "w-full h-[500px] object-cover",
                            alt: "Orthopedics Department",
                            src: "/test-2.jpg",
                            width: 1440,
                            height: 500,
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black bg-opacity-40"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-white px-4 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight",
                                        children: t('services.orthopedics')
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg md:text-xl lg:text-2xl mb-6 text-gray-100 max-w-3xl mx-auto",
                                        children: "Expert care for bones, joints, and muscles"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 242,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/orthopedics.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full py-12 bg-background-secondary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 md:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                        children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl md:text-5xl font-bold text-primary-600 mb-2",
                                        children: stat.value
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 256,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-lg text-foreground-secondary",
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/src/pages/orthopedics.tsx",
                                lineNumber: 255,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/pages/orthopedics.tsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 252,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full py-16 bg-background-primary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 md:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-foreground-primary mb-4",
                                    children: "Why Choose Lonvia Orthopedics?"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-foreground-secondary max-w-3xl mx-auto",
                                    children: "Leading orthopedic care with innovative treatments"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 273,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 269,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                            children: whyChooseReasons.map((reason, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "border-none shadow-box bg-background-primary hover:shadow-box-xl transition-all duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4",
                                                children: reason.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 281,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold text-foreground-primary mb-2",
                                                children: reason.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-foreground-secondary",
                                                children: reason.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 285,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 279,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full py-16 bg-background-secondary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 md:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-foreground-primary mb-4",
                                    children: "Our Services"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-foreground-secondary max-w-3xl mx-auto",
                                    children: "Comprehensive orthopedic care for all your needs"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 300,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 296,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                            children: [
                                services.map((service, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "border-none shadow-box bg-background-primary hover:shadow-box-xl transition-all duration-300",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4",
                                                    children: service.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                                    lineNumber: 308,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-semibold text-foreground-primary mb-2",
                                                    children: service.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-foreground-secondary mb-4",
                                                    children: service.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2",
                                                    children: service.details.map((detail, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                                    className: "w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                                                    lineNumber: 316,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-foreground-secondary",
                                                                    children: detail
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                                                    lineNumber: 317,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/src/pages/orthopedics.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/orthopedics.tsx",
                                            lineNumber: 307,
                                            columnNumber: 17
                                        }, this)
                                    }, index, false, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "border-none shadow-box bg-primary-50 hover:shadow-box-xl transition-all duration-300 cursor-pointer",
                                    onClick: ()=>setIsSportsModalOpen(true),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$HeartIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartIcon$3e$__["HeartIcon"], {
                                                    className: "w-8 h-8 text-primary-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 331,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold text-foreground-primary mb-2",
                                                children: "Sports Medicine"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 334,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-foreground-secondary mb-4",
                                                children: "Specialized care for athletic injuries and performance"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 337,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-primary-600 hover:text-primary-700 font-semibold flex items-center",
                                                children: "Learn More >"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 340,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 304,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 295,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full py-16 bg-background-primary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 md:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-foreground-primary mb-4",
                                    children: "Common Orthopedic Conditions"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 353,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-foreground-secondary max-w-3xl mx-auto",
                                    children: "Expert treatment for a wide range of musculoskeletal conditions"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 356,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 352,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                            children: commonConditions.map((condition, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "border-none shadow-box bg-background-primary hover:shadow-box-xl transition-all duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold text-foreground-primary mb-2",
                                                children: condition.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-foreground-secondary mb-4",
                                                children: condition.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 367,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-semibold text-foreground-primary mb-2",
                                                        children: "Common Symptoms:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2",
                                                        children: condition.symptoms.map((symptom, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-start",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-primary-600 mr-2",
                                                                        children: "•"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                                        lineNumber: 373,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-foreground-secondary",
                                                                        children: symptom
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                                        lineNumber: 374,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, idx, true, {
                                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                                lineNumber: 372,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 368,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 363,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 362,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 351,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full py-16 bg-background-secondary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 md:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-foreground-primary mb-4",
                                    children: "Our Treatment Approach"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-foreground-secondary max-w-3xl mx-auto",
                                    children: "Comprehensive care from diagnosis to full recovery"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 393,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                            children: treatmentApproaches.map((approach, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "border-none shadow-box bg-background-primary hover:shadow-box-xl transition-all duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4 flex justify-center",
                                                children: approach.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 401,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold text-foreground-primary mb-2 text-center",
                                                children: approach.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 402,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-foreground-secondary mb-4 text-center",
                                                children: approach.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 405,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2 mt-4",
                                                children: approach.benefits.map((benefit, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-start",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                                className: "w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                                lineNumber: 409,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-foreground-secondary",
                                                                children: benefit
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                                lineNumber: 410,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 406,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 400,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 399,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 388,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full py-16 bg-background-primary",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 md:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-foreground-primary mb-4",
                                    children: "Patient Education"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 425,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-foreground-secondary max-w-3xl mx-auto",
                                    children: "Empowering you with knowledge about your orthopedic health"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 424,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                            children: patientEducation.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "border-none shadow-box bg-background-primary hover:shadow-box-xl transition-all duration-300",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$ChatBubbleBottomCenterTextIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChatBubbleBottomCenterTextIcon$3e$__["ChatBubbleBottomCenterTextIcon"], {
                                                    className: "w-12 h-12 text-primary-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 436,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-semibold text-foreground-primary mb-2",
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 439,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-foreground-secondary",
                                                children: item.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 442,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 435,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 434,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 423,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 422,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "w-full py-16 bg-primary-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 md:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-foreground-primary mb-4",
                                    children: "Schedule Your Consultation"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-foreground-secondary mb-8",
                                    children: "Take the first step towards pain-free movement"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 457,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 453,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "border-none shadow-box bg-background-primary",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-semibold text-foreground-primary mb-4",
                                        children: "What to Expect During Your Visit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 464,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-3 mb-8",
                                        children: consultationExpectations.map((expectation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$CheckCircleIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircleIcon$3e$__["CheckCircleIcon"], {
                                                        className: "w-6 h-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-foreground-secondary text-lg",
                                                        children: expectation
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 467,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row gap-4 justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-box",
                                                children: "Book Appointment"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 476,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-background-secondary hover:bg-neutral-200 text-foreground-primary border-2 border-border-primary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300",
                                                children: "Contact Us"
                                            }, void 0, false, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 479,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/orthopedics.tsx",
                                lineNumber: 463,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 462,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 452,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 451,
                columnNumber: 7
            }, this),
            isSportsModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-background-primary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-0 bg-background-primary border-b border-border-primary p-6 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl md:text-3xl font-bold text-foreground-primary",
                                    children: "Sports Medicine"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 493,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsSportsModalOpen(false),
                                    className: "text-foreground-tertiary hover:text-foreground-primary transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroicons$2f$react$2f$24$2f$outline$2f$esm$2f$XMarkIcon$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XMarkIcon$3e$__["XMarkIcon"], {
                                        className: "w-6 h-6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                        lineNumber: 500,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 492,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-foreground-secondary mb-8",
                                    children: "Our sports medicine specialists provide comprehensive care for athletes of all levels, from weekend warriors to professional competitors."
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 505,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold text-foreground-primary mb-4",
                                    children: "Common Sports Injuries We Treat"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 509,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",
                                    children: sportsInjuries.map((injury, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["Card"], {
                                            className: "border border-border-primary",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$landing$2d$page$2f$card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                className: "p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "text-lg font-semibold text-foreground-primary mb-2",
                                                        children: injury.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-foreground-secondary mb-2",
                                                        children: injury.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-primary-600 font-semibold",
                                                        children: injury.prevalence
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/orthopedics.tsx",
                                                        lineNumber: 521,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/orthopedics.tsx",
                                                lineNumber: 516,
                                                columnNumber: 21
                                            }, this)
                                        }, index, false, {
                                            fileName: "[project]/src/pages/orthopedics.tsx",
                                            lineNumber: 515,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 513,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-4 justify-center mt-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300",
                                            children: "Schedule Consultation"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/orthopedics.tsx",
                                            lineNumber: 530,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsSportsModalOpen(false),
                                            className: "bg-background-secondary hover:bg-neutral-200 text-foreground-primary border-2 border-border-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300",
                                            children: "Close"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/orthopedics.tsx",
                                            lineNumber: 533,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/orthopedics.tsx",
                                    lineNumber: 529,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/orthopedics.tsx",
                            lineNumber: 504,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/orthopedics.tsx",
                    lineNumber: 491,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/orthopedics.tsx",
                lineNumber: 490,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/orthopedics.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
_s(OrthopedicsPage, "Qt/Eysot+rNfpefi+WA9to7Poxc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LanguageContext$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = OrthopedicsPage;
var _c;
__turbopack_refresh__.register(_c, "OrthopedicsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/orthopedics.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/orthopedics";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/orthopedics.tsx [client] (ecmascript)");
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
"[project]/src/pages/orthopedics (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/orthopedics.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__e057e3._.js.map