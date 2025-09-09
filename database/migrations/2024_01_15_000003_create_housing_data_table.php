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
        Schema::create('housing_data', function (Blueprint $table) {
            $table->id();
            $table->string('nik', 16)->unique()->comment('National Identity Number');
            $table->string('head_of_household');
            $table->foreignId('district_id')->constrained()->onDelete('cascade');
            $table->foreignId('village_id')->constrained()->onDelete('cascade');
            $table->text('address');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->enum('housing_status', ['RTLH', 'RLH'])->comment('RTLH: Uninhabitable, RLH: Livable');
            $table->enum('eligibility_category', ['livable', 'uninhabitable', 'under_repair'])->default('uninhabitable');
            $table->enum('verification_status', ['pending', 'verified', 'rejected'])->default('pending');
            $table->text('house_condition_notes')->nullable();
            $table->json('photos')->nullable()->comment('Array of photo URLs');
            $table->json('documents')->nullable()->comment('Array of document URLs (KTP, KK, certificates)');
            $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('verified_at')->nullable();
            $table->text('verification_notes')->nullable();
            $table->timestamps();
            
            $table->index('nik');
            $table->index('housing_status');
            $table->index('eligibility_category');
            $table->index('verification_status');
            $table->index(['district_id', 'housing_status']);
            $table->index(['village_id', 'housing_status']);
            $table->index(['housing_status', 'eligibility_category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('housing_data');
    }
};