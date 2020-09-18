<style lang="less" scoped>
.student-data {
  width: 100%;
  height: 100%;
  padding: 18px;
  box-sizing: border-box;
  background: #f3f3f3;
  position: relative;
}
</style>
<template>
  <div class="student-data">
    <div id="container">
      <div class="image">
        <img
          src="http://ww4.sinaimg.cn/mw600/005vbOHfgw1ercvg85sr0j30jg0t6tdq.jpg"
          alt="Hello World"
        />
        <em></em>
      </div>
    </div>
  </div>
</template>
<script>
// import schoolApi from '@/lib/api/school'
import axios from "axios";
export default {
  data() {
    const self = this;
    return {
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: "all",
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(result);
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
          },
        },
      ],
    };
  },
  created() {},
  mounted() {},
  methods: {
    req_post() {
      // const that = this;
      const registerUrl =
        "http://restapi.amap.com/v3/batch?key=b210e9e51c4cf865d4c4f93d3054ea93";
      const newUserInfo = {
        ops: [
          {
            url:
              "/v3/place/around?offset=10&page=1&key=b210e9e51c4cf865d4c4f93d3054ea93&location=" +
              this.lng +
              "," +
              this.lat +
              "&output=json&radius=100000&types=080000",
          },
        ],
      };
      axios
        .post(registerUrl, newUserInfo, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(function(response) {
          console.log(response["data"][0]["body"]["pois"]);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>
