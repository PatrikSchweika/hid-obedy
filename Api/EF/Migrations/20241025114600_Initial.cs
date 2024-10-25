using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.EF.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Persons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Score = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Persons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LunchRecords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LunchRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LunchRecords_Persons_Id",
                        column: x => x.Id,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LunchRecordPerson",
                columns: table => new
                {
                    ConsumedLunchRecordsId = table.Column<int>(type: "integer", nullable: false),
                    ConsumersId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LunchRecordPerson", x => new { x.ConsumedLunchRecordsId, x.ConsumersId });
                    table.ForeignKey(
                        name: "FK_LunchRecordPerson_LunchRecords_ConsumedLunchRecordsId",
                        column: x => x.ConsumedLunchRecordsId,
                        principalTable: "LunchRecords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LunchRecordPerson_Persons_ConsumersId",
                        column: x => x.ConsumersId,
                        principalTable: "Persons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LunchRecordPerson_ConsumersId",
                table: "LunchRecordPerson",
                column: "ConsumersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LunchRecordPerson");

            migrationBuilder.DropTable(
                name: "LunchRecords");

            migrationBuilder.DropTable(
                name: "Persons");
        }
    }
}
