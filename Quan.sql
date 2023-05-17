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



