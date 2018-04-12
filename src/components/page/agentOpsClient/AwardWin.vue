<template>
    <div class="personal-info">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>奖品管理</el-breadcrumb-item>
                <el-breadcrumb-item>兑奖中心</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="panel-body">
            <div class="panel-heading searchDiv">
                <el-row :gutter="12">
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-input v-model="name" placeholder="奖品模糊查询"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" @click="search()">查询</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column label="中奖时间" :formatter="formatTime"  prop="time"></el-table-column>
                <el-table-column label="奖品名称" prop="award_name"></el-table-column>
                <el-table-column label="奖品类型" :formatter="formatType" prop="award_type"></el-table-column>
                <el-table-column label="中奖者" prop="user_name"></el-table-column>
                <el-table-column label="手机号" prop="mobile"></el-table-column>
                <el-table-column label="地址" prop="address"></el-table-column>
                <el-table-column label="中奖状态" :formatter="formatStatus" prop="status"></el-table-column>
            </el-table>
        </div>
        <div class="panel-footer">
            <v-page @getPageData="getTablePageData" :total-num="totalNum"></v-page>
        </div>
    </div>
</template>
<script>
    export default {
        name: "",
        data() {
            return {
                name: '',
                totalNum: 0,
                tableData: []
            }
        },
        methods: {
            getTablePageData(pagerObj) {
                let params = {
                    name: this.name,
                    currentPage: pagerObj.currentPage,
                    pageSize: pagerObj.pageSize
                }
                console.log(params)
                let that = this
                that.$axios.get('/act/win/', {params: params}).then(function (res) {
                    console.log(res.data);
                    if (res.status === 200 && res.data.code === 0) {
                        that.tableData = res.data.data.result
                        that.totalNum = res.data.data.totalNum
                    } else {
                        that.tableData = []
                        that.totalNum = 0
                    }
                }).catch((error) => {
                    console.log(`查询err: ${error}`)
                    that.tableData = []
                    that.totalNum = 0
                })
            },
            search() {
                let name = this.name && this.name.replace(/^\s+|\s+$/g, '');
                let params = {name: name};
                let that = this;
                that.$axios.get('/act/win/?timestamp='+Date.now(), {params: params}).then(function (res) {
                    console.log(res.data);
                    if (res.status === 200 && res.data.code === 0) {
                        that.tableData = res.data.data.result
                        that.totalNum = res.data.data.totalNum
                    } else {
                        that.tableData = []
                        that.totalNum = 0
                    }
                }).catch((error) => {
                    console.log(`查询err: ${error}`)
                    that.tableData = []
                    that.totalNum = 0
                })
            },
            formatType(row){
                let text = '';
                if(row.award_type === 2){
                    text = '优惠券'
                }else{
                    text = '实物'
                }
                return text;
            },
            formatTime(row){
                return this.$moment(row.time).format('YYYY-MM-DD HH:mm:ss')
            },
            formatStatus(row){
                let text = '';
                if(row.status === 1){
                    text = '登记'
                }else if(row.status === 5){
                    text = '发货'
                }else if(row.status === 10){
                    text = '收货'
                }else if(row.status === 15){
                    text = '未收货'
                }else if(row.status === 20){
                    text = '退货'
                }
                return text;
            },
        },
        mounted () {
            let that = this
            that.$axios.get('/act/win/?timestamp='+Date.now()).then(function (res) {
                if (res.status === 200 && res.data.code === 0) {
                    console.log(res.data);
                    that.tableData = res.data.data.result
                    that.totalNum = res.data.data.totalNum
                }
            })
        }
    }
</script>
<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .panel-footer {
        text-align: right;
    }
    .el-date-editor, .el-input, .el-select, .el-button{
        margin-bottom: 5px;
    }
</style>
