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
        Schema::create('performance_indicators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('district_id')->constrained()->onDelete('cascade');
            $table->year('year');
            $table->decimal('livable_house_percentage', 5, 2)->default(0);
            $table->integer('target_livable_houses')->default(0);
            $table->integer('achieved_livable_houses')->default(0);
            $table->decimal('achievement_percentage', 5, 2)->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique(['district_id', 'year']);
            $table->index(['year', 'achievement_percentage']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('performance_indicators');
    }
};