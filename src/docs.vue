// straight up render with data from the server
import { QueryBuilder } from 'tailwind-query-builder';
<query-builder :config="config" :blueprint="blueprint" />

// how to get the blueprint
import { QueryBuilder } from 'tailwind-query-builder';
<query-builder :config="config" :blueprint="blueprint" v-model="blueprint" />

// or if you're not using the query builder, just a standalone query
import { TextCondition, NumericCondition, Query } from 'tailwind-query-builder';
<query v-model="blueprint">
  <text-condition id="name" value="Bob" />
  <numeric-condition id="age" value="32" />
</query>

// render text condition and numeric condition with clause dropdown with default
// clause options and default values
import { TextCondition, NumericCondition, Query } from 'tailwind-query-builder';

<query v-model="blueprint">
  <text-condition id="name" value="Bob" />
  <numeric-condition id="age" value="32" />
</query>

// render two conditions in a dropdown, select second and set a default value
import { Query } from 'tailwind-query-builder';
import { Text, Numeric, ConditionSelector } from 'tailwind-query-builder/condition-selector';

<query v-model="blueprint">
  <condition-selector>
    <text id="name" display="Name" />
    <numeric id="age" display="Age" selected value="32" />
  </condition-selector>
</query>

// render two conditions in a selector, one with only two clauses vs. defaulting to
// all clauses
import { Query } from 'tailwind-query-builder';
import { Text, Numeric, ConditionSelector } from 'tailwind-query-builder/condition-selector';
import { TextStartsWith, TextEndsWith } from 'tailwind-query-builder/clause-selector'

<query v-model="blueprint">
  <condition-selector>
    <text id="name" display="Your name" value="bob">
      <text-starts-with />
      <text-ends-with />
    </text>
    <numeric id="age" display="Age" />
  </condition-selector>
</query>

// render a condition outside a condition selector with a clause selector
import { Query } from 'tailwind-query-builder';
import { Text, TextEquals, TextDoesNotEqual } from 'tailwind-query-builder/clause-selector';

<query v-model="blueprint">
  <p>Filter by name</p>
  <text id="name" />
</query>

// only two clauses to choose from
<query v-model="blueprint">
  <p>Filter by name</p>
  <text id="name">
    <text-equals />
    <text-does-not-equal />
  </text>
</query>


// render one clause outside of a selector, default to bob
import { Query } from 'tailwind-query-builder';
import { TextEquals } from 'tailwind-query-builder/clauses';
import { Text } from 'tailwind-query-builder/conditions';

<query v-model="blueprint">
  <text id="name">
    <text-equals value="bob" />
  </text>
</query>

// render a query but with purely renderless components
// this is what is being rendered at the base of all the tailwind
// components and what updates the blueprint as it changes

import { Query, And, Or } from 'renderless-query-builder';
import { Text, Numeric } from 'renderless-query-builder/conditions';
import { TextStartsWith, NumericEquals } from 'renderless-query-builder/clauses';

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
