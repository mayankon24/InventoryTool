using EntityFrameworkExtras.EF6;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryTool.Model
{
    [StoredProcedure("UpdatePartStock")]
    public class UpdatePartStock
    {
        [StoredProcedureParameter(SqlDbType.Udt)]
        public List<udt_PartQuantity> PartQuantity { get; set; }
        [StoredProcedureParameter(SqlDbType.Int)]
        public int FromStore_Id { get; set; }
        [StoredProcedureParameter(SqlDbType.Int)]
        public int ToStore_Id { get; set; }
        [StoredProcedureParameter(SqlDbType.DateTime)]
        public DateTime Date { get; set; }
        [StoredProcedureParameter(SqlDbType.Int)]
        public int StoreTransferType_Id { get; set; }
        [StoredProcedureParameter(SqlDbType.NVarChar)]
        public string Description { get; set; }
        [StoredProcedureParameter(SqlDbType.NVarChar)]
        public string ModifiedBy { get; set; }
        [StoredProcedureParameter(SqlDbType.Int,Direction = ParameterDirection.Output )]
        public int return_Status { get; set; }       
    }
}
