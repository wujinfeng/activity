<template>
    <el-container>
        <el-header>
            <v-header></v-header>
        </el-header>
        <el-container class="content-page">
            <div class="left el-aside">
                <v-sidebar></v-sidebar>
            </div>
            <el-main>
                <router-view class="content-part">
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
</script>
<style>
    .left {
        width: 200px;
    }

    .el-header {
        padding: 0 !important;
    }

    .el-footer {
        position: fixed;
        bottom: 0;
        color: #333;
        text-align: center;
        line-height: 60px;
        z-index: 100;
    }
</style>
