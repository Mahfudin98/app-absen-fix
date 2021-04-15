<template>
    <div class="card">
        <div class="card-header">
            List Role
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <b-table class="table" :items="roles" :fields="fields" show-empty />
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data() {
        return {
            fields: [
                { key: 'id', label: 'ID Role' },
                { key: 'name', label: 'Nama Role' }
            ],
        }
    },
    created(){
        this.getRoles()
    },
    computed: {
        ...mapState('user', {
                roles: state => state.roles,
            })
    },
    methods: {
        ...mapActions('user', ['getRoles'])
    }
}
</script>
