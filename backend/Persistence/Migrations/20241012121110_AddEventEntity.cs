using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddEventEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetRoles_Companies_CompanyId",
                table: "AspNetRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_BugComments_AspNetUsers_AuthorId",
                table: "BugComments");

            migrationBuilder.DropForeignKey(
                name: "FK_BugComments_Bugs_BugId",
                table: "BugComments");

            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Projects_ProjectId",
                table: "Bugs");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectComments_AspNetUsers_AuthorId",
                table: "ProjectComments");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectComments_Projects_ProjectId",
                table: "ProjectComments");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_AspNetUsers_OwnerId",
                table: "Projects");

            migrationBuilder.AlterColumn<Guid>(
                name: "OwnerId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");


            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "ProjectComments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorId",
                table: "ProjectComments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "Bugs",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");



            migrationBuilder.AlterColumn<Guid>(
                name: "BugId",
                table: "BugComments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorId",
                table: "BugComments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "BugId",
                table: "BugAssignees",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");


            migrationBuilder.AlterColumn<string>(
                name: "Discriminator",
                table: "AspNetUserRoles",
                type: "nvarchar(34)",
                maxLength: 34,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<Guid>(
                name: "CompanyId",
                table: "AspNetRoles",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");


            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    InitialComment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedUser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedUser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EventAttendees",
                columns: table => new
                {
                    EventId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventAttendees", x => new { x.EventId, x.AppUserId });
                    table.ForeignKey(
                        name: "FK_EventAttendees_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventAttendees_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EventId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventComments_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EventComments_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id");
                });



            migrationBuilder.CreateIndex(
                name: "IX_EventAttendees_AppUserId",
                table: "EventAttendees",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_EventComments_AuthorId",
                table: "EventComments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_EventComments_EventId",
                table: "EventComments",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_CompanyId",
                table: "Events",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_ProjectId",
                table: "Events",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetRoles_Companies_CompanyId",
                table: "AspNetRoles",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BugComments_AspNetUsers_AuthorId",
                table: "BugComments",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BugComments_Bugs_BugId",
                table: "BugComments",
                column: "BugId",
                principalTable: "Bugs",
                principalColumn: "Id");


            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Projects_ProjectId",
                table: "Bugs",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectComments_AspNetUsers_AuthorId",
                table: "ProjectComments",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectComments_Projects_ProjectId",
                table: "ProjectComments",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_AspNetUsers_OwnerId",
                table: "Projects",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetRoles_Companies_CompanyId",
                table: "AspNetRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_BugComments_AspNetUsers_AuthorId",
                table: "BugComments");

            migrationBuilder.DropForeignKey(
                name: "FK_BugComments_Bugs_BugId",
                table: "BugComments");

            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Companies_CompanyId",
                table: "Bugs");

            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Projects_ProjectId",
                table: "Bugs");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectComments_AspNetUsers_AuthorId",
                table: "ProjectComments");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectComments_Projects_ProjectId",
                table: "ProjectComments");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_AspNetUsers_OwnerId",
                table: "Projects");


            migrationBuilder.DropTable(
                name: "EventAttendees");

            migrationBuilder.DropTable(
                name: "EventComments");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Projects_CompanyId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Bugs_CompanyId",
                table: "Bugs");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ProjectStatus",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Bugs");

            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "Bugs");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "BugAssignees");

            migrationBuilder.DropColumn(
                name: "DateAdded",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastActive",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AspNetRoles");

            migrationBuilder.AlterColumn<Guid>(
                name: "OwnerId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "ProjectComments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorId",
                table: "ProjectComments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "ProjectId",
                table: "Bugs",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "BugId",
                table: "BugComments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorId",
                table: "BugComments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "BugId",
                table: "BugAssignees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Discriminator",
                table: "AspNetUserRoles",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(34)",
                oldMaxLength: 34);

            migrationBuilder.AlterColumn<Guid>(
                name: "CompanyId",
                table: "AspNetRoles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetRoles_Companies_CompanyId",
                table: "AspNetRoles",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BugComments_AspNetUsers_AuthorId",
                table: "BugComments",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_BugComments_Bugs_BugId",
                table: "BugComments",
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

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectComments_AspNetUsers_AuthorId",
                table: "ProjectComments",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectComments_Projects_ProjectId",
                table: "ProjectComments",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_AspNetUsers_OwnerId",
                table: "Projects",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
