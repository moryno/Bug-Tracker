using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddBugAssignees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BugAssignee_Bugs_BugId",
                table: "BugAssignee");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BugAssignee",
                table: "BugAssignee");

            migrationBuilder.RenameTable(
                name: "BugAssignee",
                newName: "BugAssignees");

            migrationBuilder.RenameColumn(
                name: "Project",
                table: "Bugs",
                newName: "ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_BugAssignee_BugId",
                table: "BugAssignees",
                newName: "IX_BugAssignees_BugId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BugAssignees",
                table: "BugAssignees",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Bugs_ProjectId",
                table: "Bugs",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_BugAssignees_Bugs_BugId",
                table: "BugAssignees",
                column: "BugId",
                principalTable: "Bugs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Projects_ProjectId",
                table: "Bugs",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BugAssignees_Bugs_BugId",
                table: "BugAssignees");

            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Projects_ProjectId",
                table: "Bugs");

            migrationBuilder.DropIndex(
                name: "IX_Bugs_ProjectId",
                table: "Bugs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BugAssignees",
                table: "BugAssignees");

            migrationBuilder.RenameTable(
                name: "BugAssignees",
                newName: "BugAssignee");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "Bugs",
                newName: "Project");

            migrationBuilder.RenameIndex(
                name: "IX_BugAssignees_BugId",
                table: "BugAssignee",
                newName: "IX_BugAssignee_BugId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BugAssignee",
                table: "BugAssignee",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BugAssignee_Bugs_BugId",
                table: "BugAssignee",
                column: "BugId",
                principalTable: "Bugs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
