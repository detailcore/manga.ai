<template>
  <div class="line reasons" v-if="reasons.length != 0">
    <div class="subtitle">Причины</div>
    <div class="content">
      <div class="reason" v-for="item in reasons" :key="item.id">№ {{ item.id }} - {{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reasons: { type: Array, default: () => ([]) },
  },
};
</script>
