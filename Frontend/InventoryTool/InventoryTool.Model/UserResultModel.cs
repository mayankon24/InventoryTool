namespace InventoryTool.Model
{
    /// <summary>
    /// this class used as show CRUID operation message on UI
    /// </summary>
   public class UserResultModel
    {
        public int operationstatuscode { get; set; }
        public string message { get; set; }
        public string messagedata { get; set; }
        public string id { get; set; }
    }
}
