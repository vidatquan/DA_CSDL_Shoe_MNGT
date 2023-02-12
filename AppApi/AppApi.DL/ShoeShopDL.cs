using AppApi.Entities.DTO.Shoe_Shop;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.DL
{
    public class ShoeShopDL : DBConnect
    {
        public List<ShoeShop> GetShoeShop(GetShoeShopInput input)
        {
            _conn.Open();

            string spName = @"dbo.[GetShoeShop]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var customers = new List<ShoeShop>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var cus = new ShoeShop();
                    cus.Id = (int)sqlDataReader["id"];
                    cus.ShopName = sqlDataReader["shopname"].ToString();
                    cus.IsDeleted = (int)sqlDataReader["isdeleted"];
                    customers.Add(cus);
                }
            }
            _conn.Close();
            return customers.ToList();
        }

        public bool CreateShoeShop(ShoeShop input)
        {
            _conn.Open();
            string SQL = @"dbo.[sp_ShoeShop_Create]";
            //string SQL = string.Format("INSERT INTO dbo.customer(cus_name, cus_add,cus_email, cus_tel, shoebuyprice, isdeleted) VALUES(@CusName, @CusAdd,@CusEmail, @CusTel, 0, 0)");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@ShopName", input.ShopName ?? "");
            sqlCommand.Parameters.AddWithValue("@IsDeleted", input.IsDeleted );
            sqlCommand.CommandType = CommandType.StoredProcedure;

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateShoeShop(ShoeShop input)
        {
            _conn.Open();
            string SQL = @"dbo.[sp_ShoeShop_Update]";
            //string SQL = string.Format("UPDATE dbo.customer SET cus_name = @CusName, cus_add = @CusAdd, cus_email = @CusEmail, cus_tel = @CusTel,shoebuyprice = @ShoeBuyPrice WHERE Id = @Id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@ShopName", input.ShopName ?? "");
            sqlCommand.Parameters.AddWithValue("@IsDeleted", input.IsDeleted);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

    }
}
