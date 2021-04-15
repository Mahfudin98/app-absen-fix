<?php

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\PositionsController;
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

Route::post('/employes/{id}', [UserController::class, 'update'])->name('employes.update');
Route::post('/login', [LoginController::class, 'login']);
Route::resource('/employes', UserController::class)->except(['create', 'show', 'update']);

Route::post('/role-permission', [RolePermissionController::class, 'getRolePermission'])->name('role_permission');

Route::group(['middleware' => 'auth:api'], function() {
    // route for position
    Route::resource('/positions', PositionsController::class )->except(['show']);

    // route for permission
    Route::get('/roles', [RolePermissionController::class, 'getAllRole'])->name('roles');
    Route::get('/permissions', [RolePermissionController::class, 'getAllPermission'])->name('permissions');
    Route::post('/set-role-permission', [RolePermissionController::class, 'setRolePermission'])->name('set_role_permission');
    Route::post('/set-role-user', [RolePermissionController::class, 'setRoleUser'])->name('user.set_role');
    Route::post('/role-create', [RolePermissionController::class, 'store']);

    // route for user

    Route::get('/user-authenticated', [UserController::class, 'getUserLogin'])->name('user.authenticated');
    Route::get('/user-list', [UserController::class, 'userLists'])->name('user.index');
});
