<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('gender', 1);
            $table->string('firstname', 40);
            $table->string('lastname', 40);
            $table->string('email');
            $table->string('street', 60);
            $table->string('nr', 10);
            $table->string('zip', 5);
            $table->string('city', 40);
            $table->string('country', 40);
            $table->string('phone', 30);
            $table->integer('newsletter', 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('applications');
    }
}
