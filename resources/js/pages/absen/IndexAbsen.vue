<template>
    <div class="content-wrapper">
        <breadcrumb></breadcrumb>

        <div class="row">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import Breadcrumb from '../../components/Breadcrumb'
    export default {
        name: 'IndexAbsen',
        components: {
            'breadcrumb': Breadcrumb
        }
    }
</script>
