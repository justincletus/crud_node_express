insert into [dbo].[events]
(
    [user_id],
    [title],
    [description],
    [start_date],
    [end_date],
    [end_time]
)
values
(
    @userId,
    @title,
    @description,
    @startDate,
    @endDate,
    @endTime
);

select scope_identity() as id;
