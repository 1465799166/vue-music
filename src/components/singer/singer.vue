<template>
    <div class="singer">
        <listview :data="singers"></listview>
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import Listview from 'base/listview/listview'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data () {
    return {
      singers: []
    }
  },
  components: {
    Listview
  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    // 最终得到一个 以hot开头，紧接a到z升序排列的歌手数组
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 将得到的list中抽出id,姓名，形成map对象
      list.forEach((item, index) => {
        // 将前10个数据作为热门歌手
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        // 每次遍历判断map中是否有该Findex
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 生成a到z升序的列表数据和hot数据
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        // 正则匹配所有title为a到z，A到Z的val
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 将ret数组按a到z升序排列
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }

  }
}
</script>

<style lang="stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
