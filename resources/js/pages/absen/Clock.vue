<template>
    <div class="card">
       <div class="card-header text-center">
            <vue-clock />
       </div>
        <div class="card-body">
            <v-date-picker
                v-model="picker"
                color="#26303b"
                full-width
            ></v-date-picker>
        </div>
    </div>
</template>

<script>
    import VueClock from '@dangvanthanh/vue-clock';

    export default {
        data () {
            return {
                picker: new Date().toISOString().substr(0, 7),
            }
        },
        components: { VueClock }
    }
</script>

