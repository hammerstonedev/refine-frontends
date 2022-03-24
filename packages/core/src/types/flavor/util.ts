import type { RefineComponent, RefineRuntime } from ".";

/**
 * Recurses through the RefineFlavor type and extracts all component names.
 */
export type ExtractComponentNames<Structure extends object> = {
  [Key in keyof Structure]: Structure[Key] extends {
    component: RefineComponent<any, any>;
  }
    ? /* @ts-expect-error */
      Key | `${Key}.${ExtractComponentNames<Structure[Key]>}`
    : Structure[Key] extends object
    ? /* @ts-expect-error */
      `${Key}.${ExtractComponentNames<Structure[Key]>}`
    : never;
}[keyof Structure];

/**
 * Recurses through a nested object making every property except components optional.
 */
export type DeepPartial<Object extends object> = {
  [Key in keyof Object]?: Object[Key] extends object
    ? Object[Key] extends RefineComponent<any, any>
      ? Object[Key]
      : DeepPartial<Object[Key]>
    : Object[Key];
};

/**
 * Adds `class: string` for Vue and `className: string` for React.
 */
export type ClassOrClassName<Runtime extends RefineRuntime> =
  Runtime extends "vue"
    ? { class: string }
    : Runtime extends "react"
    ? { className: string }
    : never;
