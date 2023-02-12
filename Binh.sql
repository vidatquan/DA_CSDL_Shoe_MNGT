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