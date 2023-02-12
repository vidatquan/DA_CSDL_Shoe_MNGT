using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace AppApi.Controllers
{
    public class ShopController : ApiController
    {
       // ShopDL cus = new ShopDL();


        [HttpPost]
        [Route("update-shop")]
        public bool Update(Shop input)
        {
            try
            {
                return true;
                //return cus.UpdateDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("customer")]
        public List<Customer> GetShop(Shop input)
        {
            try
            {
                return cus.GetCustomer(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-shop")]
        public bool DeleteShop(Customer input)
        {
            try
            {
                return cus.DeleteDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("add-shop")]
        public bool RegisterCustomer(Customer input)
        {
            try
            {
                return cus.RegisterDL(input);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}