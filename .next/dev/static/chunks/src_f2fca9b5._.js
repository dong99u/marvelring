(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center px-3 py-1 text-xs font-bold uppercase tracking-wider transition-all', {
    variants: {
        variant: {
            new: 'bg-gold-muted text-pure-white',
            sale: 'bg-charcoal-deep text-pure-white',
            exclusive: 'bg-primary text-charcoal-deep',
            default: 'bg-boutique-silver text-charcoal-light'
        },
        size: {
            sm: 'text-xs px-2 py-0.5',
            md: 'text-xs px-3 py-1',
            lg: 'text-sm px-4 py-1.5'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'md'
    }
});
const Badge = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, variant, size, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: ref,
        className: badgeVariants({
            variant,
            size,
            className
        }),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Badge.tsx",
        lineNumber: 34,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Badge;
Badge.displayName = 'Badge';
const __TURBOPACK__default__export__ = Badge;
var _c, _c1;
__turbopack_context__.k.register(_c, "Badge$forwardRef");
__turbopack_context__.k.register(_c1, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/product.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Product utility functions
 */ /**
 * Check if a product is new (created within last 30 days)
 */ __turbopack_context__.s([
    "getDaysSinceCreation",
    ()=>getDaysSinceCreation,
    "isNewProduct",
    ()=>isNewProduct
]);
function isNewProduct(createdAt) {
    const created = new Date(createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return created >= thirtyDaysAgo;
}
function getDaysSinceCreation(createdAt) {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductBadges.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductBadges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
/**
 * Product Badges Component
 * Displays NEW and SALE badges based on product properties
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$product$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/product.ts [app-client] (ecmascript)");
;
;
;
;
function ProductBadges(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "d46ba4618cf8a553c1250d061b189b7287dcb9d8e7b3ca816c759d377f3d6142") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d46ba4618cf8a553c1250d061b189b7287dcb9d8e7b3ca816c759d377f3d6142";
    }
    const { createdAt, isSale, className: t1 } = t0;
    const className = t1 === undefined ? "" : t1;
    let t2;
    if ($[1] !== createdAt) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$product$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNewProduct"])(createdAt);
        $[1] = createdAt;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const isNew = t2;
    if (!isNew && !isSale) {
        return null;
    }
    const t3 = `flex gap-2 ${className}`;
    let t4;
    if ($[3] !== isNew) {
        t4 = isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "new",
            size: "sm",
            children: "NEW"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductBadges.tsx",
            lineNumber: 43,
            columnNumber: 19
        }, this);
        $[3] = isNew;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] !== isSale) {
        t5 = isSale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "sale",
            size: "sm",
            children: "SALE"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductBadges.tsx",
            lineNumber: 51,
            columnNumber: 20
        }, this);
        $[5] = isSale;
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    let t6;
    if ($[7] !== t3 || $[8] !== t4 || $[9] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t3,
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductBadges.tsx",
            lineNumber: 59,
            columnNumber: 10
        }, this);
        $[7] = t3;
        $[8] = t4;
        $[9] = t5;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    return t6;
}
_c = ProductBadges;
var _c;
__turbopack_context__.k.register(_c, "ProductBadges");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/PriceDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PriceDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function PriceDisplay(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "cba6b4619fef6b7cd0e6595d385d1b3ea199cde269a84103946a3d56c7044b59") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "cba6b4619fef6b7cd0e6595d385d1b3ea199cde269a84103946a3d56c7044b59";
    }
    const { price, isLoggedIn, isApproved, isSale: t1, originalPrice } = t0;
    const isSale = t1 === undefined ? false : t1;
    if (!isLoggedIn || !isApproved || price === null) {
        let t2;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[14px] text-gray-500 italic",
                    children: "가격은 로그인 후 확인하실 수 있습니다"
                }, void 0, false, {
                    fileName: "[project]/src/components/product/PriceDisplay.tsx",
                    lineNumber: 37,
                    columnNumber: 62
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/product/PriceDisplay.tsx",
                lineNumber: 37,
                columnNumber: 12
            }, this);
            $[1] = t2;
        } else {
            t2 = $[1];
        }
        return t2;
    }
    let t2;
    if ($[2] !== isSale || $[3] !== originalPrice || $[4] !== price) {
        t2 = isSale && originalPrice && originalPrice !== price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-[13px] text-gray-400 line-through",
            children: [
                "₩",
                originalPrice.toLocaleString()
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/PriceDisplay.tsx",
            lineNumber: 46,
            columnNumber: 64
        }, this);
        $[2] = isSale;
        $[3] = originalPrice;
        $[4] = price;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[14px] text-charcoal-light/70 font-medium",
            children: "가격"
        }, void 0, false, {
            fileName: "[project]/src/components/product/PriceDisplay.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== price) {
        t4 = price.toLocaleString();
        $[7] = price;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-baseline gap-2",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[16px] font-bold text-charcoal-light",
                    children: [
                        "₩",
                        t4
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/PriceDisplay.tsx",
                    lineNumber: 71,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/PriceDisplay.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        $[9] = t4;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    let t6;
    if ($[11] !== t2 || $[12] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center gap-1",
            children: [
                t2,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/PriceDisplay.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[11] = t2;
        $[12] = t5;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    return t6;
}
_c = PriceDisplay;
var _c;
__turbopack_context__.k.register(_c, "PriceDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://placeholder.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYwNjg0MDAsImV4cCI6MTk2MTY0NDQwMH0.placeholder"));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useAuth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useAuth() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(12);
    if ($[0] !== "2742ce26be17b2c8a1eb58b838a31ee8d2a58223b7134e0a286a617ddcc1fdc2") {
        for(let $i = 0; $i < 12; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2742ce26be17b2c8a1eb58b838a31ee8d2a58223b7134e0a286a617ddcc1fdc2";
    }
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [member, setMember] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const supabase = t0;
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "useAuth[fetchMemberData]": async (email)=>{
                const { data, error } = await supabase.from("member").select("*").eq("email", email).single();
                if (!error && data) {
                    setMember(data);
                }
            }
        })["useAuth[fetchMemberData]"];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const fetchMemberData = t1;
    let t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "useAuth[useEffect()]": ()=>{
                const getInitialSession = {
                    "useAuth[useEffect() > getInitialSession]": async ()=>{
                        const { data: t4 } = await supabase.auth.getSession();
                        const { session } = t4;
                        setUser(session?.user ?? null);
                        if (session?.user) {
                            await fetchMemberData(session.user.email);
                        }
                        setLoading(false);
                    }
                }["useAuth[useEffect() > getInitialSession]"];
                getInitialSession();
                const { data: t5 } = supabase.auth.onAuthStateChange({
                    "useAuth[useEffect() > supabase.auth.onAuthStateChange()]": async (_event, session_0)=>{
                        setUser(session_0?.user ?? null);
                        if (session_0?.user) {
                            await fetchMemberData(session_0.user.email);
                        } else {
                            setMember(null);
                        }
                        setLoading(false);
                    }
                }["useAuth[useEffect() > supabase.auth.onAuthStateChange()]"]);
                const { subscription } = t5;
                return ()=>subscription.unsubscribe();
            }
        })["useAuth[useEffect()]"];
        t3 = [
            fetchMemberData,
            supabase.auth
        ];
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t2, t3);
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "useAuth[signIn]": async (email_0, password)=>{
                const { data: data_0, error: error_0 } = await supabase.auth.signInWithPassword({
                    email: email_0,
                    password
                });
                if (error_0) {
                    throw error_0;
                }
                return data_0;
            }
        })["useAuth[signIn]"];
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    const signIn = t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "useAuth[signUp]": async (params)=>{
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email: params.email,
                    password: params.password,
                    options: {
                        data: {
                            username: params.username,
                            full_name: params.fullName
                        }
                    }
                });
                if (authError) {
                    throw authError;
                }
                if (!authData.user) {
                    throw new Error("Failed to create user");
                }
                const { error: memberError } = await supabase.from("member").insert({
                    username: params.username,
                    email: params.email,
                    password: "SUPABASE_AUTH",
                    business_type: params.businessType,
                    company_name: params.companyName,
                    ceo_name: params.ceoName,
                    biz_reg_num: params.bizRegNum,
                    zip_code: params.zipCode,
                    address_line1: params.addressMain,
                    address_line2: params.addressDetail,
                    approval_status: "PENDING"
                });
                if (memberError) {
                    await supabase.auth.admin.deleteUser(authData.user.id);
                    throw memberError;
                }
                return authData;
            }
        })["useAuth[signUp]"];
        $[6] = t5;
    } else {
        t5 = $[6];
    }
    const signUp = t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "useAuth[signOut]": async ()=>{
                const { error: error_1 } = await supabase.auth.signOut();
                if (error_1) {
                    throw error_1;
                }
            }
        })["useAuth[signOut]"];
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    const signOut = t6;
    let t7;
    if ($[8] !== loading || $[9] !== member || $[10] !== user) {
        t7 = {
            user,
            member,
            loading,
            signIn,
            signUp,
            signOut
        };
        $[8] = loading;
        $[9] = member;
        $[10] = user;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    return t7;
}
_s(useAuth, "lAmZV9OxwDKzsHzULFRxd0sl+Rc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/ProductBadges.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$PriceDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/PriceDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function ProductCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(27);
    if ($[0] !== "2ac2230450cdc7240960ace4c125a9a551f00dba2c66983c7d17dd798a245a70") {
        for(let $i = 0; $i < 27; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2ac2230450cdc7240960ace4c125a9a551f00dba2c66983c7d17dd798a245a70";
    }
    const { product } = t0;
    const { user, member } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const isLoggedIn = !!user;
    const isApproved = member?.approval_status === "APPROVED";
    const t1 = `/products/${product.id}`;
    let t2;
    if ($[1] !== product.main_image_url || $[2] !== product.product_name) {
        t2 = product.main_image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: product.main_image_url,
            alt: product.product_name,
            fill: true,
            className: "object-cover transform group-hover:scale-105 transition-transform duration-500",
            sizes: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 33,
            columnNumber: 35
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full flex items-center justify-center text-charcoal-light/20 text-sm",
            children: "No Image"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 33,
            columnNumber: 270
        }, this);
        $[1] = product.main_image_url;
        $[2] = product.product_name;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== product.created_at || $[5] !== product.is_sale) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-2 left-2 md:top-4 md:left-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                createdAt: product.created_at,
                isSale: product.is_sale
            }, void 0, false, {
                fileName: "[project]/src/components/product/ProductCard.tsx",
                lineNumber: 42,
                columnNumber: 68
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 42,
            columnNumber: 10
        }, this);
        $[4] = product.created_at;
        $[5] = product.is_sale;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t2 || $[8] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full aspect-square bg-marble-grey mb-4 md:mb-6 overflow-hidden",
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 51,
            columnNumber: 10
        }, this);
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] !== product.product_name) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-base md:text-lg font-bold text-charcoal-light mb-1 md:mb-2 line-clamp-2",
            children: product.product_name
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, this);
        $[10] = product.product_name;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== product.product_code) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs md:text-sm text-gray-400 font-light tracking-wide mb-2 md:mb-3",
            children: [
                "REF. ",
                product.product_code
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        $[12] = product.product_code;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    let t7;
    if ($[14] !== isApproved || $[15] !== isLoggedIn || $[16] !== product.is_sale || $[17] !== product.price) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$PriceDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            price: product.price,
            isLoggedIn: isLoggedIn,
            isApproved: isApproved,
            isSale: product.is_sale
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 76,
            columnNumber: 10
        }, this);
        $[14] = isApproved;
        $[15] = isLoggedIn;
        $[16] = product.is_sale;
        $[17] = product.price;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    let t8;
    if ($[19] !== t5 || $[20] !== t6 || $[21] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center flex-1 flex flex-col justify-center",
            children: [
                t5,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 87,
            columnNumber: 10
        }, this);
        $[19] = t5;
        $[20] = t6;
        $[21] = t7;
        $[22] = t8;
    } else {
        t8 = $[22];
    }
    let t9;
    if ($[23] !== t1 || $[24] !== t4 || $[25] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: t1,
            className: "group flex flex-col bg-white border border-card-border p-3 md:p-4 hover:shadow-lg transition-all duration-300 min-h-[300px]",
            children: [
                t4,
                t8
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductCard.tsx",
            lineNumber: 97,
            columnNumber: 10
        }, this);
        $[23] = t1;
        $[24] = t4;
        $[25] = t8;
        $[26] = t9;
    } else {
        t9 = $[26];
    }
    return t9;
}
_s(ProductCard, "bzzVw1E8Cc8skEVFCgVWwvE00vs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductFilters.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const categoryOptions = [
    {
        value: 'all',
        label: '전체보기'
    },
    {
        value: 'ring',
        label: '반지'
    },
    {
        value: 'necklace',
        label: '목걸이'
    },
    {
        value: 'earring',
        label: '귀걸이'
    },
    {
        value: 'bracelet',
        label: '팔찌'
    }
];
const materialOptions = [
    {
        value: 'yellow_gold',
        label: '옐로우 골드'
    },
    {
        value: 'white_gold',
        label: '화이트 골드'
    },
    {
        value: 'rose_gold',
        label: '로즈 골드'
    }
];
function ProductFilters() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "c9128aef7c6e28ea3238ebf217cc947d353ad1265e2ce7ff16ff3d348544ce6d") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c9128aef7c6e28ea3238ebf217cc947d353ad1265e2ce7ff16ff3d348544ce6d";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    let t0;
    let t1;
    let t2;
    let t3;
    let t4;
    if ($[1] !== router || $[2] !== searchParams) {
        const selectedCategories = searchParams.get("categories")?.split(",") || [
            "all"
        ];
        const selectedMaterials = searchParams.get("materials")?.split(",") || [];
        const handleCategoryChange = {
            "ProductFilters[handleCategoryChange]": (value)=>{
                const params = new URLSearchParams(searchParams.toString());
                let categories = [
                    ...selectedCategories
                ];
                if (value === "all") {
                    categories = [
                        "all"
                    ];
                } else {
                    categories = categories.filter(_ProductFiltersHandleCategoryChangeCategoriesFilter);
                    if (categories.includes(value)) {
                        categories = categories.filter({
                            "ProductFilters[handleCategoryChange > categories.filter()]": (c_0)=>c_0 !== value
                        }["ProductFilters[handleCategoryChange > categories.filter()]"]);
                    } else {
                        categories.push(value);
                    }
                    if (categories.length === 0) {
                        categories = [
                            "all"
                        ];
                    }
                }
                params.set("categories", categories.join(","));
                router.push(`?${params.toString()}`);
            }
        }["ProductFilters[handleCategoryChange]"];
        const handleMaterialChange = {
            "ProductFilters[handleMaterialChange]": (value_0)=>{
                const params_0 = new URLSearchParams(searchParams.toString());
                let materials = [
                    ...selectedMaterials
                ];
                if (materials.includes(value_0)) {
                    materials = materials.filter({
                        "ProductFilters[handleMaterialChange > materials.filter()]": (m)=>m !== value_0
                    }["ProductFilters[handleMaterialChange > materials.filter()]"]);
                } else {
                    materials.push(value_0);
                }
                if (materials.length === 0) {
                    params_0.delete("materials");
                } else {
                    params_0.set("materials", materials.join(","));
                }
                router.push(`?${params_0.toString()}`);
            }
        }["ProductFilters[handleMaterialChange]"];
        let t5;
        if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-bold tracking-widest text-charcoal-light mb-6",
                children: "카테고리"
            }, void 0, false, {
                fileName: "[project]/src/components/product/ProductFilters.tsx",
                lineNumber: 97,
                columnNumber: 12
            }, this);
            $[8] = t5;
        } else {
            t5 = $[8];
        }
        const t6 = categoryOptions.map({
            "ProductFilters[categoryOptions.map()]": (option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "flex items-center space-x-3 cursor-pointer group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: selectedCategories.includes(option.value),
                            onChange: {
                                "ProductFilters[categoryOptions.map() > <input>.onChange]": ()=>handleCategoryChange(option.value)
                            }["ProductFilters[categoryOptions.map() > <input>.onChange]"],
                            className: "form-checkbox h-4 w-4 text-gold-muted border-gray-300 rounded-none focus:ring-gold-muted/50"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductFilters.tsx",
                            lineNumber: 103,
                            columnNumber: 145
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-charcoal-light/70 group-hover:text-gold-muted transition-colors",
                            children: option.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductFilters.tsx",
                            lineNumber: 105,
                            columnNumber: 178
                        }, this)
                    ]
                }, option.value, true, {
                    fileName: "[project]/src/components/product/ProductFilters.tsx",
                    lineNumber: 103,
                    columnNumber: 58
                }, this)
        }["ProductFilters[categoryOptions.map()]"]);
        if ($[9] !== t6) {
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-10",
                children: [
                    t5,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: t6
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/ProductFilters.tsx",
                        lineNumber: 108,
                        columnNumber: 39
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/ProductFilters.tsx",
                lineNumber: 108,
                columnNumber: 12
            }, this);
            $[9] = t6;
            $[10] = t4;
        } else {
            t4 = $[10];
        }
        t2 = "mb-10";
        if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm font-bold tracking-widest text-charcoal-light mb-6",
                children: "소재"
            }, void 0, false, {
                fileName: "[project]/src/components/product/ProductFilters.tsx",
                lineNumber: 116,
                columnNumber: 12
            }, this);
            $[11] = t3;
        } else {
            t3 = $[11];
        }
        t0 = "space-y-3";
        t1 = materialOptions.map({
            "ProductFilters[materialOptions.map()]": (option_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "flex items-center space-x-3 cursor-pointer group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: selectedMaterials.includes(option_0.value),
                            onChange: {
                                "ProductFilters[materialOptions.map() > <input>.onChange]": ()=>handleMaterialChange(option_0.value)
                            }["ProductFilters[materialOptions.map() > <input>.onChange]"],
                            className: "form-checkbox h-4 w-4 text-gold-muted border-gray-300 rounded-none focus:ring-gold-muted/50"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductFilters.tsx",
                            lineNumber: 123,
                            columnNumber: 149
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm text-charcoal-light/70 group-hover:text-gold-muted transition-colors",
                            children: option_0.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductFilters.tsx",
                            lineNumber: 125,
                            columnNumber: 178
                        }, this)
                    ]
                }, option_0.value, true, {
                    fileName: "[project]/src/components/product/ProductFilters.tsx",
                    lineNumber: 123,
                    columnNumber: 60
                }, this)
        }["ProductFilters[materialOptions.map()]"]);
        $[1] = router;
        $[2] = searchParams;
        $[3] = t0;
        $[4] = t1;
        $[5] = t2;
        $[6] = t3;
        $[7] = t4;
    } else {
        t0 = $[3];
        t1 = $[4];
        t2 = $[5];
        t3 = $[6];
        t4 = $[7];
    }
    let t5;
    if ($[12] !== t0 || $[13] !== t1) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t0,
            children: t1
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductFilters.tsx",
            lineNumber: 143,
            columnNumber: 10
        }, this);
        $[12] = t0;
        $[13] = t1;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    let t6;
    if ($[15] !== t2 || $[16] !== t3 || $[17] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t2,
            children: [
                t3,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductFilters.tsx",
            lineNumber: 152,
            columnNumber: 10
        }, this);
        $[15] = t2;
        $[16] = t3;
        $[17] = t5;
        $[18] = t6;
    } else {
        t6 = $[18];
    }
    let t7;
    if ($[19] !== t4 || $[20] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t4,
                t6
            ]
        }, void 0, true);
        $[19] = t4;
        $[20] = t6;
        $[21] = t7;
    } else {
        t7 = $[21];
    }
    return t7;
}
_s(ProductFilters, "A57ZQKsSKoH4xi482IWIv7kTTfs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ProductFilters;
function _ProductFiltersHandleCategoryChangeCategoriesFilter(c) {
    return c !== "all";
}
var _c;
__turbopack_context__.k.register(_c, "ProductFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductSortDropdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductSortDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ProductSortDropdown() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "4115383dc1c6430cc8fec343828b3b5d862cf39f3930b3a759d62d989fd822f3") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "4115383dc1c6430cc8fec343828b3b5d862cf39f3930b3a759d62d989fd822f3";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    let t0;
    if ($[1] !== searchParams) {
        t0 = searchParams.get("sort") || "latest";
        $[1] = searchParams;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    const currentSort = t0;
    let t1;
    if ($[3] !== router || $[4] !== searchParams) {
        t1 = ({
            "ProductSortDropdown[handleSortChange]": (value)=>{
                const params = new URLSearchParams(searchParams.toString());
                params.set("sort", value);
                router.push(`?${params.toString()}`);
            }
        })["ProductSortDropdown[handleSortChange]"];
        $[3] = router;
        $[4] = searchParams;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    const handleSortChange = t1;
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-sm font-bold tracking-widest text-charcoal-light mb-4",
            children: "정렬 기준"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductSortDropdown.tsx",
            lineNumber: 42,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== handleSortChange) {
        t3 = ({
            "ProductSortDropdown[<select>.onChange]": (e)=>handleSortChange(e.target.value)
        })["ProductSortDropdown[<select>.onChange]"];
        $[7] = handleSortChange;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    let t5;
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "latest",
            children: "최신순"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductSortDropdown.tsx",
            lineNumber: 61,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "popular",
            children: "인기순"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductSortDropdown.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
            value: "name",
            children: "상품명순"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductSortDropdown.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        $[9] = t4;
        $[10] = t5;
        $[11] = t6;
    } else {
        t4 = $[9];
        t5 = $[10];
        t6 = $[11];
    }
    let t7;
    if ($[12] !== currentSort || $[13] !== t3) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-10",
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: currentSort,
                        onChange: t3,
                        className: "w-full border-b border-gray-200 border-t-0 border-x-0 bg-transparent py-2 pl-0 pr-8 text-sm text-charcoal-light focus:border-gold-muted focus:ring-0 cursor-pointer",
                        children: [
                            t4,
                            t5,
                            t6
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/ProductSortDropdown.tsx",
                        lineNumber: 74,
                        columnNumber: 63
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/product/ProductSortDropdown.tsx",
                    lineNumber: 74,
                    columnNumber: 37
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductSortDropdown.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[12] = currentSort;
        $[13] = t3;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    return t7;
}
_s(ProductSortDropdown, "A57ZQKsSKoH4xi482IWIv7kTTfs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = ProductSortDropdown;
var _c;
__turbopack_context__.k.register(_c, "ProductSortDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductListHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductListHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
'use client';
;
;
;
function ProductListHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "e22e993c5e7a949e92018963a109d66ebda32ba40809d0cc6797f89e24005500") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e22e993c5e7a949e92018963a109d66ebda32ba40809d0cc6797f89e24005500";
    }
    const { title, totalCount } = t0;
    let t1;
    if ($[1] !== title) {
        t1 = title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-2xl font-light tracking-tight",
            children: title
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductListHeader.tsx",
            lineNumber: 23,
            columnNumber: 19
        }, this);
        $[1] = title;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== totalCount) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-sm text-charcoal-light/50",
            children: [
                "총 ",
                totalCount,
                "개의 상품이 있습니다"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductListHeader.tsx",
            lineNumber: 31,
            columnNumber: 10
        }, this);
        $[3] = totalCount;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: "hover:text-gold-muted cursor-pointer transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"], {
                size: 20
            }, void 0, false, {
                fileName: "[project]/src/components/product/ProductListHeader.tsx",
                lineNumber: 39,
                columnNumber: 85
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductListHeader.tsx",
            lineNumber: 39,
            columnNumber: 10
        }, this);
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2 text-charcoal-light/40",
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "hover:text-gold-muted cursor-pointer transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/ProductListHeader.tsx",
                        lineNumber: 46,
                        columnNumber: 140
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/product/ProductListHeader.tsx",
                    lineNumber: 46,
                    columnNumber: 65
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductListHeader.tsx",
            lineNumber: 46,
            columnNumber: 10
        }, this);
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== t1 || $[8] !== t2) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-between items-end mb-8 border-b border-card-border pb-4",
            children: [
                t1,
                t2,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductListHeader.tsx",
            lineNumber: 53,
            columnNumber: 10
        }, this);
        $[7] = t1;
        $[8] = t2;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    return t5;
}
_c = ProductListHeader;
var _c;
__turbopack_context__.k.register(_c, "ProductListHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/actions/data:e15afc [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProducts",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"40e3748f9f91ced1c9b0bf6bf3d3ed2e7bc511e66a":"getProducts"},"src/app/actions/products.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("40e3748f9f91ced1c9b0bf6bf3d3ed2e7bc511e66a", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getProducts");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcHJvZHVjdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInO1xuXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAL2xpYi9zdXBhYmFzZS9zZXJ2ZXInO1xuaW1wb3J0IHsgUHJvZHVjdEZvckRpc3BsYXkgfSBmcm9tICdAL3R5cGVzL3Byb2R1Y3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdldFByb2R1Y3RzUGFyYW1zIHtcbiAgY3Vyc29yPzogbnVtYmVyO1xuICBsaW1pdD86IG51bWJlcjtcbiAgY2F0ZWdvcnk/OiBzdHJpbmc7XG4gIGlzTmV3PzogYm9vbGVhbjtcbiAgaXNTYWxlPzogYm9vbGVhbjtcbiAgc29ydD86ICdsYXRlc3QnIHwgJ25hbWUnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldFByb2R1Y3RzUmVzdWx0IHtcbiAgcHJvZHVjdHM6IFByb2R1Y3RGb3JEaXNwbGF5W107XG4gIG5leHRDdXJzb3I6IG51bWJlciB8IG51bGw7XG4gIGhhc01vcmU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQcm9kdWN0cyh7XG4gIGN1cnNvciA9IDAsXG4gIGxpbWl0ID0gMjQsXG4gIGNhdGVnb3J5LFxuICBpc05ldyxcbiAgaXNTYWxlLFxuICBzb3J0ID0gJ2xhdGVzdCcsXG59OiBHZXRQcm9kdWN0c1BhcmFtcyk6IFByb21pc2U8R2V0UHJvZHVjdHNSZXN1bHQ+IHtcbiAgY29uc3Qgc3VwYWJhc2UgPSBhd2FpdCBjcmVhdGVDbGllbnQoKTtcblxuICBsZXQgcXVlcnkgPSBzdXBhYmFzZS5mcm9tKCdwcm9kdWN0X2Z1bGxfZGV0YWlscycpLnNlbGVjdCgnKicpO1xuXG4gIC8vIEFwcGx5IGNhdGVnb3J5IGZpbHRlclxuICBpZiAoY2F0ZWdvcnkpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5LmVxKCdjYXRlZ29yeV9zbHVnJywgY2F0ZWdvcnkpO1xuICB9XG5cbiAgLy8gQXBwbHkgbmV3IHByb2R1Y3RzIGZpbHRlciAobGFzdCAzMCBkYXlzKVxuICBpZiAoaXNOZXcpIHtcbiAgICBjb25zdCB0aGlydHlEYXlzQWdvID0gbmV3IERhdGUoKTtcbiAgICB0aGlydHlEYXlzQWdvLnNldERhdGUodGhpcnR5RGF5c0Fnby5nZXREYXRlKCkgLSAzMCk7XG4gICAgcXVlcnkgPSBxdWVyeS5ndGUoJ2NyZWF0ZWRfYXQnLCB0aGlydHlEYXlzQWdvLnRvSVNPU3RyaW5nKCkpO1xuICB9XG5cbiAgLy8gQXBwbHkgc2FsZSBmaWx0ZXJcbiAgaWYgKGlzU2FsZSkge1xuICAgIHF1ZXJ5ID0gcXVlcnkuZXEoJ2lzX3NhbGUnLCB0cnVlKTtcbiAgfVxuXG4gIC8vIEFwcGx5IHNvcnRpbmdcbiAgaWYgKHNvcnQgPT09ICduYW1lJykge1xuICAgIHF1ZXJ5ID0gcXVlcnkub3JkZXIoJ3Byb2R1Y3RfbmFtZScsIHsgYXNjZW5kaW5nOiB0cnVlIH0pO1xuICB9IGVsc2Uge1xuICAgIHF1ZXJ5ID0gcXVlcnkub3JkZXIoJ2NyZWF0ZWRfYXQnLCB7IGFzY2VuZGluZzogZmFsc2UgfSk7XG4gIH1cblxuICAvLyBBcHBseSBwYWdpbmF0aW9uIHVzaW5nIG9mZnNldFxuICBxdWVyeSA9IHF1ZXJ5LnJhbmdlKGN1cnNvciwgY3Vyc29yICsgbGltaXQgLSAxKTtcblxuICBjb25zdCB7IGRhdGE6IHByb2R1Y3RzLCBlcnJvciB9ID0gYXdhaXQgcXVlcnk7XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgcHJvZHVjdHM6JywgZXJyb3IpO1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHByb2R1Y3RzJyk7XG4gIH1cblxuICBjb25zdCBoYXNNb3JlID0gcHJvZHVjdHM/Lmxlbmd0aCA9PT0gbGltaXQ7XG4gIGNvbnN0IG5leHRDdXJzb3IgPSBoYXNNb3JlID8gY3Vyc29yICsgbGltaXQgOiBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgcHJvZHVjdHM6IHByb2R1Y3RzIHx8IFtdLFxuICAgIG5leHRDdXJzb3IsXG4gICAgaGFzTW9yZSxcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiMlJBb0JzQix3TEFBQSJ9
}),
"[project]/src/hooks/useInfiniteProducts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useInfiniteProducts",
    ()=>useInfiniteProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$e15afc__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/actions/data:e15afc [app-client] (ecmascript) <text/javascript>");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useInfiniteProducts({ category, isNew, isSale, sort = 'latest', pageSize = 24 }) {
    _s();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [cursor, setCursor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const observerTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const loadMore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useInfiniteProducts.useCallback[loadMore]": async ()=>{
            if (isLoading || !hasMore) return;
            setIsLoading(true);
            setError(null);
            try {
                const params = {
                    cursor,
                    limit: pageSize,
                    category,
                    isNew,
                    isSale,
                    sort
                };
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$data$3a$e15afc__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getProducts"])(params);
                setProducts({
                    "useInfiniteProducts.useCallback[loadMore]": (prev)=>[
                            ...prev,
                            ...result.products
                        ]
                }["useInfiniteProducts.useCallback[loadMore]"]);
                setHasMore(result.hasMore);
                setCursor(result.nextCursor || 0);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load products'));
            } finally{
                setIsLoading(false);
            }
        }
    }["useInfiniteProducts.useCallback[loadMore]"], [
        cursor,
        hasMore,
        isLoading,
        pageSize,
        category,
        isNew,
        isSale,
        sort
    ]);
    // Load initial products
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInfiniteProducts.useEffect": ()=>{
            loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useInfiniteProducts.useEffect"], []);
    // Intersection Observer for infinite scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useInfiniteProducts.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "useInfiniteProducts.useEffect": (entries)=>{
                    if (entries[0].isIntersecting && hasMore && !isLoading) {
                        loadMore();
                    }
                }
            }["useInfiniteProducts.useEffect"], {
                threshold: 0.1
            });
            const currentTarget = observerTarget.current;
            if (currentTarget) {
                observer.observe(currentTarget);
            }
            return ({
                "useInfiniteProducts.useEffect": ()=>{
                    if (currentTarget) {
                        observer.unobserve(currentTarget);
                    }
                }
            })["useInfiniteProducts.useEffect"];
        }
    }["useInfiniteProducts.useEffect"], [
        hasMore,
        isLoading,
        loadMore
    ]);
    return {
        products,
        isLoading,
        hasMore,
        loadMore,
        error,
        observerTarget
    };
}
_s(useInfiniteProducts, "/rg4XTJpkXN/RhRVp4bc2gUvvbY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/ProductCard.tsx [app-client] (ecmascript)");
;
;
;
function ProductGrid(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "9dcfa04202600e01247ca224a4643d81bbc946db903d6d0ba99af77dfd5189d3") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "9dcfa04202600e01247ca224a4643d81bbc946db903d6d0ba99af77dfd5189d3";
    }
    const { products } = t0;
    let t1;
    if ($[1] !== products) {
        t1 = products.map(_ProductGridProductsMap);
        $[1] = products;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
            children: t1
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductGrid.tsx",
            lineNumber: 27,
            columnNumber: 10
        }, this);
        $[3] = t1;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_c = ProductGrid;
function _ProductGridProductsMap(product) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        product: product
    }, product.id, false, {
        fileName: "[project]/src/components/product/ProductGrid.tsx",
        lineNumber: 36,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ProductGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductSkeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function ProductSkeleton() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "c4cc6d5593bd40dfef64231935bcb1e1c7da263c01c888767d1f97604bba7e88") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c4cc6d5593bd40dfef64231935bcb1e1c7da263c01c888767d1f97604bba7e88";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full aspect-square bg-marble-grey mb-6 overflow-hidden",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-full bg-charcoal-light/10"
            }, void 0, false, {
                fileName: "[project]/src/components/product/ProductSkeleton.tsx",
                lineNumber: 12,
                columnNumber: 93
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductSkeleton.tsx",
            lineNumber: 12,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-5 bg-charcoal-light/10 rounded mx-auto w-3/4"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductSkeleton.tsx",
            lineNumber: 20,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-4 bg-charcoal-light/10 rounded mx-auto w-1/2"
        }, void 0, false, {
            fileName: "[project]/src/components/product/ProductSkeleton.tsx",
            lineNumber: 21,
            columnNumber: 10
        }, this);
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col bg-white border border-card-border p-4 animate-pulse",
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-3",
                    children: [
                        t1,
                        t2,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-4 bg-charcoal-light/10 rounded w-20"
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/ProductSkeleton.tsx",
                                lineNumber: 30,
                                columnNumber: 195
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductSkeleton.tsx",
                            lineNumber: 30,
                            columnNumber: 145
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/ProductSkeleton.tsx",
                    lineNumber: 30,
                    columnNumber: 98
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/ProductSkeleton.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return t3;
}
_c = ProductSkeleton;
var _c;
__turbopack_context__.k.register(_c, "ProductSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/EmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
;
;
function EmptyState(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "c8ab5404e5f774fc7550b3e070d5d9a7f69f08c860d32a255fa4a4e5f0b64a4b") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c8ab5404e5f774fc7550b3e070d5d9a7f69f08c860d32a255fa4a4e5f0b64a4b";
    }
    const { message: t1, onRetry } = t0;
    const message = t1 === undefined ? "\uC0C1\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4" : t1;
    let t2;
    if ($[1] !== message) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-lg mb-4",
            children: message
        }, void 0, false, {
            fileName: "[project]/src/components/product/EmptyState.tsx",
            lineNumber: 21,
            columnNumber: 10
        }, this);
        $[1] = message;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== onRetry) {
        t3 = onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: onRetry,
            className: "px-6 py-2 border border-charcoal-light/20 text-charcoal-light hover:bg-charcoal-light hover:text-white transition-colors",
            children: "다시 시도"
        }, void 0, false, {
            fileName: "[project]/src/components/product/EmptyState.tsx",
            lineNumber: 29,
            columnNumber: 21
        }, this);
        $[3] = onRetry;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== t2 || $[6] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-20 text-charcoal-light/40",
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/EmptyState.tsx",
            lineNumber: 37,
            columnNumber: 10
        }, this);
        $[5] = t2;
        $[6] = t3;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    return t4;
}
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/InfiniteProductList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InfiniteProductList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteProducts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useInfiniteProducts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/ProductGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductSkeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/ProductSkeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/EmptyState.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function InfiniteProductList(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(19);
    if ($[0] !== "c41b85b9e0b96913bf282820ec05f85794911e396d90711a49d6ad7c9a018ce7") {
        for(let $i = 0; $i < 19; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "c41b85b9e0b96913bf282820ec05f85794911e396d90711a49d6ad7c9a018ce7";
    }
    const { category, isNew, isSale, sort: t1 } = t0;
    const sort = t1 === undefined ? "latest" : t1;
    let t2;
    if ($[1] !== category || $[2] !== isNew || $[3] !== isSale || $[4] !== sort) {
        t2 = {
            category,
            isNew,
            isSale,
            sort,
            pageSize: 24
        };
        $[1] = category;
        $[2] = isNew;
        $[3] = isSale;
        $[4] = sort;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const { products, isLoading, hasMore, error, observerTarget } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteProducts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteProducts"])(t2);
    if (error) {
        let t3;
        if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: "\uC0C1\uD488\uC744 \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.",
                onRetry: _InfiniteProductListEmptyStateOnRetry
            }, void 0, false, {
                fileName: "[project]/src/components/product/InfiniteProductList.tsx",
                lineNumber: 56,
                columnNumber: 12
            }, this);
            $[6] = t3;
        } else {
            t3 = $[6];
        }
        return t3;
    }
    if (products.length === 0 && !isLoading) {
        let t3;
        if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/product/InfiniteProductList.tsx",
                lineNumber: 66,
                columnNumber: 12
            }, this);
            $[7] = t3;
        } else {
            t3 = $[7];
        }
        return t3;
    }
    let t3;
    if ($[8] !== products) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            products: products
        }, void 0, false, {
            fileName: "[project]/src/components/product/InfiniteProductList.tsx",
            lineNumber: 75,
            columnNumber: 10
        }, this);
        $[8] = products;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    let t4;
    if ($[10] !== isLoading) {
        t4 = isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6",
            children: Array.from({
                length: 4
            }).map(_InfiniteProductListAnonymous)
        }, void 0, false, {
            fileName: "[project]/src/components/product/InfiniteProductList.tsx",
            lineNumber: 83,
            columnNumber: 23
        }, this);
        $[10] = isLoading;
        $[11] = t4;
    } else {
        t4 = $[11];
    }
    let t5;
    if ($[12] !== hasMore || $[13] !== observerTarget) {
        t5 = hasMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: observerTarget,
            className: "h-10"
        }, void 0, false, {
            fileName: "[project]/src/components/product/InfiniteProductList.tsx",
            lineNumber: 93,
            columnNumber: 21
        }, this);
        $[12] = hasMore;
        $[13] = observerTarget;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    let t6;
    if ($[15] !== t3 || $[16] !== t4 || $[17] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t3,
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/product/InfiniteProductList.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[15] = t3;
        $[16] = t4;
        $[17] = t5;
        $[18] = t6;
    } else {
        t6 = $[18];
    }
    return t6;
}
_s(InfiniteProductList, "al36bfWMFx/8lCHlTNsC2W6kOZU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useInfiniteProducts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInfiniteProducts"]
    ];
});
_c = InfiniteProductList;
function _InfiniteProductListAnonymous(_, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductSkeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, i, false, {
        fileName: "[project]/src/components/product/InfiniteProductList.tsx",
        lineNumber: 113,
        columnNumber: 10
    }, this);
}
function _InfiniteProductListEmptyStateOnRetry() {
    return window.location.reload();
}
var _c;
__turbopack_context__.k.register(_c, "InfiniteProductList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_f2fca9b5._.js.map