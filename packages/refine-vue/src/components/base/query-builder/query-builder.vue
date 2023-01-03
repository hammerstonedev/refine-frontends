<template>
  <renderless-query-builder
    :blueprint='blueprint'
    :conditions='conditions'
    @change='onChange'
    v-slot='{
      groupedBlueprint,
      replaceCriterion,
      insertCriterion,
      addGroup,
      removeCriterion,
      conditionFor,
    }'
  >
    <!-- When there are no conditions, we need to show something reasonable instead of just "+ OR"-->
    <refine-flavor
      as='div'
      component='emptyGroup'
      v-bind='{ addGroup }'
      :order="['button', 'default']"
      v-if='groupedBlueprint.length === 0'
    >
      <template #button>
        <refine-flavor
          as='button'
          component='emptyGroup.addCriterionButton'
          @click='addGroup'
          tabindex='0'
          type='button'
        >
          <!-- Heroicon name: plus -->
          <refine-flavor
            as='svg'
            component='emptyGroup.addCriterionButton.icon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fill-rule='evenodd'
              d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
              clip-rule='evenodd'
            />
          </refine-flavor>
          <refine-flavor as='span' component='emptyGroup.addCriterionButton.text'>
            Add a new condition
          </refine-flavor>
        </refine-flavor>
      </template>
    </refine-flavor>

    <refine-flavor v-else as='div' component='group.wrapper'>
      <template v-for='(group, index) in groupedBlueprint' v-bind='templateKey(index)'>
        <refine-flavor
          as='div'
          component='group'
          v-bind='templateChildKey(`group-${index}`)'
        >
          <!-- This really should be named criterion, as that's what it is. -->
          <refine-flavor
            as='div'
            component='condition'
            v-for='criterion in group'
            :key='criterion.uid'
          >
            <renderless-condition
              v-bind='conditionFor({ id: criterion.condition_id, ...criterion })'
              v-slot='{ switchClause }'
            >
              <criterion
                @switch-clause='({ id: clause }) => switchClause(clause)'
                @remove-condition='removeCriterion(criterion.position)'
                @switch-condition='
                  (nextCondition) => replaceCriterion(criterion.position, conditionFor(nextCondition))
              '
                :conditionId='criterion.condition_id'
                :conditions='conditions'
                :errors='errors[criterion.uid]'
                :input='criterion.input'
              />
            </renderless-condition>
          </refine-flavor>
          <refine-flavor as='div' component='group.addCriterionButton.wrapper'>
            <refine-flavor
              as='button'
              component='group.addCriterionButton'
              @click='insertCriterion(group[group.length - 1].position)'
              tabindex='0'
              type='button'
            >
              <!-- Heroicon name: plus -->
              <refine-flavor
                as='svg'
                component='group.addCriterionButton.icon'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clip-rule='evenodd'
                />
              </refine-flavor>
              <refine-flavor as='span' component='group.addCriterionButton.text'> And</refine-flavor>
            </refine-flavor>
          </refine-flavor>
        </refine-flavor>
        <!-- Divider between groups. Blank by default, but used in Nova. -->
        <refine-flavor as='template' component='group.divider' :index='index' :total='groupedBlueprint.length' v-bind='templateChildKey(`separator-${index}`)' />
      </template>
      <refine-flavor as='button' component='addGroupButton' @click='addGroup' type='button'>
        Add an 'Or'
      </refine-flavor>
    </refine-flavor>
    <!-- wrapper div -->
  </renderless-query-builder>
</template>
<script>
import Criterion from './criterion';
import { provideFlavor } from '../../../hooks/useFlavor';
import { RenderlessQueryBuilder, RenderlessCondition } from '../../../components/renderless';
import { RefineFlavor } from './refine-flavor';
import { isVue2 } from 'vue-demi';

export default {
  name: 'query-builder',
  model: {
    prop: 'blueprint',
    event: 'update:blueprint',
  },
  emits: ['update:blueprint'],
  props: {
    blueprint: {
      required: false,
      type: Array,
      default: () => {
        return [];
      },
    },
    conditions: {
      required: true,
      type: Array,
    },
    errors: {
      required: false,
      type: Object,
      default: () => {
        return {};
      },
    },
    flavor: {
      required: false,
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    templateKey(key) {
      // You cannot have a key on a v-for template in
      // Vue2, but you must have one in Vue3.
      return isVue2 ? {} : { key };
    },
    templateChildKey(key) {
      return isVue2 ? { key } : {};
    },
    onChange(newBlueprint) {
      // bubble up the change event.
      this.$emit('update:blueprint', newBlueprint);
    },
  },
  created() {
    if (this.conditions.length === 0) {
      throw new Error('You must provide at least one condition to the query builder.');
    }
  },
  setup(props) {
    provideFlavor(props.flavor);
  },
  components: {
    Criterion,
    RefineFlavor,
    RenderlessCondition,
    RenderlessQueryBuilder,
  },
};
</script>
