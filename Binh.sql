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
----------11:59---------------------------------------------------------------------------------------
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


