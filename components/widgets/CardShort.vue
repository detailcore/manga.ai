<template>
  <nuxt-link :to="urlResult"  class="short">
    <img class="cover" loading="lazy" :srcset="imageUrl+'.webp'" :src="imageUrl" :alt="dataResult.title" />

    <div class="info">
      <div class="title"> {{ dataResult.title }} </div>
      <div class="category" v-if="dataResult.category"> {{ dataResult.category }} <span>({{ dataResult.year }})</span> </div>
      <div class="category description" v-if="dataResult.description"> {{ dataResult.description }} </div>
      <div class="category" v-if="dataResult.count">Кол-во глав: {{ dataResult.count }} </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    alias: { type: String, default: '' },
    type: { type: String, default: '' },
    cover: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    year: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    category: { type: String, default: '' },
  },

  computed: {
    imageUrl() {
      return this.dataResult.cover
    },
    urlResult() {
      return (this.alias === '') ? this.dataResult.url + this.id : this.dataResult.url + this.alias
    },
    dataResult({ $config: { urlCoverTitle, urlCoverTeam } }) {
      switch (this.type) {
        case 'translator':
          return {
            id: this.id,
            url: '/team/',
            cover: this.isCover(urlCoverTeam),
            title: this.title,
            description: this.description
          }

        case 'top':
          return {
            id: this.id,
            url: '/manga/',
            year: this.year,
            cover: this.isCover(urlCoverTitle),
            title: this.title,
            category: this.category
          }

        case 'branch':
          return {
            id: this.id,
            url: '/',
            cover: {
              backgroundImage: `url(${urlCoverTeam + this.id +'/'+ this.cover})`,
              height: '60px',
              borderRadius: '50%',
              margin: '8px',
              marginRight: '0',
            },
            title: this.title,
            count: this.count,
          }
      
        default:
          break;
      }
    },
  },

  methods: {
    isCover(typeUrl) {
      return this.cover ? typeUrl + this.id +'/'+ this.cover : typeUrl.replace(/uploads\/.*?$/gm, 'uploads/') + 'no-image.png'
      // return this.cover ? typeUrl + this.id +'/'+ this.cover : require('~/assets/images/no-image.jpg')
    }
  },
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
      text-decoration: none;
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
