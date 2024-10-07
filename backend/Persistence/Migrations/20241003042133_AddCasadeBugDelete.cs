using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCasadeBugDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BugAssignees_Bugs_BugId",
                table: "BugAssignees");

            migrationBuilder.AddForeignKey(
                name: "FK_BugAssignees_Bugs_BugId",
                table: "BugAssignees",
                column: "BugId",
                principalTable: "Bugs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BugAssignees_Bugs_BugId",
                table: "BugAssignees");

            migrationBuilder.AddForeignKey(
                name: "FK_BugAssignees_Bugs_BugId",
                table: "BugAssignees",
                column: "BugId",
                principalTable: "Bugs",
                principalColumn: "Id");
        }
    }
}
