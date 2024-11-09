using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EditProjectComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectComments_AspNetUsers_AppUserId",
                table: "ProjectComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectComments",
                table: "ProjectComments");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "ProjectComments");

            migrationBuilder.RenameColumn(
                name: "DateCommented",
                table: "ProjectComments",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "ProjectComments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "AuthorId",
                table: "ProjectComments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectComments",
                table: "ProjectComments",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectComments_AuthorId",
                table: "ProjectComments",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectComments_AspNetUsers_AuthorId",
                table: "ProjectComments",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectComments_AspNetUsers_AuthorId",
                table: "ProjectComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectComments",
                table: "ProjectComments");

            migrationBuilder.DropIndex(
                name: "IX_ProjectComments_AuthorId",
                table: "ProjectComments");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProjectComments");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "ProjectComments");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "ProjectComments",
                newName: "DateCommented");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "ProjectComments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectComments",
                table: "ProjectComments",
                columns: new[] { "AppUserId", "ProjectId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectComments_AspNetUsers_AppUserId",
                table: "ProjectComments",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
