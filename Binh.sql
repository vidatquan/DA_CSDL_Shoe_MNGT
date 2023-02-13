alter table [Users] ADD CONSTRAINT df_Shop default 1 FOR ShopId
select *  from users
update users set ShopId = 1
-------------------------------------------------------------------
ALTER PROCEDURE [dbo].[sp_Employee_Create]
	@FullName nvarchar(max) null,
	@Code nvarchar(max) null,
	@Cmnd nvarchar(max) null,
	@Tel nvarchar(max) null,
	@Email nvarchar(max) null,
	@Username nvarchar(max) null,
	@Password nvarchar(max) null,
	@Image image null,
	@IsDeleted int null,
	@Address nvarchar(max) null,
	@RoleId int null,
	@ShopId int null
AS
BEGIN
    INSERT INTO dbo.users(full_name, code, cmnd, tel, email,user_name,password,role_id,image, isdeleted, address, ShopId) 
				VALUES(@FullName, @Code, @Cmnd, @Tel, @Email,@UserName,@Password,@RoleId,@Image,@IsDeleted, @Address, @ShopId)
END
-------------------------------------------------------------------------------------------------------------------------------
ALTER PROCEDURE [dbo].[sp_Employee_Update]
	@FullName nvarchar(max) null,
	@Code nvarchar(max) null,
	@Cmnd nvarchar(max) null,
	@Tel nvarchar(max) null,
	@Email nvarchar(max) null,
	@Username nvarchar(max) null,
	@Password nvarchar(max) null,
	@Image image null,
	@IsDeleted int null,
	@Address nvarchar(max) null,
	@Id int null,
	@RoleId int null,
	@ShopId int null
AS
BEGIN
    UPDATE dbo.users 
	SET ShopId = @ShopId, role_id = @RoleId, isdeleted = @IsDeleted, address = @Address, image = @Image, cmnd = @Cmnd, full_name = @FullName, code = @Code, tel = @Tel, email = @Email, user_name = @UserName, password = @Password 
	WHERE Id = @Id
END
---------------------------------------------------------------------------------------------------------------------------------------------
ALTER PROCEDURE [dbo].[GetEmployee]
	@FullName nvarchar(max) null,
	@Code nvarchar(max) null,
	@Tel nvarchar(max) null,
	@IsDeleted int null
AS
BEGIN
    SELECT * FROM users u
	WHERE (@FullName = '' OR @FullName IS NULL OR u.full_name LIKE '%' + @FullName + '%')
	and (@Code = '' OR @Code IS NULL OR u.code LIKE '%' +@Code + '%')
	and (@Tel = '' OR @Tel IS NULL OR u.tel LIKE '%' +@Tel + '%')
	and (@IsDeleted = -1 or u.isdeleted = @IsDeleted)
	and role_id <> 1
	ORDER BY u.id
END
-------------------------------------------------------------------------------------------------------------------------------------------------
alter table shoes add ShopId int 
update shoes set ShopId = 1 
select * from shoes

ALTER PROCEDURE [dbo].[GetShoeInfo]
	@ShoeName nvarchar(max) null,
	@ShoeCode nvarchar(max) null,
	@ShoeSize int null,
	@Color nvarchar(max) null,
	@Gender int null,
	@ShoeType int null,
	@IsDeleted int null,
	@ShopId int null
AS
BEGIN
    SELECT * FROM shoes s
	WHERE (@ShoeName = '' OR @ShoeName IS NULL OR s.shoename LIKE '%' + @ShoeName + '%')
	and (@ShoeCode = '' OR @ShoeCode IS NULL OR s.shoecode LIKE '%' + @ShoeCode + '%')
	And (@ShoeSize = -1 or s.shoesize = @ShoeSize)
	And (@Color = N'Tất cả' or s.color = @Color)
	And (@Gender = -1 or s.gender = @Gender)
	And (@ShoeType = -1 or s.shoetype = @ShoeType)
	and (@IsDeleted = -1 or s.isdeleted = @IsDeleted)
	and @ShopId = -1 or ShopId = @ShopId
	ORDER BY s.ID
END
-----------
alter table shoeshipping add TypeShipping int
update shoeshipping set TypeShipping = 0;

