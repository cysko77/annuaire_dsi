import { breakpoints } from "./breakpoints";
import { spacing } from "./spacing";
import { cx } from "./cx";
import { colors } from "./colors";
import { typography } from "./generatedFromCss/typography";

export * from "./colors";
export type { BreakpointKeys } from "./breakpoints";
export type { SpacingToken } from "./spacing";
export type { FrCxArg } from "./cx";
export type { Colors } from "./colors";
export type { ColorOptions } from "./generatedFromCss/colorOptions";
export type { ColorDecisions } from "./generatedFromCss/colorDecisions";
export type { FrClassName, FrIconClassName, RiIconClassName } from "./generatedFromCss/classNames";
export const fr = {
    breakpoints,
    spacing,
    cx,
    colors,
    typography
};
