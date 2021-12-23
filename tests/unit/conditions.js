export default [
    {
      id: "option",
      component:"refine-option-condition",
      display: "Option",
      meta: {
        multiple: true,
        clauses: [
          {
            id: "in",
            component:"refine-option-input",
            display: "Is One Of",
            meta: {
              multiple: true,
            },
          },
          {
            id: "eq",
            component:"refine-option-input",
            display: "Is",
            meta: [],
          },
          {
            id: "dne",
            component:"refine-option-input",
            display: "Is Not",
            meta: [],
          },
          {
            id: "nin",
            component:"refine-option-input",
            display: "Is Not One Of",
            meta: {
              multiple: true,
            },
          },
          {
            id: "st",
            display: "Is Set",
            meta: [],
          },
          {
            id: "nst",
            display: "Is Not Set",
            meta: [],
          },
        ],
        options: [
          {
            id: "foo",
            display: "Foo",
          },
          {
            id: "bar",
            display: "Bar",
          },
          {
            id: "foo2",  
            display: "Foo2",
          },
          {
            id: "bar2",
            display: "Bar2",
          },
        ],
      },
      refinements: [{
        "id": "count_refinement",
        "display": "Count Refinement",
        "meta": {
          "clauses": [
            { "id": "eq", "display": "Is Equal To", "meta": {}, "component": "refine-number-input" },
            { "id": "dne", "display": "Is Not Equal To", "meta": {}, "component": "refine-number-input" },
            { "id": "gt", "display": "Is Greater Than", "meta": {}, "component": "refine-number-input" },
            {
              "id": "gte",
              "display": "Is Greater Than Or Equal To",
              "meta": {}, 
              "component": "refine-number-input"
            },
            { "id": "lt", "display": "Is Less Than", "meta": {} },
            {
              "id": "lte",
              "display": "Is Less Than Or Equal To",
              "meta": {}, 
              "component": "refine-number-input"
            },
            { "id": "btwn", "display": "Is Between", "meta": {}, "component": "refine-number-input" },
            { "id": "nbtwn", "display": "Is Not Between", "meta": {}, "component": "refine-number-input" },
            { "id": "st", "display": "Is Set", "meta": {}, "component": "refine-number-input" },
            { "id": "nst", "display": "Is Not Set", "meta": {}, "component": "refine-number-input" }
          ]
        },
        "refinements": []
      }, {
        "id": "kaboom_refinement",
        "display": "Kaboom Refinement",
        "meta": {
          "clauses": [
            { "id": "eq", "display": "Is Equal To", "meta": {}, "component": "refine-number-input" },
            { "id": "dne", "display": "Is Not Equal To", "meta": {}, "component": "refine-number-input" },
            { "id": "gt", "display": "Is Greater Than", "meta": {}, "component": "refine-number-input" },
            {
              "id": "gte",
              "display": "Is Greater Than Or Equal To",
              "meta": {}, 
              "component": "refine-number-input"
            },
            { "id": "lt", "display": "Is Less Than", "meta": {} },
            {
              "id": "lte",
              "display": "Is Less Than Or Equal To",
              "meta": {}, 
              "component": "refine-number-input"
            },
            { "id": "btwn", "display": "Is Between", "meta": {}, "component": "refine-number-input" },
            { "id": "nbtwn", "display": "Is Not Between", "meta": {}, "component": "refine-number-input" },
            { "id": "st", "display": "Is Set", "meta": {}, "component": "refine-number-input" },
            { "id": "nst", "display": "Is Not Set", "meta": {}, "component": "refine-number-input" }
          ]
        },
        refinements: [],
      }],
    },
    {
      id: "text",
      component:"refine-text-condition",
      display: "Text",
      meta: {
        clauses: [
          {
            id: "eq",
            display: "Equals",
            component:"refine-text-input",
            meta: [],
          },
          {
            id: "dne",
            display: "Does Not Equal",
            component:"refine-text-input",
            meta: [],
          },
          {
            id: "sw",
            display: "Starts With",
            component:"refine-text-input",
            meta: [],
          },
          {
            id: "ew",
            display: "Ends With",
            component:"refine-text-input",
            meta: [],
          },
          {
            id: "dsw",
            display: "Does Not Start With",
            component:"refine-text-input",
            meta: [],
          },
          {
            id: "dew",
            display: "Does Not End With",
            component:"refine-text-input",
            meta: [],
          },
          {
            id: "cont",
            display: "Contains",
            component:"refine-text-input",
            meta: [],
          },
          {
            id: "dcont",
            display: "Does Not Contain",
            component:"refine-text-input",
            meta: [],
          },
          {
            id: "st",
            display: "Is Set",
            meta: [],
          },
          {
            id: "nst",
            display: "Is Not Set",
            meta: [],
          },
        ],
      },
      refinements: [],
    },
    {
      id: "bool",
      component:"refine-boolean-condition",
      display: "Bool",
      meta: {
        clauses: [
          {
            id: "true",
            display: "Is True",
            meta: [],
          },
          {
            id: "false",
            display: "Is False",
            meta: [],
          },
        ],
      },
      refinements: [],
    },
    {
      id: "date",
      component:"refine-date-condition",
      display: "Date",
      meta: {
        clauses: [
          {
            id: "eq",
            display: "Is Equal To",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "dne",
            display: "Is Not Equal To",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "lte",
            display: "Is On or Before",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "gte",
            display: "Is On or After",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "btwn",
            display: "Is Between",
            component:"refine-double-date-input",
            meta: [],
          },
          {
            id: "gt",
            display: "Is More Than",
            component:"refine-relative-date-input",
            meta: [],
          },
          {
            id: "exct",
            display: "Is Exactly",
            component:"refine-relative-date-input",
  
            meta: [],
          },
          {
            id: "lt",
            display: "Is Less Than",
            component:"refine-relative-date-input",
            meta: [],
          },
          {
            id: "st",
            display: "Is Set",
            meta: [],
          },
          {
            id: "nst",
            display: "Is Not Set",
            meta: [],
          },
        ],
      },
      refinements: [],
    },
    {
      id: "date_with_time",
      component:"refine-date-condition",
      display: "Date With Time",
      meta: {
        clauses: [
          {
            id: "eq",
            display: "Is Equal To",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "dne",
            display: "Is Not Equal To",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "lte",
            display: "Is On or Before",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "gte",
            display: "Is On or After",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "btwn",
            display: "Is Between",
            component:"refine-double-date-input",
            meta: [],
          },
          {
            id: "gt",
            display: "Is More Than",
            component:"refine-relative-date-input",
            meta: [],
          },
          {
            id: "exct",
            display: "Is Exactly",
            component:"refine-relative-date-input",
            meta: [],
          },
          {
            id: "lt",
            display: "Is Less Than",
            component:"refine-relative-date-input",
            meta: [],
          },
          {
            id: "st",
            display: "Is Set",
            meta: [],
          },
          {
            id: "nst",
            display: "Is Not Set",
            meta: [],
          },
        ],
      },
      refinements: [],
    },
    {
      id: "timestamp",
      component:"refine-date-condition",
      display: "Timestamp",
      meta: {
        clauses: [
          {
            id: "eq",
            display: "Is Equal To",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "dne",
            display: "Is Not Equal To",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "lte",
            display: "Is On or Before",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "gte",
            display: "Is On or After",
            component:"refine-date-input",
            meta: [],
          },
          {
            id: "btwn",
            display: "Is Between",
            component:"refine-double-date-input",
            meta: [],
          },
          {
            id: "gt",
            display: "Is More Than",
            component:"refine-relative-date-input",
            meta: [],
          },
          {
            id: "exct",
            display: "Is Exactly",
            component:"refine-relative-date-input",
            meta: [],
          },
          {
            id: "lt",
            display: "Is Less Than",
            component:"refine-relative-date-input",
            meta: [],
          },
          {
            id: "st",
            display: "Is Set",
            meta: [],
          },
          {
            id: "nst",
            display: "Is Not Set",
            meta: [],
          },
        ],
      },
      refinements: [],
    },
    {
      id: "numeric",
      component:"refine-numeric-condition",
      display: "Numeric",
      meta: {
        clauses: [        
          {
            id: "eq",
            display: "Is Equal To",
            component:"refine-number-input",
            meta: [],
          },
          {
            id: "dne",
            display: "Is Not Equal To",
            component:"refine-number-input",
            meta: [],
          },
          {
            id: "gt",
            display: "Is Greater Than",
            component:"refine-number-input",
            meta: [],
          },
          {
            id: "gte",
            display: "Is Greater Than Or Equal To",
            component:"refine-number-input",
            meta: [],
          },
          {
            id: "lt",
            display: "Is Less Than",
            component:"refine-number-input",
            meta: [],
          },
          {
            id: "lte",
            display: "Is Less Than Or Equal To",
            component:"refine-number-input",
            meta: [],
          },
          {
            id: "btwn",
            display: "Is Between",
            component:"refine-double-number-input",
            meta: [],
          },
          {
            id: "nbtwn",
            display: "Is Not Between",
            component:"refine-double-number-input",
            meta: [],
          },
          {
            id: "st",
            display: "Is Set",
            meta: [],
          },
          {
            id: "nst",
            display: "Is Not Set",
            meta: [],
          },
        ],
      },
      refinements: [],
    },
  ];