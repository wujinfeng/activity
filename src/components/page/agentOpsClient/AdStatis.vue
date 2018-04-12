<template>
    <div class="personal-info">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>广告管理</el-breadcrumb-item>
                <el-breadcrumb-item>广告统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="panel-body">
            <div class="panel-heading searchDiv">
                <el-row :gutter="12">
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-input v-model="name" placeholder="广告模糊查询"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" @click="search()">查询</el-button>
                            <!--<router-link :to="{name: 'AdAdd', params: {pageStatus:'add', id: ''}}">
                                <el-button type="info">添加</el-button>
                            </router-link>-->
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column label="广告名称" prop="name"></el-table-column>
                <el-table-column label="累计点击" :formatter="clickNum"></el-table-column>
                <el-table-column label="创建日期" :formatter="formatCtime" ></el-table-column>
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
                    pageSize: pagerObj.pageSize,
                    timestamp: Date.now()
                }
                console.log(params)
                let that = this
                that.$axios.get('/act/get_ad_statistics/', {params: params}).then(function (res) {
                    if (res.status === 200 && res.data.code === 0) {
                        that.tableData = res.data.data.result;
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
                let params = {name: name, timestamp: Date.now()};
                let that = this
                that.$axios.get('/act/get_ad_statistics/', {params: params}).then(function (res) {
                    if (res.status === 200 && res.data.code === 0) {
                        that.tableData = res.data.data.result;
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
            formatCtime(row) {
                return  row.ctime ? this.$moment(row.ctime).format('YYYY-MM-DD HH:mm:ss') :''
            },
            clickNum(row) {
                return  row.click_num[0] ? row.click_num[0][0] :''
            },
        },
        mounted () {
            let that = this
            that.$axios.get('/act/get_ad_statistics/?timestamp='+Date.now()).then(function (res) {
                if (res.status === 200 && res.data.code === 0) {
                    that.tableData = res.data.data.result;
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
