<template>
    <div>
        {{ new Date().toLocaleDateString() }}
        <vue-clock />
    </div>
</template>

<script>
    import VueClock from '@dangvanthanh/vue-clock';

    export default {
        components: { VueClock }
    }
</script>

