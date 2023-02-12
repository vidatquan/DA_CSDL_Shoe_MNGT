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