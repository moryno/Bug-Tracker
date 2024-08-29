using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddBugComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BugComments_AspNetUsers_AppUserId",
                table: "BugComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BugComments",
                table: "BugComments");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "BugComments");

            migrationBuilder.RenameColumn(
                name: "DateCommented",
                table: "BugComments",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "BugComments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "AuthorId",
                table: "BugComments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_BugComments",
                table: "BugComments",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_BugComments_AuthorId",
                table: "BugComments",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_BugComments_AspNetUsers_AuthorId",
                table: "BugComments",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BugComments_AspNetUsers_AuthorId",
                table: "BugComments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BugComments",
                table: "BugComments");

            migrationBuilder.DropIndex(
                name: "IX_BugComments_AuthorId",
                table: "BugComments");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "BugComments");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "BugComments");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "BugComments",
                newName: "DateCommented");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "BugComments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BugComments",
                table: "BugComments",
                columns: new[] { "AppUserId", "BugId" });

            migrationBuilder.AddForeignKey(
                name: "FK_BugComments_AspNetUsers_AppUserId",
                table: "BugComments",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
