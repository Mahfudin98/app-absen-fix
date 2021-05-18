<template>
    <div class="col-md-12">
        <b-card bg-variant="dark" text-variant="white">
            <b-card-text>
                <report-form ref="formReportCS"></report-form>
            </b-card-text>
            <button class="btn btn-primary" @click.prevent="submit">
                <i class="fa fa-save"></i> Add New
            </button>
        </b-card>
    </div>
</template>

<script>
import ReportCSForm from './Form.vue'
export default {
    methods: {
        submit() {
            this.$refs.formReportCS.submit()
        }
    },
    components: {
        'report-form': ReportCSForm
    }
}
</script>
