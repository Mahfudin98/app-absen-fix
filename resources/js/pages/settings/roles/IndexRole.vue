<template>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-5 grid-margin">
                <form-role></form-role>
            </div>
            <div class="col-md-7 grid-margin">
                <list-role></list-role>
            </div>
        </div>
    </div>
</template>
<script>
    import Form from './FormPermission'
    import List from './ListsRole'
    export default {
        name: 'IndexPermissions',
        components: {
            'form-role': Form,
            'list-role': List
        }
    }
</script>
