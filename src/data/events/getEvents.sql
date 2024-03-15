select [id],
    [title],
    [description],
    [start_date],
    [end_state],
    [end_time]
from [dbo].[events]
where [user_id] = @userId
order by [start_date]
