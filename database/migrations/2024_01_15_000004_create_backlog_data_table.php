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
        Schema::create('backlog_data', function (Blueprint $table) {
            $table->id();
            $table->foreignId('district_id')->constrained()->onDelete('cascade');
            $table->foreignId('village_id')->constrained()->onDelete('cascade');
            $table->enum('backlog_type', ['backlog_1', 'backlog_2']);
            $table->integer('families_count')->default(0);
            $table->text('description')->nullable();
            $table->year('year');
            $table->timestamps();
            
            $table->unique(['district_id', 'village_id', 'backlog_type', 'year']);
            $table->index(['district_id', 'backlog_type', 'year']);
            $table->index(['village_id', 'backlog_type', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('backlog_data');
    }
};