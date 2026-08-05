import { lazy } from "react";

// Lazy load heavy chart components
export const BarChart = lazy(() => import("recharts").then(mod => ({ default: mod.BarChart })));
export const Bar = lazy(() => import("recharts").then(mod => ({ default: mod.Bar })));
export const Cell = lazy(() => import("recharts").then(mod => ({ default: mod.Cell })));
export const XAxis = lazy(() => import("recharts").then(mod => ({ default: mod.XAxis })));
export const YAxis = lazy(() => import("recharts").then(mod => ({ default: mod.YAxis })));
export const Tooltip = lazy(() => import("recharts").then(mod => ({ default: mod.Tooltip })));
export const ResponsiveContainer = lazy(() => import("recharts").then(mod => ({ default: mod.ResponsiveContainer })));
