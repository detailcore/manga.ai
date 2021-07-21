<template>
  <div class="short">
    <div class="cover" :style="dataResult.cover"></div>
    <div class="info">
      <div class="title"> {{ dataResult.title }} </div>
      <div class="category" v-if="dataResult.category"> {{ dataResult.category }} <span>({{ dataResult.year }})</span> </div>
      <div class="category description" v-if="dataResult.description"> {{ dataResult.description }} </div>
      <div class="category" v-if="dataResult.count">Кол-во глав: {{ dataResult.count }} </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    type: { type: String, default: '' },
    cover: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    year: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    category: { type: String, default: '' },
  },

  computed: {
    dataResult() {
      if(this.type === 'translator') {
        return {
          id: this.id,
          cover: { backgroundImage: `url(${this.cover})` },
          title: this.title,
          description: this.description
        }
      }
      if(this.type === 'top') {
        return {
          id: this.id,
          year: this.year,
          cover: { backgroundImage: `url(${this.cover})` },
          title: this.title,
          category: this.category
        }
      }
      if(this.type === 'branch') {
        return {
          id: this.id,
          cover: {
            backgroundImage: `url(${this.cover})`,
            height: '60px',
            borderRadius: '50%',
            margin: '8px',
            marginRight: '0',
          },
          title: this.title,
          count: this.count,
        }
      }
    },
  }
};
</script>

<style lang="scss">
.short {
  cursor: pointer;
  display: flex;
  padding: 0;
  margin: 12px 0;
  position: relative;
  border-radius: 6px;
  border: thin solid rgba(255, 255, 255, 0.12);
    &:hover {
      &:before {
        opacity: 0.1;
      }
    }
    &:before {
      @include before;
    }
  .cover {
    width: 60px;
    height: 90px;
    border-radius: 6px;
    background-size: cover;
    background-position: center;
  }
  .info {
    padding-left: 8px;
    width: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      @include text_two_line;
      margin-bottom: 8px;
    }
    .category {
      @include text_two_line;
      font-size: 0.9rem;
      color: #919191;
    }
  }
}
</style>
