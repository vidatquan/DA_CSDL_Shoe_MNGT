using AppApi.Entities.DTO.Shoe_info;
using AppApi.Entities.DTO.Shoe_receive;
using AppApi.Entities.Entity;
using AppApi.Entities.Enum;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppApi.DL
{
    public class ShoeDL : DBConnect
    {
        #region Lấy thông tin
        public List<Shoes> GetShoesInfo(GetShoeInfoInput input)
        {
            _conn.Open();

            string spName = @"dbo.[GetShoeInfo]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@ShoeCode", input.ShoeCode);
            cmd.Parameters.AddWithValue("@ShoeName", input.ShoeName);
            cmd.Parameters.AddWithValue("@ShoeSize", input.ShoeSize);
            cmd.Parameters.AddWithValue("@Gender", input.Gender);
            cmd.Parameters.AddWithValue("@ShoeType", input.ShoeType);
            cmd.Parameters.AddWithValue("@Color", input.Color);
            cmd.Parameters.AddWithValue("@IsDeleted", input.IsDeleted);
            cmd.Parameters.AddWithValue("@ShopId", input.ShopId ?? -1);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var shoes = new List<Shoes>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var shoe = new Shoes();
                    shoe.Id = (int)sqlDataReader["id"];
                    shoe.ShoeName = sqlDataReader["shoename"].ToString();
                    shoe.ShoeCode = sqlDataReader["shoecode"].ToString();
                    shoe.ShoeQty = (int)sqlDataReader["shoeqty"];
                    shoe.ShoeSize = (int)sqlDataReader["shoesize"];
                    shoe.RealPrice = (float)Convert.ToDouble(sqlDataReader["realprice"]);
                    shoe.SellPrice = (float)Convert.ToDouble(sqlDataReader["sellprice"]);
                    shoe.Color = sqlDataReader["color"].ToString();
                    shoe.Gender = (Gender)sqlDataReader["gender"];
                    shoe.ShoeType = (ShoeType)sqlDataReader["shoetype"];
                    shoe.Note = sqlDataReader["note"].ToString();
                    shoe.IsDeleted = (int)sqlDataReader["isdeleted"];
                    shoe.ShopId = (int)sqlDataReader["ShopId"];
                    if (!Convert.IsDBNull(sqlDataReader["shoeimage"]))
                    {
                        shoe.Img = (byte[])sqlDataReader["shoeimage"];
                        string base64String = Convert.ToBase64String(shoe.Img, 0, shoe.Img.Length);
                        shoe.ImageString = base64String;
                    }
                    if (!Convert.IsDBNull(sqlDataReader["modifypricetime"]))
                    {
                        shoe.ModifyPriceTime = Convert.ToDateTime(sqlDataReader["modifypricetime"]);
                    }
                    shoes.Add(shoe);
                }
            }
            _conn.Close();
            return shoes.ToList();
        }
        #endregion

        #region Tạo mới
        public bool CreateShoeInfoDL(Shoes input)
        {
            input.ModifyPriceTime = input.ModifyPriceTime.AddHours(7);
            _conn.Open();

            string SQL = string.Format("INSERT INTO dbo.shoes(shoename,shoecode,shoeqty,shoesize,realprice,sellprice,color,gender,shoetype,isdeleted,note,shoeimage, modifypricetime, ShopId) VALUES(@Name, @Code, @Qty, @Size,@RealPrice,@SellPrice,@Color,@Gender ,@Type,@IsDeleted, @Note,@Image, @ModifyPriceTime, @ShopId)");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Name", input.ShoeName ?? "");
            sqlCommand.Parameters.AddWithValue("@Code", input.ShoeCode ?? "");
            sqlCommand.Parameters.AddWithValue("@Qty", input.ShoeQty ?? -1);
            sqlCommand.Parameters.AddWithValue("@Size", input.ShoeSize ?? -1);
            sqlCommand.Parameters.AddWithValue("@RealPrice", input.RealPrice ?? 0);
            sqlCommand.Parameters.AddWithValue("@SellPrice", input.SellPrice ?? 0);
            sqlCommand.Parameters.AddWithValue("@Color", input.Color ?? "");
            sqlCommand.Parameters.AddWithValue("@Gender", (int?)input.Gender ?? -1);
            sqlCommand.Parameters.AddWithValue("@Type", (int?)input.ShoeType ?? -1);
            sqlCommand.Parameters.AddWithValue("@IsDeleted", input.IsDeleted ?? 0);
            sqlCommand.Parameters.AddWithValue("@ShopId", input.ShopId);
            sqlCommand.Parameters.AddWithValue("@Note", input.Note ?? "");
            sqlCommand.Parameters.AddWithValue("@ModifyPriceTime", input.ModifyPriceTime);
            byte[] myByteArray = Convert.FromBase64String(input.ImageString);
            sqlCommand.Parameters.AddWithValue("@Image", myByteArray);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
        #endregion

        #region Chỉnh sửa
        public bool UpdateShoeInfoDL(Shoes input)
        { 
            _conn.Open();
            string SQL = string.Format("UPDATE dbo.shoes SET modifypricetime = @ModifyPriceTime, isdeleted = @IsDeleted, shoename = @Name, shoecode = @Code, shoeqty = @Qty, shoesize = @Size, realprice = @RealPrice, sellprice =  @SellPrice, color = @Color, gender = @Gender, shoetype = @Type, note = @Note, shoeimage = @Image WHERE Id = @Id");
            //string SQL = string.Format("UPDATE dbo.shoes(shoename,shoecode,shoeqty,shoesize,realprice,sellprice,color,gender,shoetype,note] VALUES(@Name, @Code, @Qty, @Size,@RealPrice,@SellPrice,@Color,@Gender ,@Type,@Image)");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Name", input.ShoeName ?? "");
            sqlCommand.Parameters.AddWithValue("@Code", input.ShoeCode ?? "");
            sqlCommand.Parameters.AddWithValue("@Qty", input.ShoeQty ?? -1);
            sqlCommand.Parameters.AddWithValue("@Size", input.ShoeSize ?? -1);
            sqlCommand.Parameters.AddWithValue("@RealPrice", input.RealPrice ?? 0);
            sqlCommand.Parameters.AddWithValue("@SellPrice", input.SellPrice ?? 0);
            sqlCommand.Parameters.AddWithValue("@Color", input.Color ?? "");
            sqlCommand.Parameters.AddWithValue("@Gender", (int?)input.Gender ?? -1);
            sqlCommand.Parameters.AddWithValue("@Type", (int?)input.ShoeType ?? -1);
            sqlCommand.Parameters.AddWithValue("@Note", input.Note ?? "");
            byte[] myByteArray = Convert.FromBase64String(input.ImageString);
            sqlCommand.Parameters.AddWithValue("@Image", myByteArray);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);
            sqlCommand.Parameters.AddWithValue("@IsDeleted", input.IsDeleted ?? 0);
            sqlCommand.Parameters.AddWithValue("@ModifyPriceTime", input.ModifyPriceTime);

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
        #endregion

        #region Xoá Giày
        public bool DeleteShoeInfoDL(int input)
        {
            _conn.Open();

            // string SQL = string.Format("delete  from shoes WHERE id = @id");
            string SQL = string.Format("UPDATE dbo.shoes SET isdeleted = 1 WHERE Id = @Id");

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@id", input);
            sqlCommand.ExecuteNonQuery();

            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();

            return false;
        }
        #endregion

        #region Lấy lịch sửa chỉnh sửa giá giày
        public List<HistoryShoePrice> GetHistoryShoePrice(GetShoeReceiveDetailInput input)
        {
            _conn.Open();

            string spName = @"dbo.[GetHistoryShoePrice]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@ShoeId", input.Id);
          
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var logs = new List<HistoryShoePrice>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var log = new HistoryShoePrice();
                    log.Id = (int)sqlDataReader["id"];
                    log.RealPrice = (float)Convert.ToDouble(sqlDataReader["realprice"]);
                    log.SellPrice = (float)Convert.ToDouble(sqlDataReader["sellprice"]);
                    if (!Convert.IsDBNull(sqlDataReader["applydate"]))
                    {
                        log.ApplyDate = Convert.ToDateTime(sqlDataReader["applydate"]);
                    }
                    if (!Convert.IsDBNull(sqlDataReader["expirydate"]))
                    {
                        log.ExpiryDate = Convert.ToDateTime(sqlDataReader["expirydate"]);
                    }
                    logs.Add(log);
                }
            }
            _conn.Close();
            return logs.ToList();
        }
        #endregion

        #region Tạo log chỉnh sửa giá giày
        public bool CreateHistoryShoePrice(HistoryShoePrice input)
        {
            
            input.ExpiryDate = input.ExpiryDate.AddHours(7);

            _conn.Open();

            string SQL = string.Format("INSERT INTO dbo.historyshoeprice(shoeid,realprice,sellprice,applydate,expirydate) VALUES(@ShoeId, @RealPrice, @SellPrice, @ApplyDate, @ExpiryDate)");
            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@ShoeId", input.ShoeId );
            sqlCommand.Parameters.AddWithValue("@RealPrice", input.RealPrice);
            sqlCommand.Parameters.AddWithValue("@SellPrice", input.SellPrice);
            sqlCommand.Parameters.AddWithValue("@ApplyDate", input.ApplyDate);
            sqlCommand.Parameters.AddWithValue("@ExpiryDate", input.ExpiryDate);


            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
        #endregion

        #region Lấy thông tin cho khách hàng
        public List<Shoes> GetShoesInfoByCustomer(GetShoeInfoByCusInput input)
        {
            _conn.Open();

            string spName = @"dbo.[GetShoeInfoByCustomer]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@ShopId", input.ShopId ?? -1);
            cmd.Parameters.AddWithValue("@ShoeType", input.ShoeType);
            cmd.Parameters.AddWithValue("@Size", input.Size);
            cmd.Parameters.AddWithValue("@Gender", input.Gender);
            cmd.Parameters.AddWithValue("@Color", input.Color);
            cmd.Parameters.AddWithValue("@FromPrice", input.FromPrice ?? -1);
            cmd.Parameters.AddWithValue("@ToPrice", input.ToPrice ?? -1);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var shoes = new List<Shoes>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var shoe = new Shoes();
                    shoe.Id = (int)sqlDataReader["id"];
                    shoe.ShoeName = sqlDataReader["shoename"].ToString();
                    shoe.ShoeCode = sqlDataReader["shoecode"].ToString();
                    shoe.ShoeQty = (int)sqlDataReader["shoeqty"];
                    shoe.ShoeSize = (int)sqlDataReader["shoesize"];
                    shoe.RealPrice = (float)Convert.ToDouble(sqlDataReader["realprice"]);
                    shoe.SellPrice = (float)Convert.ToDouble(sqlDataReader["sellprice"]);
                    shoe.Color = sqlDataReader["color"].ToString();
                    shoe.Gender = (Gender)sqlDataReader["gender"];
                    shoe.ShoeType = (ShoeType)sqlDataReader["shoetype"];
                    shoe.Note = sqlDataReader["note"].ToString();
                    shoe.IsDeleted = (int)sqlDataReader["isdeleted"];
                    shoe.ShopId = (int)sqlDataReader["ShopId"];
                    if (!Convert.IsDBNull(sqlDataReader["shoeimage"]))
                    {
                        shoe.Img = (byte[])sqlDataReader["shoeimage"];
                        string base64String = Convert.ToBase64String(shoe.Img, 0, shoe.Img.Length);
                        shoe.ImageString = base64String;
                    }
                    if (!Convert.IsDBNull(sqlDataReader["modifypricetime"]))
                    {
                        shoe.ModifyPriceTime = Convert.ToDateTime(sqlDataReader["modifypricetime"]);
                    }
                    shoes.Add(shoe);
                }
            }
            _conn.Close();
            return shoes.ToList();
        }
        #endregion

        #region GetShoeInfoById
        public Shoes GetShoesInfoById(Shoes input)
        {
            _conn.Open();

            string spName = @"dbo.[GetShoeInfoById]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@ShoeId", input.Id);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var shoes = new List<Shoes>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var shoe = new Shoes();
                    shoe.Id = (int)sqlDataReader["id"];
                    shoe.ShoeName = sqlDataReader["shoename"].ToString();
                    shoe.ShoeCode = sqlDataReader["shoecode"].ToString();
                    shoe.ShoeQty = (int)sqlDataReader["shoeqty"];
                    shoe.ShoeSize = (int)sqlDataReader["shoesize"];
                    shoe.RealPrice = (float)Convert.ToDouble(sqlDataReader["realprice"]);
                    shoe.SellPrice = (float)Convert.ToDouble(sqlDataReader["sellprice"]);
                    shoe.Color = sqlDataReader["color"].ToString();
                    shoe.Gender = (Gender)sqlDataReader["gender"];
                    shoe.ShoeType = (ShoeType)sqlDataReader["shoetype"];
                    shoe.Note = sqlDataReader["note"].ToString();
                    shoe.IsDeleted = (int)sqlDataReader["isdeleted"];
                    shoe.ShopId = (int)sqlDataReader["ShopId"];
                    if (!Convert.IsDBNull(sqlDataReader["shoeimage"]))
                    {
                        shoe.Img = (byte[])sqlDataReader["shoeimage"];
                        string base64String = Convert.ToBase64String(shoe.Img, 0, shoe.Img.Length);
                        shoe.ImageString = base64String;
                    }
                    if (!Convert.IsDBNull(sqlDataReader["modifypricetime"]))
                    {
                        shoe.ModifyPriceTime = Convert.ToDateTime(sqlDataReader["modifypricetime"]);
                    }
                    shoes.Add(shoe);
                }
            }
            _conn.Close();
            return shoes.FirstOrDefault();
        }
        #endregion

        #region Lấy thông tin Cart
        public List<ViewCartDto> GetCartInfo(Cart input)
        {
            _conn.Open();

            string spName = @"dbo.[GetCartInfo]";
            SqlCommand cmd = new SqlCommand(spName, _conn);

            cmd.Parameters.AddWithValue("@Quantity", input.Quantity);
            cmd.Parameters.AddWithValue("@CusId", input.CusId);
            cmd.Parameters.AddWithValue("@ShoeId", input.ShoeId);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataReader sqlDataReader = cmd.ExecuteReader();

            var shoes = new List<ViewCartDto>();
            if (sqlDataReader.HasRows)
            {
                while (sqlDataReader.Read())
                {
                    var shoe = new ViewCartDto();
                    shoe.Id = (int)sqlDataReader["id"];
                    shoe.ShoeName = sqlDataReader["shoename"].ToString();
                    shoe.ShoeCode = sqlDataReader["shoecode"].ToString();
                    shoe.ShoeQty = (int)sqlDataReader["shoeqty"];
                    shoe.ShoeSize = (int)sqlDataReader["shoesize"];
                    shoe.RealPrice = (float)Convert.ToDouble(sqlDataReader["realprice"]);
                    shoe.SellPrice = (float)Convert.ToDouble(sqlDataReader["sellprice"]);
                    shoe.Color = sqlDataReader["color"].ToString();
                    shoe.Gender = (Gender)sqlDataReader["gender"];
                    shoe.ShoeType = (ShoeType)sqlDataReader["shoetype"];
                    shoe.Note = sqlDataReader["note"].ToString();
                    shoe.IsDeleted = (int)sqlDataReader["isdeleted"];
                    shoe.ShopId = (int)sqlDataReader["ShopId"];
                    if (!Convert.IsDBNull(sqlDataReader["shoeimage"]))
                    {
                        shoe.Img = (byte[])sqlDataReader["shoeimage"];
                        string base64String = Convert.ToBase64String(shoe.Img, 0, shoe.Img.Length);
                        shoe.ImageString = base64String;
                    }
                    if (!Convert.IsDBNull(sqlDataReader["modifypricetime"]))
                    {
                        shoe.ModifyPriceTime = Convert.ToDateTime(sqlDataReader["modifypricetime"]);
                    }
                    //cart
                    shoe.QuantityOrder = (int)sqlDataReader["QuantityOrder"];
                    shoe.CartId = (int)sqlDataReader["CartId"];
                    shoes.Add(shoe);
                }
            }
            _conn.Close();
            return shoes.ToList();
        }
        #endregion

        #region Tạo mới Cart
        public bool CreateCartInfoDL(Cart input)
        {
            _conn.Open();

            string SQL = @"dbo.[sp_Cart_Create]";

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Quantity", input.Quantity);
            sqlCommand.Parameters.AddWithValue("@CusId", input.CusId);
            sqlCommand.Parameters.AddWithValue("@ShoeId", input.ShoeId);
            //sqlCommand.Parameters.AddWithValue("@Id", input.Id);

            sqlCommand.CommandType = CommandType.StoredProcedure;
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
        #endregion

        #region Chỉnh sửa Cart
        public bool UpdateCartInfoDL(Cart input)
        {
            _conn.Open();
            string SQL = @"dbo.[sp_Cart_Update]";

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Quantity", input.Quantity);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);

            sqlCommand.CommandType = CommandType.StoredProcedure;
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
        #endregion

        #region Xoá Cart
        public bool DeleteCartInfoDL(Cart input)
        {
            _conn.Open();
            string SQL = @"dbo.[sp_Cart_Delete]";

            SqlCommand sqlCommand = new SqlCommand(SQL, _conn);
            sqlCommand.Parameters.AddWithValue("@Id", input.Id);

            sqlCommand.CommandType = CommandType.StoredProcedure;
            if (sqlCommand.ExecuteNonQuery() > 0) return true;
            _conn.Close();
            return false;
        }
        #endregion

    }

}
