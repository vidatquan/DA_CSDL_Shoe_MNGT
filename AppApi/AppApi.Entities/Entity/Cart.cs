using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.Entities.Entity
{
    public class Cart
    {
        public int Id { get; set; }
        public int CusId { get; set; }
        public int ShoeId { get; set; }
        public int Quantity { get; set; }

    }
}
