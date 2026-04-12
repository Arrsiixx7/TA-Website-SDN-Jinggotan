<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('school_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('principal_name');
            $table->text('principal_message');
            $table->integer('total_students')->default(0);
            $table->integer('total_teachers')->default(0);
            $table->integer('total_classes')->default(0);
            $table->integer('total_achievements')->default(0);
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->text('address')->nullable();
            $table->string('logo')->nullable();
            $table->string('principal_photo')->nullable();
            $table->integer('male_students')->default(0);
            $table->integer('female_students')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_profiles');
    }
};
