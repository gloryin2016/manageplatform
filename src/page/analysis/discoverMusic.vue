<style lang="less" scoped>
.student-data {
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  .container {
    position: relative;
    max-width: 1200px;
    min-width: 600px;
    .swiper-part {
      width: 100%;
      height: 224px;
      padding: 12px 24px;
      box-sizing: border-box;
    }
    .recomend-title {
      width: 100%;
      height: 42px;
      font-weight: 600;
      color: #606266;
      line-height: 42px;
      text-align: left;
      padding-left: 24px;
      font-size: 20px;
      box-sizing: border-box;
    }
    .card-container {
      width: 100%;
      position: relative;
      .recomend-card {
        max-width: 1200px;
        min-width: 600px;
        padding: 12px 14px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;
        flex: 1;
        .card-list {
          width: 20%;
          padding: 0 10px 20px 10px;
          box-sizing: border-box;
          .cover {
            width: 100%;
            display: block;
            border-radius: 6px;
          }
          .title {
            width: auto;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            overflow: hidden;
            color: #909399;
            text-overflow: ellipsis; /* 超出部分显示省略号 */
            white-space: nowrap; /*规定段落中的文本不进行换行 */
            text-align: left;
          }
        }
      }
    }
    .play-list {
      width: 100%;
      position: relative;
      padding: 12px 24px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .list-content {
        width: 50%;
        height: 84px;
        padding: 12px 10px;
        box-sizing: border-box;
        display: flex;
        .music-index {
          width: 60px;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
        .music-cover {
          width: 60px;
          height: 60px;
          border-radius: 2px;
        }
        .music-info {
          min-width: 240px;
          max-width: 300px;
          margin-left: 16px;
          .name {
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #303133;
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .singer {
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #606266;
            font-size: 12px;
          }
        }
      }
      .list-content:hover {
        background: #f2f6fc;
      }
    }
    .movie-list {
      width: 100%;
      position: relative;
      padding: 12px 12px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .list-content {
        width: 25%;
        padding: 0 12px;
        box-sizing: border-box;
        .mv-pic {
          width: 100%;
          border-radius: 4px;
        }
        .title {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 0.12em;
          color: #303133;
        }
        .singer {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 0.12em;
          color: #909399;
        }
      }
    }
  }
}
</style>
<template>
  <div class="student-data">
    <div class="container">
      <!-- <div class="swiper-part">
        <Carousel autoplay v-model="value2" loop>
          <CarouselItem v-for="(item, index) in imageList" :key="index">
            <img :src="item.imageUrl" alt="" />
          </CarouselItem>
        </Carousel>
      </div> -->
      <div class="recomend-title">今日推荐</div>
      <div class="card-container">
        <div class="recomend-card">
          <div class="card-list" v-for="(item, index) in cardList" :key="index">
            <img class="cover" :src="item.picUrl" alt="" />
            <div class="title">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="recomend-title">最新音乐</div>
      <div class="play-list">
        <div
          class="list-content"
          v-for="(item, index) in songsList"
          :key="index"
        >
          <div class="music-index">{{ index + 1 }}</div>
          <img class="music-cover" :src="item.picUrl" alt="" />
          <div class="music-info">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
      <div class="recomend-title">推荐MV</div>
      <div class="movie-list">
        <div class="list-content" v-for="(item, index) in mvList" :key="index">
          <img class="mv-pic" :src="item.picUrl" alt="" />
          <div class="title">{{ item.name }}</div>
          <div class="singer">{{ item.artistName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import homeApi from "@/lib/api/homePage";
export default {
  name: "",
  data() {
    return {
      value2: 0,
      imageList: [],
      songsList: [],
      cardList: [],
      mvList: [],
    };
  },
  created() {
    document.title = "发现网抑";
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.GetBanner();
      this.GetNewSongs();
      this.GetSongsList();
      this.GetMvRecomend();
    },
    GetBanner() {
      homeApi.GetBannerList({}).then((res) => {
        console.log("banner", res);
        this.imageList = res.banners;
      });
    },
    //最新音乐
    GetNewSongs() {
      homeApi.GetNewSongList({}).then((res) => {
        console.log("最新音乐", res);
        this.songsList = res.result;
      });
    },
    //今日推荐
    GetSongsList() {
      homeApi.GetSongsList({}).then((res) => {
        console.log("今日推荐", res);
        this.cardList = res.result;
      });
    },
    //MV推荐
    GetMvRecomend() {
      homeApi.GetMvList({}).then((res) => {
        console.log("MV推荐", res);
        this.mvList = res.result;
      });
    },
  },
};
</script>
