<template>
    <div class="personal-info">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>奖品管理</el-breadcrumb-item>
                <el-breadcrumb-item>奖品列表</el-breadcrumb-item>
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
                <el-table-column label="奖品名称" prop="name"></el-table-column>
                <el-table-column label="奖品类型" :formatter="formatType" prop="type"></el-table-column>
                <el-table-column label="有效期" :formatter="formatTime"></el-table-column>
                <el-table-column label="状态" :formatter="formatStatus"></el-table-column>
                <el-table-column label="被抽中 ｜ 库存" prop="status">
                    <template slot-scope="scope">
                        {{scope.row.inventory - scope.row.available}}  |  {{scope.row.inventory}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <router-link :to="{name: 'AwardAdd', params: {pageStatus:'edit', row: scope.row  }}">
                            <el-button type="primary" size="mini">编辑</el-button>
                        </router-link>
                        <!--<el-button type="primary" size="mini" @click="del(scope.row.id, scope.$index)">库存详情</el-button>
                        <el-button type="primary" size="mini" @click="del(scope.row.id, scope.$index)">添加库存</el-button>-->
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
                    pageSize: pagerObj.pageSize,
                    timestamp: Date.now()
                };
                console.log(params)
                let that = this
                that.$axios.get('/act/promotions', {params: params}).then(function (res) {
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
                let params = {name: name };
                let that = this;
                that.$axios.get('/act/promotions', {params: params}).then(function (res) {
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
                if(row.type === 1){
                    text = '实物'
                }else if(row.type === 2){
                    text = '优惠卷'
                }
                return text;
            },
            formatTime(row){
               return this.$moment(row.begin_time).format('YYYY-MM-DD')+ ' 至 ' +this.$moment(row.end_time).format('YYYY-MM-DD')
            },
            formatStatus(row){
                var now = Math.round(new Date().getTime()/1000);
                var begin = this.$moment(row.begin_time).unix();
                var end = this.$moment(row.end_time).unix();
                if(begin < now && now < end){
                    return '有效'
                }else{
                    return '失效';
                }
            },
            del (val, index) {
                if(val === 24){
                    this.$message({type: 'error', message: '禁止删除！'});
                    return;
                }
                let that = this;
                that.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$axios({
                        url:'/act/promotions/',
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
            that.$axios.get('/act/promotions/?timestamp='+Date.now()).then(function (res) {
                if (res.status === 200 && res.data.code === 0) {
                    console.log(res.data.data);
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
