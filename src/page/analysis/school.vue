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
     <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
  </div>
</template>
<script>
// import schoolApi from '@/lib/api/school'
export default {
  name: "",
  data() {
    return {
      value: "",
    };
  },
  created() {
    document.title = "学校管理";
    var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();
  },
  mounted() {
  },
  methods: {
    $imgAdd(pos, $file){
      console.log(pos,$file)
    },
    $imgDel(pos, $file){
      console.log(pos,$file)
    },
  },
};
</script>
