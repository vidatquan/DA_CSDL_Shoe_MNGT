using AppApi.Entities.DTO.Customer;
using AppApi.Entities.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace AppApi.DL
{
    public class ShoeSupplierDL : DBConnect
    {
        public List<ShoeSupplier> Get(GetCusInputDto input)
        {
            _conn.Open();

            string spName = @"dbo.[GetSupplier]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@Name", input.CusName ?? "");
            cmd.Parameters.AddWithValue("@Phone", input.CusTel ?? "");

            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var supplier = new List<ShoeSupplier>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var sup = new ShoeSupplier();
                    sup.Id = (int)sqlDataReader["id"];
                    sup.SupplierName = sqlDataReader["suppliername"].ToString();
                    sup.Address = sqlDataReader["address"].ToString();
                    sup.Phone = sqlDataReader["phone"].ToString();
                    sup.Note = sqlDataReader["note"].ToString();
                    sup.IsDelete = (int)sqlDataReader["IsDelete"];
                    supplier.Add(sup);
                }
            }
            _conn.Close();
            return supplier.ToList();
        }

        public bool AddDL(ShoeSupplier input)
        {
            _conn.Open();
            string SQL = @"dbo.[sp_Supplier_Create]";
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@suppliername", input.SupplierName ?? "");
            sqlCommand.Parameters.AddWithValue("@address", input.Address ?? "");
            sqlCommand.Parameters.AddWithValue("@phone", input.Phone ?? "");
            sqlCommand.Parameters.AddWithValue("@note", input.Note ?? "");
            sqlCommand.Parameters.AddWithValue("@IsDelete", input.IsDelete);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool UpdateDL(ShoeSupplier input)
        {
            _conn.Open();
            string SQL = @"dbo.[sp_Supplier_Update]";

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);
            sqlCommand.Parameters.AddWithValue("@suppliername", input.SupplierName ?? "");
            sqlCommand.Parameters.AddWithValue("@address", input.Address ?? "");
            sqlCommand.Parameters.AddWithValue("@phone", input.Phone ?? "");
            sqlCommand.Parameters.AddWithValue("@note", input.Note ?? "");
            sqlCommand.Parameters.AddWithValue("@IsDelete", input.IsDelete);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }

        public bool DeleteDL(ShoeSupplier input)
        {
            _conn.Open();
            string SQL = @"dbo.[sp_Supplier_Delete]";

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
    }
}
