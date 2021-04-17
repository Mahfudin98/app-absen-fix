<template>
    <b-button class="mt-3" variant="outline-primary" block @click.prevent="submit"><i class="fas fa-save"></i> Save</b-button>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex'
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
