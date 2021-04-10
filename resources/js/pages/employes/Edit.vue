<template>
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Edit employe</h3>
            </div>
            <div class="card-body">
                <employe-form ref="employeForm"></employe-form>
                <div class="form-group">
                    <button class="btn btn-primary btn-sm btn-flat" @click.prevent="submit">
                        <i class="fa fa-save"></i> Update
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import FormEmploye from './Form.vue'
    export default {
        name: 'EditEmploye',
        methods: {
            submit() {
                this.$refs.employeForm.submit()
            }
        },
        components: {
            'employe-form': FormEmploye
        },
    }
</script>
