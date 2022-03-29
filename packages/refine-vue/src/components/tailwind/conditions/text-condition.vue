<template>
  <renderless-text-condition :id="id || condition.id" :condition="condition" v-slot="{ clauses }">
    <base-condition
      :clauses="clauses"
      :defaultClauseOptions="$options.defaultClauseOptions"
      :value="value"
    >
      <slot> </slot>
    </base-condition>
  </renderless-text-condition>
</template>

<script>
import BaseCondition from './base-condition';
import { conditionProps } from '../../../mixins';
import { TextCondition as RenderlessTextCondition } from '../../../components/renderless/conditions';
import * as textClauseOptions from '../../../components/tailwind/clause-options/text';

export default {
  name: 'text-condition',
  mixins: [conditionProps],
  defaultClauseOptions: { ...textClauseOptions },
  props: {
    value: {
      type: String,
      required: false,
    },
  },
  components: {
    BaseCondition,
    RenderlessTextCondition,
  },
};
</script>
