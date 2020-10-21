<style lang="less" scoped>
.homePage {
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  .search-bar {
    width: 100%;
    height: 80px;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .searchInfo {
      width: 300px;
    }
  }
  .table-content {
    padding: 6px 12px;
    box-sizing: border-box;
  }
  .page {
    padding: 6px 12px;
    box-sizing: border-box;
    margin-bottom: 80px;
  }
}
</style>
<template>
  <div class="homePage">
    <div class="search-bar">
      <div class="searchInfo"></div>
      <Input
        v-model="keyWords"
        @on-change="SearchSongs"
        placeholder="请输入"
        style="width: 240px"
      />
    </div>
    <div class="table-content">
      <Table
        stripe
        size="small"
        :columns="columns1"
        :data="searchSongsList"
        @on-row-click="checkInfo"
      ></Table>
    </div>
    <div class="page">
      <Page
        :total="songCount"
        :page-size="pageSize"
        @on-change="ChangePage"
        @on-page-size-change="ChangePageSize"
        show-sizer
      />
    </div>
  </div>
</template>
<script>
import songsApi from "@/lib/api/songs";
import commonJs from "@lib/tools/common";
import utilsTool from "@/lib/utils/index";
import store from "@src/store";
export default {
  name: "",
  data() {
    return {
      columns1: [
        {
          title: "",
          width: 80,
          key: "sort",
        },
        {
          title: "歌曲名称",
          key: "name",
        },
        {
          title: "歌手",
          key: "artistsName",
        },
        {
          title: "专辑",
          key: "albumTitle",
        },
        {
          title: "专辑",
          key: "albumTitle",
        },
        {
          title: "时长",
          key: "finalTime",
        },
      ],
      keyWords: "",
      searchSongsList: [],
      songCount: 0,
      start: 0,
      pageSize: 30,
      songInfo: {},
    };
  },
  created() {
    document.title = "搜索歌曲";
  },
  mounted() {
    this.searchSongsList = store.state.songs.songList;
    console.log(commonJs.GetUserApp())
  },

  methods: {
    SearchSongs() {
      songsApi
        .SearchSongs({
          start: this.start,
          pageSize: this.pageSize,
          keywords: this.keyWords,
        })
        .then((res) => {
          this.searchSongsList = res.result.songs.map((item, index) => {
            if (index < 9) {
              item.sort = `0${index + 1}`;
            } else {
              item.sort = `${index + 1}`;
            }
            if (item.artists.length > 1) {
              item.artistsName = item.artists[0].name;
            } else {
              item.artistsName = item.artists[0].name;
            }
            item.albumTitle = item.album.name;
            item.albumId = item.album.id;
            item.url = commonJs.GetSongPlayUrl(item.id);
            item.finalTime = commonJs.TimeToString(item.duration / 1000);
            return {
              index: index,
              id: item.id,
              name: item.name,
              artistsName: item.artistsName,
              albumId: item.albumId,
              finalTime: item.finalTime,
              url: item.url,
              cover: "",
              albumTitle: item.albumTitle,
              sort: item.sort,
              mvId: item.mvid,
            };
          });
          this.songCount = res.result.songCount;
          setTimeout(() => {
            this.SetSongsList();
          }, 200);
        });
    },
    SetSongsList() {
      this.$store.dispatch("setSongList", this.searchSongsList);
    },
    checkInfo(row) {
      console.log(row)
      this.songInfo = row
      this.GetCover(row.albumId)
    },
    //获取封面
    GetCover(albumId) {
      // songsApi
      //   .GetAlbumInfo({
      //     id: albumId,
      //   })
      //   .then((res) => {
      //     this.songInfo.cover = res.album.picUrl;
      //     this.SetSongsInfo()
      //   });
        utilsTool.GetSongCover({
        id: albumId,
        success: (res) => {
          console.log(res)
          this.songInfo.cover = res.songCover;
          this.SetSongsInfo()
        },
      });
    },
    SetSongsInfo() {
      let songList = store.state.songs.songHistory
      songList.push(this.songInfo)
      this.$store.dispatch("setSongInfo", this.songInfo);
      this.$store.dispatch("pushSongRecord", songList);
      this.$router.push({ name: "audioPlay", query: { play: 1,  } });
    },
    ChangePage(index) {
      this.start = (index - 1) * this.pageSize
      this.SearchSongs()
    },
    ChangePageSize(pageSize) {
      this.pageSize = pageSize
      this.SearchSongs()
    },
  },
};
</script>
