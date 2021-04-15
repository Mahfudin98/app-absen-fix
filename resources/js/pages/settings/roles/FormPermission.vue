<template>
    <div class="card">
        <div class="card-header">
            Add Role
        </div>
        <div class="card-body">
            <div class="form-group">
                <label for="">Nama Role</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Nama Role" v-model="role.name">
                <p class="text-danger" v-if="errors.code">{{ errors.code[0] }}</p>
            </div>
        </div>
        <div class="card-footer">
            <button class="btn btn-primary" @click.prevent="submit">Save</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'FormRoles',
    computed: {
        ...mapState(['errors']),
        ...mapState('user', {
            role: state => state.role
        })
    },
    methods: {
        ...mapMutations('user', ['CLEAR_FORM']),
        ...mapActions('user', ['submitRole']),
        submit() {
                this.submitRole().then(() => {
                    this.$swal({
                        background: '#3085d6',
                        title: 'Ditambah!',
                        text: 'Data Berhasil ditambah!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                })
            }
    },
    destroyed() {
        this.CLEAR_FORM()
    },
}
</script>
