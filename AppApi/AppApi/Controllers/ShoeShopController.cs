using AppApi.DL;
using AppApi.Entities.DTO.Shoe_info;
using AppApi.Entities.DTO.Shoe_Shop;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class ShoeShopController : ApiController
    {
        ShoeShopDL cus = new ShoeShopDL();


        [HttpPost]
        [Route("update-shop")]
        public bool Update(ShoeShop input)
        {
            try
            {
                return cus.UpdateShoeShop(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("shop")]
        public List<ShoeShop> GetShoeShop(GetShoeShopInput input)
        {
            try
            {
                return cus.GetShoeShop(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        //[HttpPost]
        //[Route("delete-shop")]
        //public bool DeleteCustomer(ShoeShop input)
        //{
        //    try
        //    {
        //        return cus.DeleteDL(input);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        [HttpPost]
        [Route("add-shop")]
        public bool CreateShoeShop(ShoeShop input)
        {
            try
            {
                return cus.CreateShoeShop(input);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}