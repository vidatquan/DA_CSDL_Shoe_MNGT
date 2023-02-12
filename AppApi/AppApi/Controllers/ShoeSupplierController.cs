using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AppApi.DL;
using System.Web.Http;
using AppApi.Entities.Entity;
using AppApi.Entities.DTO.Customer;

namespace AppApi.Controllers
{
    public class ShoeSupplierController : ApiController
    {
        ShoeSupplierDL cus = new ShoeSupplierDL();


        [HttpPost]
        [Route("update-supplier")]
        public bool Update(ShoeSupplier input)
        {
            try
            {
                return cus.UpdateDL(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("supplier")]
        public List<ShoeSupplier> GetCustomer(GetCusInputDto input)
        {
            try
            {
                return cus.Get(input);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("delete-supplier")]
        public bool DeleteCustomer(ShoeSupplier input)
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
        [Route("add-supplier")]
        public bool RegisterCustomer(ShoeSupplier input)
        {
            try
            {
                return cus.AddDL(input);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}