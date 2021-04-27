<template>
<div class="col-md-12 grid-margin">
    <div class="row">
        <edit-project></edit-project>
        <add-task></add-task>
    </div>
</div>
</template>

<script>
import EditProject from './EditProject'
import Addtask from './AddTasks'
export default {
    name: 'DataProjectDev',
    components:{
        'add-task': Addtask,
        'edit-project': EditProject,
    }
}
</script>
