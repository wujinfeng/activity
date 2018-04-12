<template>
        <el-menu
            :default-active="path"
            class="el-menu-vertical-demo"
            unique-opened
            router
            height="100%"
            @open="handleOpen">

            <!--侧边栏-->
            <template v-for="(item,route) in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.route">
                        <template slot="title" class="ccc">
                            <i :class="item.icon"></i>{{ item.title}}
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.route"
                                      v-if="!subItem.subs" :class="{aaa:path==subItem.route}">{{ subItem.title}}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" style="margin-left:-30px;" :class="{aaa:path==item.index}">
                        {{ item.title}}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-star-on',
                        route: '1-1',
                        title: '活动管理',
                        subs: [
			    {
                                route: '/ActAdd',
                                title: '新建活动',
                            },
                            {
                                route: '/ActList',
                                title: '活动列表',
                            },
                            {
                                route: '/ActStatis',
                                title: '活动统计',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        route: '1-2',
                        title: '奖品管理',
                        subs: [
                            {
                                route: '/AwardAdd',
                                title: '新建奖品',
                            },
                            {
                                route: '/AwardList',
                                title: '奖品列表',
                            },
                            {
                                route: '/AwardWin',
                                title: '兑奖中心',
                            }

                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        route: '1-3',
                        title: '广告管理',
                        subs: [
                           {
                                route: '/AdAdd',
                                title: '新建广告',
                            },
                            {
                                route: '/AdList',
                                title: '广告列表',
                            },
                            {
                                route: '/AdStatis',
                                title: '广告统计',
                            }
                        ]
                    }
                ]
            }
        },
        computed: {
            path() {
                console.log(this.$route.path, "------------------");
                return this.$route.path;
                //localStorage.setItem("id",keyPath)
            },
            loca() {
                var str = localStorage.getItem("id")
                return str;
            }
        },
        mounted() {
            this.userObj = JSON.parse(localStorage.getItem('userObj'))
        },
        methods: {
//      退出登录
            userLogout() {
                this.$store.dispatch("UserLogout");
                this.$message({
                    message: '已成功退出',
                    type: 'success'
                });
            },
            handleOpen(key, keyPath) {
                //console.log(key,"key-----")

                localStorage.setItem("id", keyPath)
            },
        }
    }
</script>

<style>
</style>
