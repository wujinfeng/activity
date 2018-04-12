<template>
    <div class="personal-info">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动{{pageStatus==='edit'?'编辑':'添加'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-light">
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                        <el-tab-pane label="内容设置" name="first">
                            <div class="panel-body page-wrap">
                                <el-form ref="form" status-icon :model="form" :rules="rules" label-width="130px"
                                         class="demo-ruleForm">
                                    <el-form-item label="活动名称：" prop="name">
                                        <el-input v-model="form.name" placeholder="名称不能重复"></el-input>
                                    </el-form-item>
                                    <el-form-item label="活动时间：" prop="createdAt">
                                        <datetime-picker @parent-event="getFormDate" :start-time="formStartTime"
                                                         :end-time="formEndTime"></datetime-picker>
                                    </el-form-item>
                                    <el-form-item label="抽奖次数/人：" prop="user_count_limit">
                                        <el-input v-model="form.user_count_limit"></el-input>
                                    </el-form-item>
                                    <el-form-item label="抽奖次数类型：" prop="type_limit">
                                        <el-select v-model="form.type_limit" placeholder="抽奖次数类型">
                                            <el-option
                                                v-for="item in typeLimitOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="banner1：" prop="banner1_id">
                                        <el-input v-model="form.banner1_id" placeholder="填写广告id, 为空则不显示"></el-input>
                                    </el-form-item>
                                    <el-form-item label="banner2：" prop="banner2_id">
                                        <el-input v-model="form.banner2_id" placeholder="填写广告id, 为空则不显示"></el-input>
                                    </el-form-item>
                                    <el-form-item label="弹屏广告：" prop="popup">
                                        <el-input v-model="form.popup" placeholder="填写广告id"></el-input>
                                    </el-form-item>
                                    <el-form-item label="弹屏广告时长：" prop="popup_duration">
                                        <el-input v-model="form.popup_duration" placeholder="单位秒，0秒则不弹出"></el-input>
                                    </el-form-item>
                                    <el-form-item label="活动规则：" prop="rule">
                                        <el-input type="textarea" :rows="8" v-model="form.rule"></el-input>
                                    </el-form-item>
                                    <el-form-item label="提交页标题：" prop="subtitle">
                                        <el-input v-model="form.subtitle" placeholder="最长8个字"></el-input>
                                    </el-form-item>
                                    <el-form-item label="完成页提示语：" prop="oktip">
                                        <el-input v-model="form.oktip" placeholder="最长8个字"></el-input>
                                    </el-form-item>
                                    <el-form-item label="背景图片：" prop="bgpic">
                                        <el-upload
                                            class="upload"
                                            action="/act/img/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemoveF"
                                            :before-upload="beforeUpload"
                                            :on-error="uploadError"
                                            :on-success="uploadSuccessF"
                                            name="img"
                                            :limit=1
                                            list-type="picture"
                                            :on-exceed="handleExceed"
                                            :file-list="fileListF">
                                            <el-button size="mini" type="primary">点击上传
                                                <i class="el-icon-upload el-icon--right"></i>
                                            </el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传 jpg, png, gif 文件</div>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="二维码图片：" prop="okpic">
                                        <el-upload
                                            class="upload"
                                            action="/act/img/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemoveR"
                                            :before-upload="beforeUpload"
                                            :on-error="uploadError"
                                            :on-success="uploadSuccessR"
                                            name="img"
                                            :limit=1
                                            :on-exceed="handleExceed"
                                            list-type="picture"
                                            :file-list="fileListR">
                                            <el-button size="mini" type="primary">点击上传
                                                <i class="el-icon-upload el-icon--right"></i>
                                            </el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传 jpg, png, gif文件</div>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="转盘图片：" prop="turpic">
                                        <el-upload
                                            class="upload"
                                            action="/act/img/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemoveTur"
                                            :before-upload="beforeUpload"
                                            :on-error="uploadError"
                                            :on-success="uploadSuccessTur"
                                            name="img"
                                            :limit=1
                                            list-type="picture"
                                            :on-exceed="handleExceed"
                                            :file-list="fileListTur">
                                            <el-button size="mini" type="primary">点击上传
                                                <i class="el-icon-upload el-icon--right"></i>
                                            </el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传 jpg, png , gif文件</div>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="箭头图片：" prop="arrpic">
                                        <el-upload
                                            class="upload"
                                            action="/act/img/"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemoveArr"
                                            :before-upload="beforeUpload"
                                            :on-error="uploadError"
                                            :on-success="uploadSuccessArr"
                                            name="img"
                                            :limit=1
                                            :on-exceed="handleExceed"
                                            list-type="picture"
                                            :file-list="fileListArr">
                                            <el-button size="mini" type="primary">点击上传
                                                <i class="el-icon-upload el-icon--right"></i>
                                            </el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传 jpg, png, gif文件</div>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="是否分享：" prop="share">
                                        <el-select v-model="form.share" placeholder="请选择是否分享">
                                            <el-option
                                                v-for="item in shareOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="奖品设置" name="second">
                            <el-button type="primary" @click="dialogTableVisible = true" plain>添加</el-button>
                            <el-dialog title="奖品列表" width="70%" :visible.sync="dialogTableVisible">
                                <div>
                                    <el-input placeholder="请输入内容，模糊查询" v-model="searchAward">
                                        <el-button slot="append" icon="el-icon-search"
                                                   @click="searchRemoteAward"></el-button>
                                    </el-input>
                                </div>
                                <el-table :data="queryAwardData">
                                    <el-table-column property="pic" label="图片">
                                        <template slot-scope="scope">
                                            <img :src="picFormat(scope.row)" style="max-width: 100px;height: 50px"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column property="name" label="名称"></el-table-column>
                                    <el-table-column property="type" :formatter="formatType"
                                                     label="类型"></el-table-column>
                                    <el-table-column label="有效期" :formatter="formatTime"></el-table-column>
                                    <el-table-column label="可用/库存">
                                        <template slot-scope="scope">
                                            / {{scope.row.inventory}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template slot-scope="scope">
                                            <el-button type="warning" size="mini"
                                                       @click="getAward(scope.row, scope.$index)">获取
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-dialog>

                            <el-table
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column prop="pic" label="图片">
                                    <template slot-scope="scope">
                                        <img :src="picFormat(scope.row)" style="max-width: 100px;height: 50px"/>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="名称"></el-table-column>
                                <el-table-column prop="sort" label="排序/顺时针">
                                    <template slot-scope="scope">
                                        <el-input class="a-input" v-model='scope.row.sort'></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="user_win_limit" label="中奖限制/个" >
                                    <template slot-scope="scope">
                                        <el-popover
                                            ref="popover1"
                                            placement="top-start"
                                            width="300"
                                            trigger="hover"
                                            content="限制每一个用户最多能抽中该奖品多少次,填0表示不限制">
                                        </el-popover>
                                        <el-input class="a-input" autosize  v-model='scope.row.user_win_limit'  v-popover:popover1></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="win_limit" label="数量限制/个">
                                    <template slot-scope="scope">
                                        <el-popover
                                            ref="popover2"
                                            placement="top-start"
                                            width="300"
                                            trigger="hover"
                                            content="最小可设置为0,不能超过库存">
                                        </el-popover>
                                        <el-input class="a-input" v-model='scope.row.win_limit' v-popover:popover2></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="probability" label="中奖概率/%">
                                    <template slot-scope="scope">
                                        <el-popover
                                            ref="popover3"
                                            placement="top-start"
                                            width="300"
                                            trigger="hover"
                                            content="中奖概率=奖品数/预估的参与人数*100%，最小可设置为0,精确0.01，注:所有奖品概率总和必须等于100%">
                                        </el-popover>
                                        <el-input class="a-input" v-model.number='scope.row.probability' v-popover:popover3 >
                                            <i slot="suffix" class="el-input__icon">%</i>
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="danger" size="mini" @click="del(scope.$index)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <br>
                        </el-tab-pane>
                    </el-tabs>
                    <el-button type="primary" @click="save('form')">保存</el-button>

                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "",
        data() {
            return {
                formStartTime: '',
                formEndTime: '',
                pageStatus: 'add', // 页面默认添加 add ,edit
                form: {
                    id: '',
                    name: '',
                    user_count_limit: 0, // 抽奖次数
                    type_limit: 1,   // 抽奖次数类型
                    createdAt: [],
                    banner1_id: '',
                    banner2_id: '',
                    popup: '',       // 弹屏广告
                    popup_duration: 0, // 弹屏广告时长
                    rule: '',        // 活动规则
                    subtitle: '',    // 提交页标题
                    oktip: '',       // 完成页提示语
                    bgpic: '',      // 背景图片
                    okpic: '',      // 二维码图片
                    turpic: '',      // 转盘图片
                    arrpic: '',      // 箭头图片
                    share: 1,       // 是否分享 1不显示，2显示
                    token: ''
                },
                fileListF: [],
                fileListR: [],
                fileListTur: [],
                fileListArr: [],
                tableData: [],
                dialogTableVisible: false, // 弹出框是否可看到
                typeLimitOptions: [{
                    value: 1,
                    label: '全程活动'
                }, {
                    value: 2,
                    label: '每日'
                }],
                shareOptions: [{
                    value: 1,
                    label: '不显示分享'
                }, {
                    value: 2,
                    label: '显示分享'
                }],
                activeName2: 'first',
                rules: {
                    createdAt: [
                        {required: true, message: '请输入时间', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    user_count_limit: [
                        {required: true, message: '请输入抽奖次数', trigger: 'blur'}
                    ],
                    type_limit: [
                        {required: true, message: '请选择抽奖次数类型', trigger: 'blur'}
                    ],
                    subtitle: [
                        { max:8, message: '最长8个字', trigger: 'blur'}
                    ],
                    oktip: [
                        { max:8, message: '最长8个字', trigger: 'blur'}
                    ],
                },
                searchAward: '',    // 模糊查询奖品名称
                queryAwardData: [], // 查询得到的奖品数据
            }
        },
        methods: {
            save(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (that.tableData.length < 1) {
                            that.$message({type: 'error', message: '请填写奖品设置！'});
                            return;
                        }

                        let arr = [];
                        let validAwardProbability = 0;
                        let existInValidAward = false;
                        for (let i = 0; i < that.tableData.length; i++) {
                            let o = that.tableData[i];
                            if(o.id !== 24){
                                validAwardProbability += Math.round(o.probability * 100);
                            }
                            if(o.id === 24){
                                existInValidAward = true;
                            }
                        }

                        if(existInValidAward){
                            for (let i = 0; i < that.tableData.length; i++) {
                                if(that.tableData[i].id === 24){
                                    that.tableData[i].probability = ((10000 - validAwardProbability)/100).toFixed(2);
                                    break;
                                }
                            }
                        }
                        if(!existInValidAward){
                            if(validAwardProbability !== 10000){
                                that.$message({type: 'error', message: '中奖概率总和必须为100%'});
                                return ;
                            }
                        }

                        for (let i = 0; i < that.tableData.length; i++) {
                            let o = that.tableData[i];
                            arr.push([o.id, o.user_win_limit || 0, o.win_limit || 0, Math.round((o.probability || 0)*100), o.sort || 1])
                        }
                        console.log('arr', arr)

                        let params = {
                            id: that.form.id,
                            type: 1, // 大转盘
                            name: that.form.name,
                            begin_time: that.$moment(that.form.createdAt[0]).format('YYYY-MM-DD HH:mm:ss'),
                            end_time: that.$moment(that.form.createdAt[1]).format('YYYY-MM-DD HH:mm:ss'),
                            user_count_limit: that.form.user_count_limit,
                            type_limit: that.form.type_limit,
                            banner1_id: that.form.banner1_id || '',
                            banner2_id: that.form.banner2_id || '',
                            popup: that.form.popup || '',
                            popup_duration: that.form.popup_duration,
                            rule: that.form.rule,
                            subtitle: that.form.subtitle,
                            oktip: that.form.oktip,
                            bgpic: that.form.bgpic,
                            okpic: that.form.okpic,
                            turpic: that.form.turpic,      // 转盘图片
                            arrpic: that.form.arrpic,      // 箭头图片
                            share: that.form.share,
                            token: that.form.token,
                            award_id: arr
                        };
                        let url = '/act/activity/';
                        if (that.pageStatus === 'edit') {
                            url = '/act/activity/';
                            params.method = 'put';
                        }
                        console.log(params);
                        that.$axios({
                            url: url,
                            method: 'post',
                            data: params,
                            transformRequest: [function (data) {
                                let ret = '';
                                for (let it in data) {
                                    if (data.hasOwnProperty(it)) {
                                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                    }
                                }
                                return ret
                            }]
                        }).then((res) => {
                            console.log(res.data);
                            if (res.data.code === 0) {
                                that.$message({type: 'success', message: '保存成功'});
                                that.$router.push({name: 'ActList'}) // 跳转列表页
                            } else {
                                that.$message({type: 'error', message: res.data.msg});
                            }
                        }).catch((error) => {
                            console.log(error)
                            that.$message({type: 'error', message: error});
                        });
                    }
                });
            },
            handleClick(tab, event) {
                //console.log(tab, event);
            },
            handleRemoveF(file, fileList) {  // 文件列表移除文件时的钩子
                console.log('handleRemoveF:')
                console.log('file')
                console.log(file)
                console.log('fileList')
                console.log(fileList)
                this.form.bgpic='';
            },
            handleRemoveR(file, fileList) {  // 文件列表移除文件时的钩子
                console.log('handleRemoveR:')
                console.log('file')
                console.log(file)
                console.log('fileList')
                console.log(fileList)
                this.form.okpic='';
            },
            handleRemoveTur(file, fileList) {  // 文件列表移除文件时的钩子
                console.log('handleRemoveTur:')
                console.log('file')
                console.log(file)
                console.log('fileList')
                console.log(fileList)
                this.form.turpic='';
            },
            handleRemoveArr(file, fileList) {  // 文件列表移除文件时的钩子
                console.log('handleRemoveArr:')
                console.log('file')
                console.log(file)
                console.log('fileList')
                console.log(fileList)
                this.form.arrpic='';
            },
            handlePreview(file) { // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
                console.log('handlePreview:')
                console.log(file)
            },
            handleExceed(files, fileList) { // 文件超出个数限制时的钩子
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            // 上传成功后的回调
            uploadSuccessF(response, file, fileList) {
                console.log('responseF:');
                console.log(response);
                if (response.code === 0) {
                    console.log('upload ok')
                    this.form.bgpic = response.data.url;
                    this.$message({message: '上传成功！', type: 'success'})
                } else {
                    this.$message({message: response.msg, type: 'error'})
                }
            },
            // 上传成功后的回调
            uploadSuccessR(response, file, fileList) {
                console.log('responseR:');
                console.log(response);
                if (response.code === 0) {
                    console.log('upload ok');
                    this.form.okpic = response.data.url;
                    this.$message({message: '上传成功！', type: 'success'})
                } else {
                    this.$message({message: response.msg, type: 'error'})
                }
            },
            // 上传成功后的回调
            uploadSuccessTur(response, file, fileList) {
                console.log('responseF:');
                console.log(response);
                if (response.code === 0) {
                    console.log('upload ok')
                    this.form.turpic = response.data.url;
                    this.$message({message: '上传成功！', type: 'success'})
                } else {
                    this.$message({message: response.msg, type: 'error'})
                }
            },
            // 上传成功后的回调
            uploadSuccessArr(response, file, fileList) {
                console.log('responseR:');
                console.log(response);
                if (response.code === 0) {
                    console.log('upload ok');
                    this.form.arrpic = response.data.url;
                    this.$message({message: '上传成功！', type: 'success'})
                } else {
                    this.$message({message: response.msg, type: 'error'})
                }
            },
            // 上传错误
            uploadError(err, file, fileList) {
                this.$message({message: '上传失败，请重试！', type: 'error'});
                console.log(err)
            },
            beforeUpload(file) {
                console.log('file:')
                console.log(file)
                // || file.type === 'image/png'
                let isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif');
                let isLtM = file.size / 1024 / 1024 < 1;
                if (!isJPG) {
                    this.$message.error('上传正确的格式!')
                }
                if (!isLtM) {
                    this.$message.error('文件大小不能超过 1MB!')
                }
                return isJPG && isLtM
            },
            formatType(row, column, cellValue) {
                let text = '';
                let type = row.type;
                if (type === 1) {
                    text = '实物';
                } else if (type === 2) {
                    text = '优惠卷';
                }
                return text;
            },
            getAward(row, index) {
                let that = this;
                that.queryAwardData.splice(index, 1); // 减去一个
                let o = {
                    id: row.id,
                    pic: row.pic,
                    name: row.name,
                    sort: 1,   // 排序/顺时针
                    user_win_limit: 0, // 中奖限制
                    win_limit: 0, // 数量限制
                    probability: 0, // 中奖概率
                };
                that.tableData.splice(0, 0, o);    // 增加一个
            },
            searchRemoteAward() {
                let that = this;
                let searchAward = this.searchAward || '';
                that.$axios.get('/act/promotions/?name='+searchAward+'&timestamp='+Date.now()).then(function (res) {
                    if (res.status === 200 && res.data.code === 0) {
                        that.queryAwardData = res.data.data.result;
                    }
                });
            },
            picFormat(row) {
                return row.pic ? (this.$WEB_DOMAIN + row.pic) : '';
            },
            formatTime(row) {
                return this.$moment(row.begin_time).format('YYYY-MM-DD') + ' 至 ' + this.$moment(row.end_time).format('YYYY-MM-DD')
            },
            del(index) {
                this.tableData.splice(index, 1); // 减去一个
            },
            getFormDate(val) {
                console.log('选择时间段', val);
                this.form.createdAt = val;
            },
            formatProbability(value) {
                let probability = 0;
                if(value === 0){
                    probability = 0;
                }else{
                    probability = (value/100).toFixed(2);
                }
                return probability
            },
        },
        beforeMount() {
            let that = this
            that.tableData = [];
            that.pageStatus = that.$route.params.pageStatus || 'add';
            let token = that.$route.params.token || '';
            if (that.pageStatus === 'edit') {
                that.$axios.get('/act/update_act/?token=' + token+'&timestamp='+Date.now()).then(function (res) {
                    if (res.status === 200 && res.data.code === 0) {
                        let result = res.data.data.result;
                        let activity = result[0][0];
                        let award = result[1];
                        console.log('activity:')
                        console.log(activity)
                        console.log('award')
                        console.log(award)

                        that.form = activity;
                        if(activity.bgpic){
                            that.fileListF=[{name:activity.bgpic, url:that.$WEB_DOMAIN + activity.bgpic }];
                        }
                        if(activity.okpic){
                            that.fileListR=[{name:activity.okpic, url:that.$WEB_DOMAIN + activity.okpic }];
                        }
                        if(activity.turpic){
                            that.fileListTur=[{name:activity.turpic, url:that.$WEB_DOMAIN + activity.turpic }];
                        }
                        if(activity.arrpic){
                            that.fileListArr=[{name:activity.arrpic, url:that.$WEB_DOMAIN + activity.arrpic }];
                        }
                        let begintime = that.$moment(activity.begin_time).format('YYYY-MM-DD HH:mm:ss');
                        let endtime = that.$moment(activity.end_time).format('YYYY-MM-DD HH:mm:ss');
                        that.formStartTime = begintime;
                        that.formEndTime = endtime;
                        that.form.createdAt = [begintime, endtime];

                        that.tableData = award;
                        that.tableData = that.tableData.map(function (item) {
                            item.id = item.award_id;
                            item.probability = item.probability/100;
                            delete item.award_id;
                            return item;
                        });
                        console.log(that.tableData);
                    }
                });
            }
        }
    }
</script>
<style scoped>

    .el-select, .el-input, .el-date-editor {

    }
    .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
        width: 332px;
    }

    .a-input {
        width: 90px !important;
    }

    .mobile-model {
        margin-top: 70px;
        min-width: 230px;
        overflow: auto;
    }

    .mobile {
        position: relative;
        width: 230px;
        height: 440px;
        background-image: url("../../../style/img/phone.png");
        background-size: 100%;
        background-repeat: no-repeat;
    }
</style>
