import { Blueprint } from "types";

export const kitchenSinkBlueprint: Blueprint = [
  {
    depth: 1,
    type: "criterion",
    condition_id: "option",
    input: {
      clause: "in",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "option",
    input: {
      clause: "eq",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "option",
    input: {
      clause: "dne",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "option",
    input: {
      clause: "nin",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "option",
    input: {
      clause: "st",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "option",
    input: {
      clause: "nst",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "eq",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "dne",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "sw",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "ew",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "dsw",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "dew",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "cont",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "dcont",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "st",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "text",
    input: {
      clause: "nst",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "bool",
    input: {
      clause: "true",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "bool",
    input: {
      clause: "false",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "eq",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "dne",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "lte",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "gte",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "btwn",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "gt",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "exct",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "lt",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "st",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date",
    input: {
      clause: "nst",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "eq",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "dne",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "lte",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "gte",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "btwn",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "gt",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "exct",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "lt",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "st",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "date_with_time",
    input: {
      clause: "nst",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "eq",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "dne",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "gt",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "gte",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "lt",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "lte",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "btwn",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "nbtwn",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "st",
    },
  },
  {
    depth: 1,
    type: "conjunction",
    word: "and",
  },
  {
    depth: 1,
    type: "criterion",
    condition_id: "numeric",
    input: {
      clause: "nst",
    },
  },
];
