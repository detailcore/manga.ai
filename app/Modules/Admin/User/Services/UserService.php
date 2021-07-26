<?php

namespace App\Modules\Admin\User\Services;


use App\Modules\Admin\Role\Requests\RoleRequest;
use Illuminate\Database\Eloquent\Model;

class UserService
{
    public function getUsers()
    {
        $users = User::with('roles')->get();
        $users->transform(function($item) {
            $item->rolename = '';
            if(isset($item->roles)) {
                $item->rolename = isset($item->roles->first()->title) ? $item->roles->first()->title : "";
            }

            return $item;
        });

        return $users;
    }
}