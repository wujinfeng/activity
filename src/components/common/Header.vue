<template>
    <div class="header-page page-wrap">
        <ul class="page-wrap wrap-end " style="position:absolute;right:40px;">
            <li v-if="userShow"><span>{{user}}</span></li>
            <li @click="quit">退出</li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: "",
        data() {
            return {
                systemOptions: [],
                user: "",
                userShow: true,
                ruleForm: {
                    password: '',
                    newpassword: '',
                    newpasswordAgain: '',
                },
                rules: {
                    password: [
                        {required: true, message: '请输入登录名', trigger: 'blur'},
                    ],
                    newpassword: [
                        {required: true, trigger: 'blur'}
                    ],
                    newpasswordAgain: [
                        {required: true, trigger: 'blur'},
                    ],
                },
                dialogFormVisible: false,  //修改密码
            }
        },
        mounted() {
            this.user = sessionStorage.getItem('username');
        },
        methods: {
            quit() {
                sessionStorage.removeItem('login');
                this.$router.push('/login');
            }
        }
    }
</script>
<style scoped lang="less">
    .header-page {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: right;
        background-color: #111;
        color: #ddd;
        ul {
            li {
                margin-left: 20px;
            }
        }
    }
</style>
