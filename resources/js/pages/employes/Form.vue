<template>
    <div>
        <div class="form-group" :class="{ 'has-error': errors.name }">
            <label for="">Nama Lengkap</label>
            <input required type="text" class="form-control" v-model="employe.name">
            <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.email }">
            <label for="">Email</label>
            <input required type="email" class="form-control" v-model="employe.email">
            <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.alamat }">
            <label for="">Alamat</label>
            <input required type="text" class="form-control" v-model="employe.alamat">
            <p class="text-danger" v-if="errors.alamat">{{ errors.alamat[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.phone }">
            <label for="">Phone</label>
            <input required type="tel" class="form-control" v-model="employe.phone">
            <p class="text-danger" v-if="errors.phone">{{ errors.phone[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.password }">
            <label for="">Password</label>
            <input type="password" class="form-control" v-model="employe.password">
            <p class="text-warning" v-show="$route.name == 'employes.edit'">Biarkan Kosong jika tidak ingin mengganti.</p>
            <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.position_id }">
            <label for="">position</label>
            <select required name="position_id" class="form-control" v-model="employe.position_id">
                <option value="">Pilih</option>
                <option v-for="(row, index) in positions.data" :value="row.id" :key="index">{{ row.name }}</option>
            </select>
            <p class="text-danger" v-if="errors.position_id">{{ errors.position_id[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.parent_id }">
            <label for="">Adv Untuk CS</label>
            <select name="parent_id" class="form-control" v-model="employe.parent_id">
                <option value="">Pilih ADV Untuk CS</option>
                <option v-for="(row, index) in users" :value="row.id" :key="index">{{ row.name }}</option>
            </select>
            <p class="text-warning">Biarkan Kosong jika bukan data CS yang ditambah.</p>
            <p class="text-danger" v-if="errors.parent_id">{{ errors.parent_id[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.image }">
            <label for="">Foto</label>
            <input required type="file" name="image" class="form-control" accept="image/*" @change="uploadImage($event)" id="file-input required">
            <p class="text-warning" v-show="$route.name == 'employes.edit'">Biarkan Kosong jika tidak ingin mengganti.</p>
            <p class="text-danger" v-if="errors.image">{{ errors.image[0] }}</p>
        </div>
        <div class="form-group" v-show="$route.name != 'employes.edit'" :class="{ 'has-error': errors.gender }">
            <label for="">Jenis Kelamin</label>
            <select required name="gender" class="form-control" v-model="employe.gender">
                <option value="">Pilih</option>
                <option :value="'Laki-laki'">Laki-laki</option>
                <option :value="'Perempuan'">Perempuan</option>
            </select>
            <p class="text-danger" v-if="errors.gender">{{ errors.gender[0] }}</p>
        </div>
        <div class="form-group" :class="{ 'has-error': errors.role }">
            <label for="">Role</label>
            <select name="role" class="form-control" v-model="selected.role">
                <option value="">Pilih</option>
                <option v-for="(row, index) in roles" :value="{ id: row.id, name: row.name }" :key="index">
                    {{ row.name }}
                </option>
            </select>
            <p class="text-danger" v-if="errors.role">{{ errors.role[0] }}</p>
        </div>
        <div class="form-group">
            <label for="status">Status</label>
            <select required class="form-control" id="status" name="status" v-model="employe.status">
                <option v-bind:value="1" selected>Active</option>
                <option v-bind:value="0">Inactive</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name: 'FormEmploye',
    created() {
        this.getPositions()
        this.getRoles()
        this.getUserLists()
        if (this.$route.name == 'employes.edit') {
            this.editEmploye(this.$route.params.id).then((res) => {
                this.employe = {
                    name: res.data.name,
                    email: res.data.email,
                    alamat: res.data.alamat,
                    phone: res.data.phone,
                    password: '',
                    image: '',
                    gender: res.data.gender,
                    position_id: res.data.position_id,
                    parent_id: res.data.parent_id,
                    status: res.data.status
                }
            })
        }
    },
    data() {
        return {
            selected: {
                role: ''
            },
            employe: {
                name: '',
                email: '',
                alamat: '',
                phone: '',
                password: '',
                image: '',
                gender: '',
                position_id: '',
                parent_id: '',
                status: 1
            }
        }
    },
    computed: {
        ...mapState(['errors']),
        ...mapState('position', {
            positions: state => state.positions
        }),
        ...mapState('user', {
            roles: state => state.roles,
            users: state=> state.users
        })
    },
    methods: {
        ...mapActions('position', ['getPositions']),
        ...mapActions('employe', ['submitEmploye', 'editEmploye', 'updateEmploye']),
        ...mapMutations('employe', ['SET_ID_UPDATE']),
        ...mapActions('user', ['getRoles', 'getUserLists']),
        uploadImage(event) {
            this.employe.image = event.target.files[0]
        },
        submit() {
            let form = new FormData()
            form.append('name', this.employe.name)
            form.append('email', this.employe.email)
            form.append('alamat', this.employe.alamat)
            form.append('phone', this.employe.phone)
            form.append('password', this.employe.password)
            form.append('role', this.selected.role.id)
            form.append('gender', this.employe.gender)
            form.append('position_id', this.employe.position_id)
            form.append('parent_id', this.employe.parent_id)
            form.append('image', this.employe.image)
            form.append('status', this.employe.status)
            form.append('assign', this.selected.role.name)

            if (this.$route.name == 'employes.add') {
                this.submitEmploye(form).then(() => {
                    this.employe = {
                        name: '',
                        email: '',
                        alamat: '',
                        phone: '',
                        password: '',
                        gnder: '',
                        role: '',
                        image: '',
                        position_id: '',
                        parent_id: '',
                        status: 1
                    }
                    this.$swal({
                        background: '#3085d6',
                        title: 'Ditambah!',
                        text: 'Data Berhasil ditambah!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.$router.push({ name: 'employes.data' })
                })
            } else if (this.$route.name == 'employes.edit') {
                this.SET_ID_UPDATE(this.$route.params.id)
                this.updateEmploye(form).then(() => {
                    this.employe = {
                        name: '',
                        email: '',
                        alamat: '',
                        phone: '',
                        password: '',
                        image: '',
                        position_id: '',
                        parent_id: '',
                    }
                    this.$swal({
                        background: '#3085d6',
                        title: 'Diupdate!',
                        text: 'Data Berhasil diupdate!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    this.$router.push({ name: 'employes.data' })
                })
            }
        },
    }
}
</script>

