const CHUNK_PUBLIC_PATH = "server/pages/about.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__128de7._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_e750bf._.js");
runtime.loadChunk("server/chunks/ssr/src_styles_globals_070f83.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/about.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/src/pages/_document.tsx [ssr] (ecmascript)\", INNER_APP => \"[project]/src/pages/_app.tsx [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
