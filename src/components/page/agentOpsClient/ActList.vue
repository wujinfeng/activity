<template>
    <div class="personal-info">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="panel-body">
            <div class="panel-heading searchDiv">
                <el-row :gutter="12">
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-input v-model="name" placeholder="活动模糊查询"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" @click="search()">查询</el-button>
                           <!-- <router-link :to="{name: 'ActAdd', params: {pageStatus:'add', id: ''}}">
                                <el-button type="info">添加</el-button>
                            </router-link>-->
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column label="活动ID" prop="id"></el-table-column>
                <el-table-column label="活动名称" prop="name"></el-table-column>
                <el-table-column label="活动token" prop="token"></el-table-column>
                <el-table-column label="创建日期" :formatter="formatCtime" ></el-table-column>
                <el-table-column label="活动类型" :formatter="formatType"></el-table-column>
                <el-table-column label="有效期" :formatter="formatTime"></el-table-column>
                <el-table-column label="状态" :formatter="formatStatus"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name: 'ActAdd', params: {pageStatus:'edit', token: scope.row.token  }}">
                            <el-button type="primary" size="mini">编辑</el-button>
                        </router-link>
                        <el-button type="danger" size="mini" @click="del(scope.row.id, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
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
                };
                console.log(params);
                let that = this;
                that.$axios.get('/act/activity/?timestamp='+Date.now(), {params: params}).then(function (res) {
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
                that.$axios.get('/act/activity/?timestamp='+Date.now(), {params: params}).then(function (res) {
                    if (res.status === 200 && res.data.code === 0) {
                        that.tableData = res.data.data.result;
                        that.totalNum = res.data.data.totalNum
                    } else {
                        that.tableData = [];
                        that.totalNum = 0
                    }
                }).catch((error) => {
                    console.log(`查询err: ${error}`);
                    that.tableData = [];
                    that.totalNum = 0
                })
            },
            formatType(row){
                let text = '';
                if(row.type === 1){
                    text = '大转盘'
                }
                return text;
            },
            formatTime(row){
                return this.$moment(row.begin_time).format('YYYY-MM-DD HH:mm:ss')+ ' 至 ' +this.$moment(row.end_time).format('YYYY-MM-DD HH:mm:ss')
            },
            formatCtime(row) {
                return  row.ctime ? this.$moment(row.ctime).format('YYYY-MM-DD HH:mm:ss') :''
            },
            formatStatus(row){
                let now = Math.round(new Date().getTime()/1000);
                let begin = this.$moment(row.begin_time).unix();
                let end = this.$moment(row.end_time).unix();
                if(begin < now && now < end){
                    return '有效'
                }else{
                    return '失效';
                }
            },
            del (val, index) {
                let that = this;
                that.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$axios({
                        url:'/act/activity/',
                        method:'post',
                        data: {id: val, method:'delete'},
                        transformRequest: [function (data) {
                            let ret = '';
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }]}).then((res) => {
                        if (res.status === 200 && res.data.code === 0) {
                            this.tableData.splice(index, 1); // 减去一个
                            that.$message({type: 'success', message: '删除成功!'})
                        } else {
                            console.log(res.data.msg);
                            that.$message({type: 'error', message: '删除失败'})
                        }
                    })
                }).catch(() => {
                    that.$message({type: 'info', message: '已取消删除'})
                })
            }
        },
        mounted () {
            let that = this;
            that.$axios.get('/act/activity/?timestamp='+Date.now()).then(function (res) {
                if (res.status === 200 && res.data.code === 0) {
                    console.log(res.data);
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
