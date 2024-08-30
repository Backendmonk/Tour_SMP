<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Dummydata extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            [
                'name'=>'Wayan',
                'email'=>'wayanAdmin@gmail.com',
                'password'=>bcrypt('123456'),
                'role'=>'Admin'
            ],

            [
                'name'=>'Gede',
                'email'=>'gedePemilik@gmail.com',
               'password'=>bcrypt('123456'),
               'role'=>'Umum'
                
            ]
        ];

        foreach ($user as $key => $value) {
            User::create($value);
        }
    }
}
