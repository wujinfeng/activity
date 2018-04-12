
<template>
  <div class="table-page">
    <el-table
      :data="cityData"
      border
      show-summary
      sum-text="当前页合计"
      style="width: 100%;text-align: center;">
      <el-table-column
        v-for="(item,index) in tableList"
        :key="index"
        :prop="item.prop"
        :label="item.label">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:"",
  props: ['prop','label'],
	data(){
		return{

		}
	},
	mounted() {
	},
	methods:{
	}
}

</script>

<style scoped>

</style>
