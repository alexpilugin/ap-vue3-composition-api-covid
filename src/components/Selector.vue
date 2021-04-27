<template>
  <div class="dropdown">
    <button class="dropbtn" @click="onClick">{{ title }}</button>
    <div 
      v-if="isVisible" 
      class="dropdown-content"
    >
      <button v-if="!hideAll" @click="selectAll">All</button>
      <button 
        v-for="(option, index) in options"
        :key="`opt-${index}`"
        @click="onSelect(option)"
        :value="option.ID"
      >
        <span v-if="!hideAll">{{ option.Country }}</span>
        <span v-if="hideAll">{{ option }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {

  emits: ['onSelect', 'selectAll'],

  props: {
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    hideAll: {
      type: Boolean,
      required: false,
      default: false
    },
    header: {
      type: String,
      required: false,
      default: 'All'
    }
  },

  setup(props, ctx) {

    const store = useStore()

    let isVisible = ref(false)
    let title = ref(props.header)

    const onClick = () => isVisible.value = true

    const onSelect = (option) => {
      
      title.value = props.hideAll ? option : option.Country
      // store.dispatch('covid/applySelection', option)
      ctx.emit('onSelect', option)
      isVisible.value = false
    }

    const selectAll =() => {
      title.value = "All"
      // store.dispatch('covid/applySelection', null)
      ctx.emit('selectAll', null)
      isVisible.value = false
    }

    return {
      title,
      isVisible,
      onClick,
      onSelect,
      selectAll
    }
  }
}
</script>

<style scoped>
.dropbtn {
  background-color: #777;
  color: white;
  padding: 4px;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  width: 200px;
}
.dropdown {
  position: relative;
  display: inline-block;
  padding: 0px 10px;
}
/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  position: absolute;
  background-color: #f1f1f1;
  width: 200px;
  max-height: 200px;
  overflow: scroll;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
/* Links inside the dropdown */
.dropdown-content button {
  width: 100%;
  color: black;
  padding: 4px 8px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}
</style>