// straight up render with data from the server
import { QueryBuilder } from '@hammerstone/vue-query-builder/tailwind';
<query-builder :config="config" :blueprint="blueprint" />

// how to get the blueprint
import { QueryBuilder } from '@hammerstone/vue-query-builder/tailwind';
<query-builder :config="config" v-model="blueprint" />

// or if you're not using the query builder, just a standalone query
// render text condition and numeric condition with clause dropdown with default
// clause options and default values
import { TextCondition, NumericCondition, Query } from '@hammerstone/vue-query-builder/tailwind';
<query v-model="blueprint">
  <div>
    <label>Name
      <text-condition id="name" value="Bob" />
    </label>
  </div>
  <div>
    <label>Age
      <numeric-condition id="age" value="32" />
    </label>
  </div>
</query>

// render two conditions in a dropdown, select second and set a default value
import { Query, TextOption, NumericOption, ConditionSelector } from '@hammerstone/vue-query-builder/tailwind';

<query v-model="blueprint">
  <condition-selector>
    <text-option id="name" display="Name" />
    <numeric-option id="age" display="Age" selected value="32" />
  </condition-selector>
</query>

// render two conditions in a selector, one with only two clauses vs. defaulting to
// all clauses
import { Query, TextOption, NumericOption, ConditionSelector, TextStartsWithOption, TextEndsWithOption } from '@hammerstone/vue-query-builder/tailwind';

<query v-model="blueprint">
  <condition-selector>
    <text-option id="name" display="Your name" value="bob">
      <text-starts-with-option />
      <text-ends-with-option />
    </text-option>
    <numeric-option id="age" display="Age" />
  </condition-selector>
</query>

// render a condition outside a condition selector with a clause selector
import { Query, TextCondition, TextEquals, TextDoesNotEqual } from '@hammerstone/vue-query-builder/tailwind';

<query v-model="blueprint">
  <p>Filter by name</p>
  <text-condition id="name" />
</query>

// only two clauses to choose from
<query v-model="blueprint">
  <p>Filter by name</p>
  <text-condition id="name">
    <text-equals />
    <text-does-not-equal />
  </text-condition>
</query>


// render one clause outside of a selector, default to bob
import { Query, TextEquals, TextCondition } from '@hammerstone/vue-query-builder/tailwind';

<query v-model="blueprint">
  <text-condition id="name">
    <text-equals value="bob" />
  </text-condition>
</query>

// render a query but with purely renderless components
// this is what is being rendered at the base of all the tailwind
// components and what updates the blueprint as it changes

import { Query, And, Or, Text, Numeric, TextStartsWith, NumericEquals} from '@hammerstone/vue-query-builder/renderless';

<query v-model="blueprint">
  <text id="name">
    <text-starts-with value="Bob" />
  </text>
  <and>
    <numeric id="age">
      <numeric-equals value="32" />
    </numeric>
  </and>
  <or>
    <text id="name">
      <text-starts-with value="Tim" />
    </text>
    <and>
      <numeric id="age">
        <numeric-equals value="92" />
      </numeric>
    </and>
  </or>
</query>
