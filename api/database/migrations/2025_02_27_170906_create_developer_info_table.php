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
        Schema::create('developer_info', function (Blueprint $table) {
            $table->id();
            $table->json('description')->nullable();
            $table->unsignedBigInteger('file_id')->nullable();
            $table->foreign('file_id')->references('id')->on('files')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('developer_info');
    }
};
