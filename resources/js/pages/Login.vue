<template>
    <div class="card col-lg-4 mx-auto">
        <div class="card-header py-3 text-center">
            <img :src="'/img/logo.png'" :height="50" alt="">
        </div>
        <div class="card-body px-5 py-5">
            <div class="form-group has-feedback" :class="{'has-error': errors.email}">
                <label>Email *</label>
                <input type="email" class="form-control p_input" placeholder="Email" v-model="data.email">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
            </div>
            <div class="form-group has-feedback" :class="{'has-error': errors.password}">
                <label>Password *</label>
                <input type="password" class="form-control" placeholder="Password" v-model="data.password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
            </div>
            <div class="alert alert-danger" v-if="errors.invalid">{{ errors.invalid }}</div>
            <div class="form-group d-flex align-items-center justify-content-between">
                <div class="form-check">
                    <vs-checkbox v-model="data.remember_me">
                        Remember Me
                    </vs-checkbox>
                    <!-- <label class="form-check-label">
                        <input type="checkbox" v-model="data.remember_me"> Remember Me
                    </label> -->
                </div>
                    <!-- <a href="#" class="forgot-pass">Forgot password</a> -->
            </div>
            <div class="text-center">
                <button type="submit" class="btn btn-primary btn-block enter-btn" @click.prevent="postLogin">Login</button>
            </div>
        </div>
    </div>
</template>

<!-- JAVASCRIPT SECTION -->
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
export default {
    data() {
        return {
            data: {
                email: '',
                password: '',
                remember_me: false
            }
        }
    },
    created() {
        if (this.isAuth) {
            this.$router.push({ name: 'dashboard' })
        }
    },
    computed: {
        ...mapGetters(['isAuth']),
      	...mapState(['errors'])
    },
    methods: {
        ...mapActions('auth', ['submit']),
        ...mapMutations(['CLEAR_ERRORS']),
        ...mapActions('user', ['getUserLogin']),

        postLogin() {
            this.submit(this.data).then(() => {
                if (this.isAuth) {
                    this.CLEAR_ERRORS()
                    this.$router.push({ name: 'dashboard' })
                }
            })
        }
    },
    destroyed() {
        this.getUserLogin()
    }
}
</script>
