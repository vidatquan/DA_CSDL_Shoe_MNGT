alter table Supplier add IsDelete int null
go
create or alter procedure GetSupplier
@Name nvarchar(max), @Phone nvarchar(max)
as
begin	
	select * from Supplier where suppliername like '%' + @Name + '%' and phone like '%' + @Phone + '%'
end
go
exec GetSupplier N'Hà Đông', N''
go
create or alter procedure sp_Supplier_Update
@Id int, @suppliername nvarchar(max), @address nvarchar(max), @phone nvarchar(max), @note nvarchar(max), @IsDelete  int
as
begin	
	update Supplier set suppliername = @suppliername, [address] = @address, phone = @phone, note = @note, IsDelete = @IsDelete where Id = @Id
end
go
create or alter procedure sp_Supplier_Delete
@Id int
as
begin	
	delete from Supplier where Id = @Id
end
go
create or alter procedure sp_Supplier_Create
@suppliername nvarchar(max), @address nvarchar(max), @phone nvarchar(max), @note nvarchar(max), @IsDelete  int
as
begin	
	insert into Supplier values (@suppliername, @address, @phone, @note, @IsDelete) 
end

------------------------------------------------------------------------------------------------------------
--
ALTER TABLE users
ADD role int null;

select * from users

ALTER TABLE users
DROP COLUMN role;

update users set role = 1 where id > 0
--create role
CREATE TABLE Role (
    Id int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
CREATE TABLE [dbo].[Role](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[rolename] [nvarchar](max) NULL,
	--[isdeleted] [int] NULL
)

insert into role values('Admin'),(N'Thủ kho'),(N'Bán hàng')

drop table role

select * from role

create or ALTER PROCEDURE [dbo].[GetRole]
AS
BEGIN
    SELECT * FROM role r
	ORDER BY r.Id
END


--
select * from users

--supplier
CREATE TABLE Supplier (
    [id] [int] IDENTITY(1,1) NOT NULL,
	[suppliername] [nvarchar](max) NULL,
);


CREATE TABLE Supplier(
	[id] [int] IDENTITY(1,1) NOT NULL,
	[suppliername] [nvarchar](max) NULL,
	[address] [nvarchar](max) NULL,
	[phone] [nvarchar](max) NULL,
	[note] [nvarchar](max) NULL
)

drop table Supplier
CREATE TABLE Shop (
    [id] [int] IDENTITY(1,1) NOT NULL,
	[shopname] [nvarchar](max) NULL,
);

insert into Supplier values(N'Shoe Hà Đông',N'54 Hà Đông',N'0968195954','')

insert into Shop values (N'VDQ-1'),(N'VDQ-2')

-----------
--quân
drop table Shop
CREATE TABLE Shop (
    [id] [int] IDENTITY(1,1) NOT NULL,
	[shopname] [nvarchar](max) NULL,
	[isdeleted] int null
);

insert into Shop values (N'VDQ-1',0),(N'VDQ-2',0)
--
create or ALTER PROCEDURE [dbo].[sp_ShoeShop_Create]
	@ShopName nvarchar(max) null,
	@IsDeleted int null
	--@Id int null
AS
BEGIN
   INSERT INTO dbo.Shop VALUES(@ShopName, @IsDeleted)
END
-- drop proc [sp_ShoeShop_Create]
create or ALTER PROCEDURE [dbo].[sp_ShoeShop_Update]
	@ShopName nvarchar(max) null,
	@IsDeleted int null,
	@Id int null
AS
BEGIN
   UPDATE dbo.shop 
	SET shopname = @ShopName, isdeleted = @IsDeleted
	WHERE Id = @Id
END
--
create or ALTER PROCEDURE [dbo].[GetShoeShop]
AS
BEGIN
    SELECT * FROM Shop r
	ORDER BY r.Id
END

----------------------------------------------------------------------------------------------------------------------------------

select * from shoeorder
select * from shoeorderdetail
update shoeorder set orderstatus = 1 where id = 3010
----------
select * from shoereceive
select * from shoereceivedetail
----------

alter table shoeorder add ShopId int 
alter table shoeorder add SupplierName nvarchar(max) null 

alter table shoereceive add ShopId int 
alter table shoereceive add SupplierName nvarchar(max) null 
update shoeorder set ShopId = 1 
update shoereceive set ShopId = 1 
update shoeorder set SupplierName = 'TNHH'
update shoereceive set SupplierName = 'TNHH'
select * from shoes
--
select * from shoeorder
select * from shoeorderdetail
select * from shoereceive

delete  shoeorder
delete shoereceivedetail

UPDATE shoeorder set orderstatus = 1 
--11:45
ALTER PROCEDURE [dbo].[GetReportProfits]
	@FromDate date null,
	@ToDate date null,
	@ShopId int null
AS
BEGIN
    select s.receiveno as code,s.receivedate as date, count(s.id) as sosanpham ,sum(d.receiveqty) as soluongsanpham, sum(receiveqty*price) as totalprice, 0 as status 
	from shoereceive s 
	join shoereceivedetail d on s.id = d.shoereceiveid and (s.ShopId = -1 or s.ShopId = @ShopId)
	and cast (s.receivedate as date) between cast (@FromDate as date) and cast (@ToDate as date)
	group by s.receiveno,s.receivedate

	union all

	select s.shippingno as code, s.shippingdate as date, count(s.id) as sosanpham,sum(d.shipqty) as soluongsanpham ,s.totalprice ,  1 as status
	from shoeshipping s 
	join shoeshippingdetail d on s.id = d.shoeshippingid  and (s.ShopId = -1 or s.ShopId = @ShopId)
	and cast (s.shippingdate as date) between cast (@FromDate as date) and cast (@ToDate as date)
	group by s.shippingno, s.shippingdate, s.totalprice 

	order by 2 desc
END

ALTER PROCEDURE [dbo].[GetReportTopShoeSale]
	@FromDate date null,
	@ToDate date null,
	@ShopId int null
AS
BEGIN
	select top 10 sh.shoename , sh.shoecode,  sum(shipqty) soluongbanduoc, sum(shipqty*price) as tongtien
	from shoeshipping s join shoeshippingdetail d on s.id = d.shoeshippingid  and (s.ShopId = -1 or s.ShopId = @ShopId)
	left join shoes sh on d.shoesid = sh.id
	and cast (s.shippingdate as date) between cast (@FromDate as date) and cast (@ToDate as date)
	group by sh.shoename, sh.shoecode 
	order by 3 desc
END
--
select * from shoeorder
select * from shoeorderdetail

update shoeorder set orderstatus = 1 where id = 3019 



