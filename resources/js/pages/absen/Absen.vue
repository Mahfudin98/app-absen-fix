<template>
    <div class="col-md-12 grid-margin">
        <div class="row">
            <div class="col-xl-12 grid-margin stretch-card">
                <clock-app></clock-app>
            </div>
            <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex flex-row justify-content-between">
                            <h4 class="card-title mb-1">Absen</h4>
                            <p class="text-muted mb-1">FORM</p>
                        </div>
                        <sistem-app></sistem-app>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Clock from './Clock'
    import Sistem from './SistemAbsen'
    export default {
        name: 'Absen',
        components: {
            'clock-app': Clock,
            'sistem-app': Sistem
        }
    }
</script>
