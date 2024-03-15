update [dbo].[events]
set [title] = @title,
    [description] = @description,
    [start_date] = @startDate,
    [end_date] = @endDate,
    [end_time] = @endTime
where [id] = @id
and [user_id] = @userId;

select [id],
    [title],
    [description],
    [start_date],
    [end_date],
    [end_time]
from [dbo].[events]
where [id] = @id
and [user_id] = @userId
