using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.DTO.Shoe_order
{
    public class DataOrder
    {
        public string OrderUser { get; set; }
        public string OrderNo { get; set; }
        public DateTime OrderDate { get; set; }
        public string SupplierName { get; set; }
        public int ShopId { get; set; }
        public List<ShoesOrderDetail> ShoesList { get; set; }
    }
}
