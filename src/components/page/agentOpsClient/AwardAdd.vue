<template>
    <div class="personal-info">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>奖品管理</el-breadcrumb-item>
                <el-breadcrumb-item>奖品{{pageStatus==='edit'?'编辑':'添加'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-row>
            <el-col :span="16">
                <div class="grid-content bg-purple-light">
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                        <el-tab-pane label="优惠券" name="first">
                            <el-form ref="form" status-icon :model="form" :rules="rules" label-width="130px"
                                     class="demo-ruleForm">
                                <el-form-item label="奖品名称：" prop="name">
                                    <el-input v-model="form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="SKU：" prop="sku">
                                    <el-input v-model="form.sku"></el-input>
                                </el-form-item>
                                <el-form-item label="有效时间：" prop="createdAt">
                                    <date-picker @parent-event="getFormDate"  :start-time="formStartTime" :end-time="formEndTime"></date-picker>
                                </el-form-item>

                                <el-form-item label="券码类型：" prop="award_style">
                                    <el-select v-model="form.award_style" placeholder="请选择">
                                        <el-option
                                            v-for="item in priTypeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="兑奖文案：" prop="award_copy">
                                    <el-input v-model="form.award_copy"  placeholder="最长8个字"></el-input>
                                </el-form-item>
                                <el-form-item label="库存：" prop="inventory">
                                    <el-input v-model="form.inventory"></el-input>
                                </el-form-item>
                                <el-form-item label="领奖链接：" prop="link">
                                    <el-input v-model="form.link"></el-input>
                                </el-form-item>
                                <el-form-item label="图片：" prop="picPri">
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
                                        <div slot="tip" class="el-upload__tip">只能上传 jpg , png, gif文件</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="savePri('form')">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="实物" name="second">
                            <el-form ref="formEnt" status-icon :model="formEnt" :rules="rulesEnt" label-width="130px"
                                     class="demo-ruleForm">
                                <el-form-item label="奖品名称：" prop="name">
                                    <el-input v-model="formEnt.name"></el-input>
                                </el-form-item>
                                <el-form-item label="SKU：" prop="sku">
                                    <el-input v-model="formEnt.sku"></el-input>
                                </el-form-item>
                                <el-form-item label="有效时间：" prop="createdAtEnt">
                                    <date-picker @parent-event="getFormEntDate"  :start-time="formEntStartTime" :end-time="formEntEndTime"></date-picker>
                                </el-form-item>
                                <el-form-item label="兑奖方式：" prop="award_style">
                                    <el-select v-model="formEnt.award_style" placeholder="请选择">
                                        <el-option
                                            v-for="item in entTypeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="兑奖文案：" prop="award_copy">
                                    <el-input v-model="formEnt.award_copy"  placeholder="最长8个字"></el-input>
                                </el-form-item>
                                <el-form-item label="库存：" prop="inventory">
                                    <el-input v-model="formEnt.inventory"></el-input>
                                </el-form-item>
                                <el-form-item label="领奖链接：" prop="link">
                                    <el-input v-model="formEnt.link"></el-input>
                                </el-form-item>
                                <el-form-item label="图片：" prop="picEnt">
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
                                        list-type="picture"
                                        :on-exceed="handleExceed"
                                        :file-list="fileListR">
                                        <el-button size="mini" type="primary">点击上传
                                            <i class="el-icon-upload el-icon--right"></i>
                                        </el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传 jpg , png, gif文件</div>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="saveEnt('formEnt')">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {
        name: "",
        data() {
            let form = {
                id: '',
                name: '',
                sku: '',
                createdAt: [],
                award_style: 10, // 优惠券券码类型
                award_copy: '',    // 兑奖文案
                link: '',    // 连接
                inventory: '',  // 库存
                picPri: '',  // 图片
            };
            let formEnt = {
                id: '',
                name: '',
                sku: '',
                createdAtEnt: [],
                award_style: 2, // 实物兑奖方式
                award_copy: '',    // 兑奖文案
                link: '',    // 连接
                inventory: '',  // 库存
                picEnt: '',  // 图片
            };
            return {
                formStartTime:'',
                formEndTime:'',
                formEntStartTime: '',
                formEntEndTime: '',
                pageStatus: 'add', // 页面默认添加 add ,edit
                form: form,
                formEnt: formEnt,
                formEmpty: form,
                formEntEmpty: formEnt,
                fileListR: [],
                fileListF: [],
                priTypeOptions: [{
                    value: 10,
                    label: '优惠券无券码'
                }, {
                    value: 11,
                    label: '统一码'
                }, {
                    value: 12,
                    label: '随机码'
                }],
                entTypeOptions: [{
                    value: 1,
                    label: '实物线下门店兑换'
                }, {
                    value: 2,
                    label: '实物线上邮寄发放'
                }, {
                    value: 3,
                    label: '其他'
                }],
                activeName2: 'first',
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    award_style: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ],
                    award_copy: [
                        { max: 8, message: '最长8个字', trigger: 'blur'}
                    ],
                    inventory: [
                        {required: true, message: '请输入库存', trigger: 'blur'}
                    ],
                    picPri: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ],
                    createdAt: [
                        {required: true, message: '请输入时间', trigger: 'blur,change'}
                    ],
                },
                rulesEnt: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    award_style: [
                        {required: true, message: '请选择', trigger: 'blur'}
                    ],
                    award_copy: [
                        { max: 8, message: '最长8个字', trigger: 'blur'}
                    ],
                    inventory: [
                        {required: true, message: '请输入库存', trigger: 'blur'}
                    ],
                    picEnt: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ],
                    createdAtEnt: [
                        {required: true, message: '请输入时间', trigger: 'blur,change'}
                    ],
                },
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleRemoveF(file, fileList) {  // 文件列表移除文件时的钩子
                console.log('handleRemoveF:')
                console.log('file')
                console.log(file)
                console.log('fileList')
                console.log(fileList)
                this.form.picPri='';
            },
            handleRemoveR(file, fileList) {  // 文件列表移除文件时的钩子
                console.log('handleRemoveR:')
                console.log('file')
                console.log(file)
                console.log('fileList')
                console.log(fileList)
                this.form.picEnt='';
            },
            handlePreview (file) { // 点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
                console.log('handlePreview:')
                console.log(file)
            },
            handleExceed (files, fileList) { // 文件超出个数限制时的钩子
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            // 上传成功后的回调
            uploadSuccessF (response, file, fileList) {
                console.log('responseF:');
                console.log(response);
                if (response.code === 0) {
                    console.log('upload ok')
                    this.form.picPri = response.data.url;
                    this.$message({message: '上传成功！', type: 'success'})
                } else {
                    this.$message({message: response.msg, type: 'error'})
                }
            },
            // 上传成功后的回调
            uploadSuccessR (response, file, fileList) {
                console.log('responseR:');
                console.log(response);
                if (response.code === 0) {
                    console.log('upload ok');
                    this.formEnt.picEnt = response.data.url;
                    this.$message({message: '上传成功！', type: 'success'})
                } else {
                    this.$message({message: response.msg, type: 'error'})
                }
            },
            // 上传错误
            uploadError (err, file, fileList) {
                this.$message({message: '上传失败，请重试！', type: 'error'});
                console.log(err)
            },
            beforeUpload (file) {
                console.log('file:')
                console.log(file)
                // || file.type === 'image/png'
                let isJPG = (file.type === 'image/jpeg' || file.type === 'image/png'  || file.type === 'image/gif');
                let isLtM = file.size / 1024 / 1024 < 1;
                if (!isJPG) {
                    this.$message.error('上传正确的格式!')
                }
                if (!isLtM) {
                    this.$message.error('文件大小不能超过 1MB!')
                }
                return isJPG && isLtM
            },
            savePri(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: that.form.id,
                            name: that.form.name,
                            sku: that.form.sku,
                            begin_time: that.$moment(that.form.createdAt[0]).format('YYYY-MM-DD HH:mm:ss'),
                            end_time: that.$moment(that.form.createdAt[1]).format('YYYY-MM-DD HH:mm:ss'),
                            award_style: that.form.award_style,
                            award_copy: that.form.award_copy,
                            link: that.form.link,
                            inventory: that.form.inventory,
                            pic: that.form.picPri,
                            type: 2,
                        };
                        let url = '/act/promotions/';
                        if (that.pageStatus === 'edit') {
                            url = '/act/promotions/';
                            params.method = 'put'
                        }
                        console.log(params)
                        that.$axios({
                            url: url,
                            method: 'post',
                            data: params,
                            transformRequest: [function (data) {
                                let ret = '';
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }]
                        }).then((res) => {
                            if (res.data.code === 0) {
                                that.$message({type: 'success', message: '保存成功'});
                                that.$router.push({name: 'AwardList'}) // 跳转列表页
                            } else {
                                that.$message({type: 'error', message: res.data.msg});
                            }
                        }).catch((error) => {
                            console.log(error)
                            that.$message({type: 'error', message: error});
                        })
                    }
                });
            },
            saveEnt(formName) {
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            id: that.formEnt.id,
                            name: that.formEnt.name,
                            sku: that.formEnt.sku,
                            begin_time: that.$moment(that.formEnt.createdAtEnt[0]).format('YYYY-MM-DD HH:mm:ss'),
                            end_time: that.$moment(that.formEnt.createdAtEnt[1]).format('YYYY-MM-DD HH:mm:ss'),
                            award_style: that.formEnt.award_style,
                            award_copy: that.formEnt.award_copy,
                            link: that.formEnt.link,
                            inventory: that.formEnt.inventory,
                            pic: that.formEnt.picEnt,
                            type: 1,
                        };
                        let url = '/act/promotions/';
                        if (that.pageStatus === 'edit') {
                            url = '/act/promotions/';
                            params.method = 'put'
                        }
                        console.log(params)
                        that.$axios({
                            url: url,
                            method: 'post',
                            data: params,
                            transformRequest: [function (data) {
                                let ret = '';
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }]
                        }).then((res) => {
                            if (res.data.code === 0) {
                                that.$message({type: 'success', message: '保存成功'});
                                that.$router.push({name: 'AwardList'}) // 跳转列表页
                            } else {
                                that.$message({type: 'error', message: res.data.msg});
                            }
                        }).catch((error) => {
                            console.log(error)
                            that.$message({type: 'error', message: error});
                        })
                    }
                });
            },
            getFormEntDate(val){
                console.log('选择时间段',val);
                this.formEnt.createdAtEnt = val;
            },
            getFormDate(val){
                console.log('选择时间段',val);
                this.form.createdAt = val;
            },
        },
        beforeMount () {
            let that = this;
            that.pageStatus = that.$route.params.pageStatus || 'add';
            let row = that.$route.params.row || '';
            console.log(row);
            if (row) {
                if (row.type === 1) {  // 实物
                    that.form = that.formEmpty;
                    that.activeName2 = 'second';
                    that.formEnt = row;
                    that.formEntStartTime = that.$moment(row.begin_time).format('YYYY-MM-DD');
                    that.formEntEndTime = that.$moment(row.end_time).format('YYYY-MM-DD');
                    that.formEnt.createdAtEnt = [that.formEntStartTime, that.formEntEndTime];
                    that.formEnt.picEnt = row.pic;
                    if(row.pic){
                        that.fileListR=[{name:row.pic, url:that.$WEB_DOMAIN + row.pic }];
                    }
                } else {
                    that.formEnt = that.formEntEmpty;
                    that.activeName2 = 'first';
                    that.form = row;  // 优惠券
                    that.formStartTime = that.$moment(row.begin_time).format('YYYY-MM-DD');
                    that.formEndTime = that.$moment(row.end_time).format('YYYY-MM-DD');
                    that.form.createdAt = [that.formStartTime, that.formEndTime];
                    that.form.picPri = row.pic;
                    if(row.pic){
                        that.fileListF=[{name: row.pic, url: that.$WEB_DOMAIN + row.pic }];
                    }
                }
            }
        }
    }
</script>
<style scoped>

    .el-select, .el-date-editor, .el-input{
        width: 330px !important;
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
