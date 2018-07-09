<template>
    <div class="recommend">
        <scroll class="recommend-content" :data="discList" ref="scroll">
          <div>
            <div v-if="recommends.length" class="slider-wrapper">
                <slider>
                    <div v-for="(item,index) in recommends" :key="index">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="" @load="loadImage" class="needsclick">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommend-list">
              <h1 class="list-title">热门歌单推荐</h1>
              <ul>
                <li v-for="(item,index) in discList" :key="index" class="item">
                  <div class="icon">
                    <img v-lazy="item.imgurl" alt="imgIcon" width="60" height="60">
                  </div>
                  <div class="text">
                    <h2 class="name" v-html="item.creator.name"></h2>
                    <p class="desc" v-html="item.dissname"></p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <loading class="loading-container" v-show="!discList.length"></loading>
        </scroll>
    </div>
</template>

<script>
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider)
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
          // console.log(res.data.list)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          /* item使用flex布局 */
          display: flex
          box-sizing: border-box
          /* item内部的元素在交叉轴上中心对齐（即水平居中） */
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            /* 项目设置flex，存在剩余空间时不放大；当空间不足时其他项目缩小，该项目不缩小；该项目初始大小20px*20px */
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            /* 项目使用flex布局 */
            display: flex
            /* 主轴方向为colum */
            flex-direction: column
            /* text内部元素在主轴上中心对齐（即垂直居中） */
            justify-content: center
            /* 等价于flex:1 1 auto ，即存在剩余空间时放大，且由于icon设置flex-shrink为0，导致text在空间不足时优先缩小，auto自动补充多余空间 */
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
