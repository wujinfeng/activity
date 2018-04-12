<template>
    <div class="datePicker-page">
        <el-date-picker
            @change="getDate"
            v-model="dateValue"
            type="daterange"
            format="yyyy-MM-dd"
            :start-placeholder="startTime"
            :end-placeholder="endTime">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['startTime', 'endTime'],
        data() {
            return {
                dateValue: [this.startTime, this.endTime]
            }
        },
        mounted() {
        },
        methods: {
            getDate(val) {
                if (val) {
                    this.$emit("parent-event", this.formatDate(val));
                    this.dateValue = this.formatDate(val);
                }
            },
            formatDate(date) {
                var d1 = new Date(date[0]);
                var d2 = new Date(date[1]);
                var newDate1 = d1.getFullYear() + '-' + (+d1.getMonth() + 1) + '-' + d1.getDate();
                var newDate2 = d2.getFullYear() + '-' + (+d2.getMonth() + 1) + '-' + d2.getDate();
                return [newDate1, newDate2];
            },
        }
    }

</script>

<style scoped>

</style>
