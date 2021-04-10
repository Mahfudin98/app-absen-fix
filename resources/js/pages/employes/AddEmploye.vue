<template>
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Add New employe</h3>
            </div>
            <div class="card-body">
                <employe-form ref="formEmploye"></employe-form>
                <div class="form-group">
                    <button class="btn btn-primary" @click.prevent="submit">
                        <i class="fa fa-save"></i> Add New
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState, mapMutations } from 'vuex'
    import FormEmploye from './Form.vue'
    export default {
        name: 'Addemploye',
        methods: {
            submit() {
                this.$refs.formEmploye.submit()
            }
        },
        components: {
            'employe-form': FormEmploye
        }
    }
</script>