select * from shoes order by Id desc
go
create or alter procedure UpdateShoesForShoes
@ShoeId int, @ShopId int, @Qty int
as
begin
	declare @check int; 
	set @check = (select Id from shoes where shoecode = (select shoecode from shoes where id = @ShoeId) and ShopId = @ShopId)
	if (NOT EXISTS (select Id from shoes where shoecode = (select shoecode from shoes where id = @ShoeId) and ShopId = @ShopId))
	begin
		insert into shoes(
			shoename,
			shoecode,
			shoeqty,
			shoesize,
			realprice,
			sellprice,
			color,
			gender,
			shoetype,
			isdeleted,
			note,
			shoeimage, 
			modifypricetime, 
			ShopId) 
		select shoename,shoecode,@Qty,shoesize,realprice,sellprice,color,gender,shoetype,isdeleted,note,shoeimage, modifypricetime, @ShopId from shoes where Id = @ShoeId
	end
	else
	begin
		set @Qty = @Qty + (select shoeqty from shoes where Id = @check);
		update shoes set shoeqty = @Qty where Id = @check
	end
end

select * from shoes where Shopid = 5
----------11:59---------------------------------------------------------------------------------------
select * from shoes order by Id desc
select * from users
select * from Shop
select * from shoeshipping
alter table shoeshipping add ShopId int
update shoeshipping set ShopId = 1

ALTER PROCEDURE [dbo].[GetShoeShipping]
	@FromDate date null,
	@ToDate date null,
	@ShippingNo nvarchar(max) null,
	@CusTel nvarchar(max) null,
	@CusName nvarchar(max) null,
	@ShopId int
AS
BEGIN
    SELECT 
	o.id,
	o.shippinguser,
	o.shippingno,
	o.shippingdate,
	--Status,
	o.totalprice,
	o.cusid,
	o.cusrate,
	--o.cusname
	c.cus_tel custel,
	c.cus_add cusadd,
	c.shoebuyprice,
	o.salesman
	--Note,
	FROM shoeshipping o 
	inner join customer c on o.cusid = c.id and o.TypeShipping = 0
	WHERE (@ShippingNo = '' OR @ShippingNo IS NULL OR o.shippingno LIKE '%' + @ShippingNo + '%')
	AND (@CusTel = '' OR @CusTel IS NULL OR c.cus_tel LIKE '%' + @CusTel + '%')
	AND (@CusName = '' OR @CusName IS NULL OR c.cus_name LIKE '%' + @CusName + '%')
	And (o.status = 0)
	and cast (o.shippingdate as date) between cast (@FromDate as date) and cast (@ToDate as date)
	--and ShopId = @ShopId
	union all
	SELECT 
	o.id,
	o.shippinguser,
	o.shippingno,
	o.shippingdate,
	--Status,
	o.totalprice,
	o.cusid,
	o.cusrate,
	--o.cusname
	'999999999' custel,
	c.shopname cusadd,
	10000000 shoebuyprice,
	o.salesman
	--Note,
	FROM shoeshipping o 
	inner join Shop c on o.cusid = c.id and o.TypeShipping = 1
	WHERE (@ShippingNo = '' OR @ShippingNo IS NULL OR o.shippingno LIKE '%' + @ShippingNo + '%')
	And (o.status = 0)
	and cast (o.shippingdate as date) between cast (@FromDate as date) and cast (@ToDate as date)
	and ShopId = @ShopId
	ORDER BY o.shippingdate desc
END

declare @FromDate1 datetime2, @ToDate1 datetime2
set @FromDate1 = '2022-02-12 00:20:34.563';
set @ToDate1 = getdate();
exec [GetShoeShipping] @FromDate1 , @ToDate1, null, null, null, 1
go
create or alter trigger  Update_Shop_InActive
	on Shop 
	for update 
as
begin
	begin transaction
		if( (select isdeleted from inserted) = 1)
		begin
			update users set isdeleted = 1 where ShopId = (select Id from inserted)
		end
	commit transaction;
end;
go
create or alter trigger Update_Supplier_InActive
	on Supplier 
	for update 
as
begin
	begin transaction
		if( (select IsDelete from inserted) = 1)
		begin
			update shoeorder set orderstatus = 3 where SupplierName = (select suppliername from inserted)
		end
	commit transaction;
end;
go

select * from shoes