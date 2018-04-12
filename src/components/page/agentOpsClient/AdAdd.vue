<template>
    <div class="personal-info">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>广告管理</el-breadcrumb-item>
                <el-breadcrumb-item>广告{{pageStatus==='edit'?'编辑':'添加'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
            <div class="panel-body page-wrap">
            <el-form ref="form" status-icon :model="form" :rules="rules" label-width="130px" class="demo-ruleForm">
                <el-form-item label="广告名称：" prop="name">
                    <el-input v-model="form.name" placeholder="广告名称"></el-input>
                </el-form-item>
                <el-form-item label="广告位：" prop="place">
                    <el-select v-model="form.place" placeholder="请选择广告位">
                        <el-option
                            v-for="item in placeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告类型：" prop="type">
                    <el-select v-model="form.type" placeholder="请选择广告类型">
                        <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转url：" prop="url">
                    <el-input v-model="form.url" placeholder="点击跳转的连接，必须是http开头"></el-input>
                </el-form-item>
                <el-form-item label="广告图片：" prop="pic">
                    <el-upload
                            class="upload"
                            action="/act/img/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-upload="beforeUpload"
                            :on-error="uploadError"
                            :on-success="uploadSuccessF"
                            name="img"
                            :limit=1
                            :on-exceed="handleExceed"
                            :file-list="fileListF">
                        <el-button size="mini" type="primary">点击上传
                            <i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                        <div slot="tip" class="el-upload__tip">只能上传 jpg , png , gif文件</div>
                    </el-upload>
                </el-form-item>
                <el-form-item style="text-align:center;margin-left: -100px;">
                    <el-button type="primary" @click="save('form')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "",
        data() {
            return {
                fileListF: [],
                pageStatus: 'add', // 页面默认添加 add ,edit
                form: {
                    id: '',
                    name: '',    // 广告名称
                    place: 1,    // 广告位
                    type: 1,     // 类型
                    pic: '',     // 图片
                    url: ''     // 跳转
                },
                placeOptions: [{
                    value: 1,
                    label: 'banner1'
                }, {
                    value: 2,
                    label: 'banner2'
                }, {
                    value: 3,
                    label: '弹屏广告'
                }],
                typeOptions: [{
                    value: 1,
                    label: '广告点击不跳转'
                }, {
                    value: 2,
                    label: '广告点击跳转'
                }],
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    place: [
                        {required: true, message: '请选择广告位', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleRemove  (file, fileList) {  // 文件列表移除文件时的钩子
                console.log('handleRemove:')
                console.log('file')
                console.log(file)
                console.log('fileList')
                console.log(fileList)
                return false
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
                console.log('response:');
                console.log(response);
                if(response.code === 0){
                    console.log('upload ok');
                    this.form.pic = response.data.url;
                    this.$message({message: '上传成功！', type: 'success'})
                }else{
                    this.$message({message: response.msg, type: 'error'})
                }
            },
            // 上传错误
            uploadError (err, file, fileList) {
                this.$message({message: '上传失败，请重试！', type: 'error'})
                console.log(err)
            },
            beforeUpload (file) {
                console.log('beforeUpload file:');
                console.log(file);
                // || file.type === 'image/png'
                let isJPG = (file.type === 'image/jpeg'  || file.type === 'image/png'  || file.type === 'image/gif');
                let isLtM = file.size / 1024 / 1024 < 1;
                if (!isJPG) {
                    this.$message.error('上传正确的格式!')
                }
                if (!isLtM) {
                    this.$message.error('文件大小不能超过 1MB!')
                }
                return isJPG && isLtM
            },
            save(formName) {
                let that = this;
                that.$refs[formName].validate( (valid)=> {
                    if (valid) {
                        let params = {
                            id: that.form.id,
                            name: that.form.name,
                            place: that.form.place,
                            type: that.form.type,
                            pic: that.form.pic,
                            url: that.form.url,
                            method:''
                        };
                        console.log('params:')
                        console.log(params)
                        let url = '/act/banner/';
                        if (that.pageStatus === 'edit') {
                            url = '/act/banner/';
                            params.method = 'put'
                        }
                        that.$axios({
                            url:url,
                            method:'post',
                            data:params,
                            transformRequest: [function (data) {
                                let ret = '';
                                for (let it in data) {
                                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                                }
                                return ret
                            }]}).then((res) => {
                            if(res.data.code === 0){
                                that.$message({type: 'success', message: '保存成功'});
                                that.$router.push({name: 'AdList'}) // 跳转列表页
                            }else{
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
                console.log(tab, event);
              }
        },
        beforeMount () {
            let that = this;
            that.pageStatus = that.$route.params.pageStatus || 'add';
            if(that.pageStatus === 'edit'){
                if(that.$route.params.row){
                    that.form = that.$route.params.row;
                }
            }

            /*if (that.pageStatus === 'edit') {
                that.setDisabled = true;
                that.$axios.get('/api/user/id/' + that.id).then(function (res) {
                    if (res.status === 200 && res.data.code === 200) {
                        that.form = res.data.data
                    }
                })
            }*/
        }
    }
</script>
<style scoped>

    .el-select {
        width: 317px;
    }

    .el-input {
        width: 317px;
    }

    .el-button {
        width: 100px;
    }
</style>
