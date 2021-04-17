<template>
    <div class="col-md-12 grid-margin">
        <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
                <project-data></project-data>
            </div>
        </div>
    </div>
</template>
<script>
import DataProject from './Project'
export default {
    name: 'IndexProjectDev',
    components: {
        'project-data': DataProject
    }
}
</script>
