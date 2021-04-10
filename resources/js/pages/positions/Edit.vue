<template>
    <div class="card col-lg-4 mx-auto">
        <div class="card-body">
            <h4 class="card-title">Edit Data Posisi/Jabatan</h4>
            <position-form></position-form>
            <button class="btn btn-primary mr-2" @click.prevent="submit">
                <i class="fa fa-save"></i> Update
            </button>
            <router-link :to="{ name: 'positions.data' }" class="btn btn-dark mr-2">Cancel</router-link>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import Formpositions from './Form.vue'
    export default {
        name: 'EditPosition',
        created() {
            this.editPosition(this.$route.params.id)
        },
        methods: {
            ...mapActions('position', ['editPosition', 'updatePosition']),
            submit() {
                this.updatePosition(this.$route.params.id).then(() => {
                    this.$swal({
                        background: '#3085d6',
                        title: 'Diupdate!',
                        text: 'Data Berhasil diupdate!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.$router.push({ name: 'positions.data' })
                })
            }
        },
        components: {
            'position-form': Formpositions
        },
    }
</script>
