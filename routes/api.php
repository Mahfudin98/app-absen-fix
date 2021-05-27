<?php

use App\Http\Controllers\Api\AbsentController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\Order\OrderTypeController;
use App\Http\Controllers\Api\PositionsController;
use App\Http\Controllers\Api\ProductCategoryController;
use App\Http\Controllers\Api\ProductTypeController;
use App\Http\Controllers\Api\Project\ProjectController;
use App\Http\Controllers\Api\Project\TasksController;
use App\Http\Controllers\Api\Report\ADV\ReportADVController;
use App\Http\Controllers\Api\Report\Cs\ReportCsController;
use App\Http\Controllers\Api\RolePermissionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);
// Route::resource('/projects', ProjectController::class);

Route::group(['middleware' => 'auth:api'], function() {
    // route for position
    Route::resource('/positions', PositionsController::class )->except(['show']);

    // route for permission
    Route::get('/roles', [RolePermissionController::class, 'getAllRole'])->name('roles');
    Route::get('/permissions', [RolePermissionController::class, 'getAllPermission'])->name('permissions');
    Route::post('/set-role-permission', [RolePermissionController::class, 'setRolePermission'])->name('set_role_permission');
    Route::post('/set-role-user', [RolePermissionController::class, 'setRoleUser'])->name('user.set_role');
    Route::post('/role-create', [RolePermissionController::class, 'store']);
    Route::post('/role-permission', [RolePermissionController::class, 'getRolePermission'])->name('role_permission');

    // route for user
    Route::resource('/employes', UserController::class)->except(['create', 'show', 'update']);
    Route::post('/employes/{id}', [UserController::class, 'update'])->name('employes.update');
    Route::get('/user-authenticated', [UserController::class, 'getUserLogin'])->name('user.authenticated');
    Route::get('/user-list', [UserController::class, 'userLists'])->name('user.index');

    // route for project
    Route::get('/projects', [ProjectController::class, 'index']);
    // route for project dev
    Route::post('/projects-dev', [ProjectController::class, 'storeDev'])->name('store.devproject');
    Route::get('/dev-view/{slug}', [ProjectController::class, 'viewDev'])->name('view.dev');
    Route::get('/dev-project/{slug}', [ProjectController::class, 'viewProjectDev'])->name('view.project.dev');
    Route::post('/dev-post', [TasksController::class, 'addTasksDev'])->name('post.taskdev.project');
    Route::post('/dev-update/{slug}', [ProjectController::class, 'update'])->name('project.dev.update');
    Route::delete('/dev-delete/{id}', [TasksController::class, 'deleteTaskDev'])->name('project.dev.delete');
    Route::post('/task-update/{task}', [TasksController::class, 'updateTask'])->name('update.task.project');

    // route for product category
    Route::resource('/product-category', ProductCategoryController::class)->except(['create', 'show', 'delete']);
    Route::get('/product-category-list', [ProductCategoryController::class, 'listCategory'])->name('product.category.list');
    Route::get('/product-category-type-list', [ProductCategoryController::class, 'listProductType'])->name('list.product.type');

    // route for product type
    Route::resource('/product-type', ProductTypeController::class)->except(['create', 'show', 'delete']);

    // route for order type
    Route::resource('/order-type', OrderTypeController::class)->except(['create', 'show', 'delete']);
    Route::get('/order-type-list', [OrderTypeController::class, 'listType'])->name('order.type.list');

    // route for report cs
    Route::get('/report-cs', [ReportCsController::class, 'index'])->name('report.cs.index');
    Route::get('/report-cs-filter', [ReportCsController::class, 'filter'])->name('report.filter.cs.index');
    Route::post('/post-report-cs', [ReportCsController::class, 'store'])->name('report.cs.add');
    Route::get('/report-cs-adv', [ReportCsController::class, 'maxlead'])->name('report.cs.maxlead');
    Route::get('/report-cs-chart', [ReportCsController::class, 'chart'])->name('report.cs.chart');

    // route for report adv
    Route::get('/report-adv', [ReportADVController::class, 'index'])->name('report.adv.index');
    Route::post('/post-report-adv', [ReportADVController::class, 'store'])->name('report.adv.add');

    // route for absent
    Route::get('/absen-index', [AbsentController::class, 'index'])->name('absen.index');
    Route::post('/absen-post', [AbsentController::class, 'store'])->name('absen.post');
});
