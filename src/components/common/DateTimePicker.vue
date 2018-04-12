<template>
    <div class="datePicker-page">
        <el-date-picker
            @change="getDate"
            v-model="dateValue"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
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
                var newDate1 = this.$moment(d1).format('YYYY-MM-DD HH:mm:ss');
                var newDate2 = this.$moment(d2).format('YYYY-MM-DD HH:mm:ss');
                return [newDate1, newDate2];
            },
        }
    }

</script>

<style scoped>

</style>
