export type RefineErrors = Record<number, Array<RefineError>>;

export type RefineError = { id: number; message: string };
