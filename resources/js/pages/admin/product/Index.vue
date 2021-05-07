<template>
    <div class="content-wrapper">
        <breadcrumb></breadcrumb>
        <router-view></router-view>
    </div>
</template>
<script>
    import Breadcrumb from '../../../components/Breadcrumb'
    export default {
        name: 'IndexProject',
        components: {
            'breadcrumb': Breadcrumb
        }
    }
</script>
