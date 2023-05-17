using AppApi.Entities.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.DTO.Shoe_info
{
    public class GetShoeInfoByCusInput
    {
        public int? ShopId { get; set; }
        public string ShoeType { get; set; }
        public string Size { get; set; }
        public string Gender { get; set; }
        public string Color { get; set; }
        public float? FromPrice { get; set; }
        public float? ToPrice { get; set; }
    }
}
